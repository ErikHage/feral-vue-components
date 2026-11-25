import { flushPromises } from '@vue/test-utils';
import { h, nextTick } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';
import {
  FrAppShell,
  useToast,
  type FrAppNavigationSection,
  type FrCommandPaletteItem,
  type FrCommandPaletteResult,
} from '../../../src';
import { toastQueue } from '../../../src/utils/toast';
import { mountWithVuetify } from '../helpers/mount';

const sections: FrAppNavigationSection[] = [
  { items: [{ value: 'home', title: 'Home', icon: 'mdi-home' }] },
  {
    label: 'Garden',
    items: [
      { value: 'plants', title: 'Plants', subtitle: 'All of them', icon: 'mdi-leaf' },
      { value: 'plots', title: 'Plots', to: '/plots' },
      { value: 'docs', title: 'Docs', href: 'https://example.com/docs' },
    ],
  },
];

/** Every width counts as a small screen */
const small = { display: { thresholds: { md: 5000, lg: 6000, xl: 7000, xxl: 8000 } } };

let mounted: ReturnType<typeof mountWithVuetify>[] = [];

function mountShell(
  props: Record<string, unknown> = {},
  slots: Record<string, unknown> = {},
  vuetify: Record<string, unknown> = {},
) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { render: () => null } },
      { path: '/plots', component: { render: () => null } },
    ],
  });
  const wrapper = mountWithVuetify(
    FrAppShell as never,
    {
      props: {
        title: 'Vigilant Harvest',
        storagePrefix: 'garden',
        sections,
        activeView: 'home',
        ...props,
      },
      slots,
      global: { plugins: [router] },
      attachTo: document.body,
    } as never,
    vuetify,
  );
  mounted.push(wrapper);
  const shell = () => wrapper;
  const drawer = () => wrapper.findComponent({ name: 'FrAppNavigationDrawer' });
  const palette = () => wrapper.findComponent({ name: 'FrCommandPalette' });
  const themeName = () =>
    (wrapper.vm as unknown as { $vuetify: { theme: { name: string } } }).$vuetify.theme.name;
  return { wrapper, router, shell, drawer, palette, themeName };
}

/** A stand-in for the device's colour scheme, which jsdom lacks */
function stubColorScheme(light: boolean) {
  const listeners = new Set<() => void>();
  const query = {
    matches: light,
    addEventListener: vi.fn((_: string, listener: () => void) => listeners.add(listener)),
    removeEventListener: vi.fn((_: string, listener: () => void) => listeners.delete(listener)),
  };
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => query),
  );
  return {
    query,
    change(toLight: boolean) {
      query.matches = toLight;
      listeners.forEach((listener) => listener());
    },
  };
}

function key(init: KeyboardEventInit, target: EventTarget = document.body) {
  const event = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init });
  target.dispatchEvent(event);
  return event;
}

describe('FrAppShell', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
    localStorage.clear();
    toastQueue().value = [];
    document.title = '';
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
    mounted.forEach((wrapper) => wrapper.unmount());
    mounted = [];
    vi.unstubAllGlobals();
    document.body.innerHTML = '';
  });

  describe('frame', () => {
    it('renders the app with its drawer, toolbar and the view, told which is active', () => {
      const { wrapper, drawer } = mountShell(
        { subtitle: 'Plots and plants', activeView: 'plants' },
        { default: ({ activeView }: { activeView: string }) => h('p', `Viewing ${activeView}`) },
      );

      expect(wrapper.find('.v-application.fr-app-shell').exists()).toBe(true);
      expect(drawer().props()).toMatchObject({
        title: 'Vigilant Harvest',
        subtitle: 'Plots and plants',
        activeView: 'plants',
        sections,
        rail: false,
        collapsible: true,
        mobile: false,
      });
      expect(wrapper.find('#app-main').attributes('tabindex')).toBe('-1');
      expect(wrapper.find('#app-main').text()).toBe('Viewing plants');
      expect(wrapper.find('#app-nav-toggle').exists()).toBe(false);
    });

    it('focuses the view from its skip link', async () => {
      const { wrapper } = mountShell();
      const skip = wrapper.find('a.fr-app-shell__skip-link');

      expect(skip.attributes('href')).toBe('#app-main');
      await skip.trigger('click');

      expect(document.activeElement).toBe(wrapper.find('#app-main').element);
    });

    it('passes on a link picked in the drawer', async () => {
      const { shell, drawer } = mountShell();
      drawer().vm.$emit('update:activeView', 'plants');

      expect(shell().emitted('update:activeView')).toEqual([['plants']]);
    });

    it('puts each toolbar slot in its place, and a settings menu only with its slot', () => {
      const bare = mountShell();
      expect(bare.wrapper.find('.fr-app-settings-menu').exists()).toBe(false);
      expect(bare.wrapper.find('.fr-app-shell__toolbar-center').exists()).toBe(false);
      bare.wrapper.unmount();
      mounted = [];

      const { wrapper } = mountShell(
        {},
        {
          'toolbar-start': () => h('span', { id: 'start' }, 'Start'),
          'toolbar-center': () => h('span', { id: 'center' }, 'Center'),
          'toolbar-actions': () => h('span', { id: 'actions' }, 'Actions'),
          toolbar: () => h('span', { id: 'end' }, 'End'),
          settings: () => h('span', { id: 'settings-content' }, 'Settings'),
        },
      );
      const bar = wrapper.find('.v-app-bar');

      expect(bar.find('.fr-app-shell__toolbar-center #center').exists()).toBe(true);
      const order = [
        ...bar.element.querySelectorAll(
          '#start, #actions, button[aria-label="Theme"], button[aria-label="Settings"], #end',
        ),
      ].map((element) => element.id || element.getAttribute('aria-label'));
      expect(order).toEqual(['start', 'actions', 'Theme', 'Settings', 'end']);
    });

    it('gives the drawer-footer slot whether the drawer is a rail', () => {
      localStorage.setItem('garden.drawerRail', 'true');
      const { wrapper } = mountShell(
        {},
        {
          'drawer-footer': ({ rail }: { rail: boolean }) => h('span', { id: 'foot' }, String(rail)),
        },
      );

      expect(wrapper.find('#app-nav #foot').text()).toBe('true');
    });

    it('puts the footer after the view, or at the foot of the window when pinned', () => {
      const footer = { footer: () => h('span', 'Footer') };
      const inline = mountShell({}, footer);
      expect(inline.wrapper.find('#app-main #app-footer').text()).toBe('Footer');
      inline.wrapper.unmount();
      mounted = [];

      const pinned = mountShell({ pinnedFooter: true }, footer);
      expect(pinned.wrapper.find('#app-main #app-footer').exists()).toBe(false);
      expect(pinned.wrapper.find('#app-footer').text()).toBe('Footer');
    });

    it("shows the app's toasts", async () => {
      mountShell();
      useToast().success('Saved');
      await flushPromises();
      await nextTick();

      expect(document.querySelector('.v-snackbar__content')?.textContent).toBe('Saved');
    });
  });

  describe('window title and focus', () => {
    it("titles the window after the view's link, then the given view title", async () => {
      const { wrapper } = mountShell({ activeView: 'plants' });

      expect(document.title).toBe('Plants - Vigilant Harvest');

      await wrapper.setProps({ viewTitle: 'Tomatoes' } as never);
      expect(document.title).toBe('Tomatoes - Vigilant Harvest');

      await wrapper.setProps({ viewTitle: '', activeView: 'nowhere' } as never);
      expect(document.title).toBe('Vigilant Harvest');

      await wrapper.setProps({
        sections: [{ items: [{ value: 'nowhere', title: 'Nowhere' }] }],
      } as never);
      expect(document.title).toBe('Nowhere - Vigilant Harvest');
    });

    it("keeps the page's own title as the base, and doesn't repeat it", async () => {
      document.title = 'Garden';
      const { wrapper } = mountShell({ activeView: 'plants' });

      expect(document.title).toBe('Plants - Garden');

      await wrapper.setProps({ viewTitle: 'Garden' } as never);
      expect(document.title).toBe('Garden');
    });

    it("moves focus to a new view's heading, or the view itself without one", async () => {
      const { wrapper } = mountShell(
        {},
        {
          default: ({ activeView }: { activeView: string }) =>
            activeView === 'plants' ? h('h1', 'Plants') : h('p', 'No heading'),
        },
      );

      await wrapper.setProps({ activeView: 'plants' } as never);
      await nextTick();
      const heading = wrapper.find('h1').element;
      expect(document.activeElement).toBe(heading);
      expect(heading.getAttribute('tabindex')).toBe('-1');

      await wrapper.setProps({ activeView: 'home' } as never);
      await nextTick();
      expect(document.activeElement).toBe(wrapper.find('#app-main').element);
    });

    it('leaves focus alone when the user has already moved into the view', async () => {
      const { wrapper } = mountShell(
        {},
        { default: () => [h('h1', 'Title'), h('button', { id: 'inside' }, 'Inside')] },
      );
      (wrapper.find('#inside').element as HTMLElement).focus();

      await wrapper.setProps({ activeView: 'plants' } as never);
      await nextTick();

      expect(document.activeElement?.id).toBe('inside');
    });
  });

  describe('drawer', () => {
    it.each([
      ['nothing stored', {}, null, false],
      ['defaultRail', { defaultRail: true }, null, true],
      ['a stored rail', {}, 'true', true],
      ['a stored rail over defaultRail', { defaultRail: true }, 'false', false],
      ['railLocked', { railLocked: true }, 'false', true],
      ['fixedDrawer', { fixedDrawer: true, railLocked: true }, 'true', false],
    ])('is a rail or not given %s', (_, props, stored, rail) => {
      if (stored !== null) localStorage.setItem('garden.drawerRail', stored);
      const { drawer } = mountShell(props);

      expect(drawer().props('rail')).toBe(rail);
    });

    it("can't be collapsed with fixedDrawer", () => {
      const { drawer } = mountShell({ fixedDrawer: true });

      expect(drawer().props('collapsible')).toBe(false);
    });

    it('keeps the rail and the collapsed sections the user picks', async () => {
      const { drawer } = mountShell();
      drawer().vm.$emit('update:rail', true);
      drawer().vm.$emit('update:collapsedSections', ['Garden']);
      await nextTick();

      expect(drawer().props('rail')).toBe(true);
      expect(drawer().props('collapsedSections')).toEqual(['Garden']);
      expect(localStorage.getItem('garden.drawerRail')).toBe('true');
      expect(localStorage.getItem('garden.collapsedSections')).toBe('["Garden"]');
    });

    it.each([
      ['a list', '["Garden", 3]', ['Garden']],
      ['not a list', '{"Garden": true}', []],
      ['not JSON', 'Garden', []],
    ])('reads the stored collapsed sections when they are %s', (_, stored, expected) => {
      localStorage.setItem('garden.collapsedSections', stored);
      const { drawer } = mountShell();

      expect(drawer().props('collapsedSections')).toEqual(expected);
    });

    it('opens from the menu button on a small screen, never a rail', async () => {
      localStorage.setItem('garden.drawerRail', 'true');
      const { wrapper, drawer } = mountShell({}, {}, small);
      const toggle = wrapper.find('#app-nav-toggle');

      expect(drawer().props()).toMatchObject({ mobile: true, rail: false, open: false });
      expect(toggle.attributes()).toMatchObject({
        'aria-label': 'Menu',
        'aria-controls': 'app-nav',
        'aria-expanded': 'false',
      });

      await toggle.trigger('click');
      expect(drawer().props('open')).toBe(true);
      expect(toggle.attributes('aria-expanded')).toBe('true');

      drawer().vm.$emit('update:open', false);
      await nextTick();
      expect(drawer().props('open')).toBe(false);
    });

    it('sends focus back to the menu button when the drawer closes with focus in it', async () => {
      const { wrapper, drawer } = mountShell({}, {}, small);
      await wrapper.find('#app-nav-toggle').trigger('click');
      (document.querySelector('#app-nav #nav-home') as HTMLElement).focus();

      drawer().vm.$emit('update:open', false);
      await nextTick();
      await nextTick();

      expect(document.activeElement?.id).toBe('app-nav-toggle');
    });

    it('leaves focus alone when the drawer closes with focus elsewhere', async () => {
      const { wrapper, drawer } = mountShell(
        {},
        { default: () => h('button', { id: 'inside' }, 'Inside') },
        small,
      );
      await wrapper.find('#app-nav-toggle').trigger('click');
      (wrapper.find('#inside').element as HTMLElement).focus();

      drawer().vm.$emit('update:open', false);
      await nextTick();
      await nextTick();

      expect(document.activeElement?.id).toBe('inside');
    });

    it('leaves focus alone when a wide screen closes the drawer', async () => {
      const { drawer } = mountShell();
      (document.querySelector('#app-nav #nav-home') as HTMLElement).focus();

      drawer().vm.$emit('update:open', true);
      await nextTick();
      drawer().vm.$emit('update:open', false);
      await nextTick();
      await nextTick();

      expect(document.activeElement?.id).toBe('nav-home');
    });
  });

  describe('theme', () => {
    const menu = (wrapper: ReturnType<typeof mountShell>['wrapper']) =>
      wrapper.findComponent({ name: 'FrThemeMenu' });

    it('starts from the theme the app is in, changing nothing, until the user picks one', () => {
      const { wrapper, themeName } = mountShell({}, {}, { theme: { defaultTheme: 'feralLight' } });

      expect(menu(wrapper).props('modelValue')).toBe('light');
      expect(themeName()).toBe('feralLight');
      expect(localStorage.getItem('garden.theme')).toBeNull();
    });

    it('applies the theme the user picked last time', () => {
      localStorage.setItem('garden.theme', 'light');
      const { wrapper, themeName } = mountShell();

      expect(menu(wrapper).props('modelValue')).toBe('light');
      expect(themeName()).toBe('feralLight');
    });

    it('ignores a stored theme that is not one', () => {
      localStorage.setItem('garden.theme', 'sepia');
      const { wrapper, themeName } = mountShell();

      expect(menu(wrapper).props('modelValue')).toBe('dark');
      expect(themeName()).toBe('feralDark');
    });

    it('applies and keeps the theme picked from the menu', async () => {
      const { wrapper, themeName } = mountShell();
      menu(wrapper).vm.$emit('update:modelValue', 'light');
      await nextTick();

      expect(themeName()).toBe('feralLight');
      expect(menu(wrapper).props('modelValue')).toBe('light');
      expect(localStorage.getItem('garden.theme')).toBe('light');
    });

    it("follows the device's colour scheme on system, as it changes", async () => {
      const scheme = stubColorScheme(true);
      const { wrapper, themeName } = mountShell();
      menu(wrapper).vm.$emit('update:modelValue', 'system');
      await nextTick();

      expect(themeName()).toBe('feralLight');
      scheme.change(false);
      expect(themeName()).toBe('feralDark');

      menu(wrapper).vm.$emit('update:modelValue', 'light');
      scheme.change(false);
      expect(themeName()).toBe('feralLight');

      wrapper.unmount();
      mounted = [];
      expect(scheme.query.removeEventListener).toHaveBeenCalledWith(
        'change',
        scheme.query.addEventListener.mock.calls[0]![1],
      );
    });

    it("applies a stored system theme from the device's scheme at startup", () => {
      stubColorScheme(true);
      localStorage.setItem('garden.theme', 'system');
      const { themeName } = mountShell();

      expect(themeName()).toBe('feralLight');
    });

    it("is dark on system where the device's scheme can't be read", () => {
      vi.stubGlobal('matchMedia', undefined);
      localStorage.setItem('garden.theme', 'system');
      const { themeName } = mountShell({}, {}, { theme: { defaultTheme: 'feralLight' } });

      expect(themeName()).toBe('feralDark');
    });
  });

  describe('search', () => {
    it('without a search, opens the command palette from a search button', async () => {
      const { wrapper, palette } = mountShell();
      const pill = wrapper.find('.fr-app-shell__search-pill');

      expect(wrapper.find('#app-search').exists()).toBe(false);
      expect(pill.text()).toContain('Search...');
      expect(pill.find('.fr-app-shell__shortcut').text()).toBe('Ctrl+K');
      expect(pill.attributes('aria-keyshortcuts')).toBe('Control+K');

      await pill.trigger('click');
      expect(palette().props('open')).toBe(true);
    });

    it('with a search, holds a box bound to it', async () => {
      const { wrapper, shell } = mountShell({ search: '', searchLabel: 'Search plants...' });
      const input = wrapper.find('#app-search');

      expect(input.attributes()).toMatchObject({
        placeholder: 'Search plants...',
        'aria-label': 'Search plants...',
        'aria-keyshortcuts': '/',
      });
      expect(wrapper.find('.fr-app-shell__search--filled').exists()).toBe(false);

      await input.setValue('basil');
      await input.trigger('keyup', { key: 'Escape' });
      expect(shell().emitted('update:search')).toEqual([['basil'], ['']]);

      await wrapper.setProps({ search: 'basil' } as never);
      expect(wrapper.find('.fr-app-shell__search--filled').exists()).toBe(true);
      await wrapper.find('.v-field__clearable .v-icon').trigger('click');
      expect(shell().emitted('update:search')!.at(-1)).toEqual(['']);
    });

    it("opens the command palette from the box's Ctrl+K button", async () => {
      const { wrapper, palette } = mountShell({ search: '' });
      const button = wrapper
        .find('#app-search')
        .element.closest('.v-field')!
        .querySelector('button.fr-app-shell__shortcut') as HTMLElement;

      expect(button.getAttribute('aria-keyshortcuts')).toBe('Control+K');
      button.click();
      await nextTick();
      expect(palette().props('open')).toBe(true);
    });

    it('on a small screen, opens the command palette from a search icon', async () => {
      const { wrapper, palette } = mountShell({ search: '' }, {}, small);

      expect(wrapper.find('#app-search').exists()).toBe(false);
      const button = wrapper.find('.fr-app-shell__search-button');
      expect(button.attributes('aria-label')).toBe('Search');
      await button.trigger('click');
      expect(palette().props('open')).toBe(true);
    });
  });

  describe('keyboard', () => {
    it.each([
      ['Ctrl+K', { key: 'k', ctrlKey: true }],
      ['Cmd+K', { key: 'k', metaKey: true }],
    ])('opens the command palette on %s', async (_, init) => {
      const { palette } = mountShell();
      const event = key(init);
      await nextTick();

      expect(event.defaultPrevented).toBe(true);
      expect(palette().props('open')).toBe(true);
    });

    it('closes the command palette when it asks to', async () => {
      const { palette } = mountShell();
      key({ key: 'k', ctrlKey: true });
      await nextTick();
      palette().vm.$emit('update:open', false);
      await nextTick();

      expect(palette().props('open')).toBe(false);
    });

    it('ignores K alone', async () => {
      const { palette } = mountShell();
      const event = key({ key: 'k' });
      await nextTick();

      expect(event.defaultPrevented).toBe(false);
      expect(palette().props('open')).toBe(false);
    });

    it('focuses the search box on /', () => {
      const { wrapper } = mountShell({ search: '' });
      const event = key({ key: '/' });

      expect(event.defaultPrevented).toBe(true);
      expect(document.activeElement).toBe(wrapper.find('#app-search').element);
    });

    it.each([
      ['in a text field', () => document.querySelector<HTMLElement>('#typing')!],
      ['in editable content', () => document.querySelector<HTMLElement>('#editable')!],
    ])('leaves / to the user typing %s', (_, target) => {
      mountShell(
        { search: '' },
        {
          default: () => [
            h('textarea', { id: 'typing' }),
            h('div', { id: 'editable', contenteditable: 'true' }),
          ],
        },
      );
      const element = target();
      // jsdom doesn't compute isContentEditable
      if (element.id === 'editable')
        Object.defineProperty(element, 'isContentEditable', { value: true });
      const event = key({ key: '/' }, element);

      expect(event.defaultPrevented).toBe(false);
    });

    it('does nothing on / without a search box, or with the shortcut turned off', () => {
      const without = mountShell();
      expect(key({ key: '/' }).defaultPrevented).toBe(false);
      without.wrapper.unmount();
      mounted = [];

      localStorage.setItem('garden.slashShortcut', 'false');
      const { wrapper } = mountShell({ search: '' });
      expect(key({ key: '/' }).defaultPrevented).toBe(false);
      expect(wrapper.find('#app-search').attributes('aria-keyshortcuts')).toBeUndefined();
    });

    it('stops listening once unmounted', () => {
      const { wrapper } = mountShell();
      wrapper.unmount();
      mounted = [];

      expect(key({ key: 'k', ctrlKey: true }).defaultPrevented).toBe(false);
    });
  });

  describe('command palette', () => {
    const items = (palette: ReturnType<typeof mountShell>['palette']) =>
      palette().props('items') as FrCommandPaletteItem[];

    it("searches the drawer's links, the commands and the shell's own actions", () => {
      const sources = [{ section: 'Varieties', search: () => [] }];
      const { palette } = mountShell({
        commands: [
          { value: 'new-plant', title: 'New plant', icon: 'mdi-plus' },
          { value: 'export', title: 'Export', section: 'DATA' },
        ],
        searchSources: sources,
      });

      expect(palette().props('sources')).toEqual(sources);
      expect(items(palette)).toEqual([
        {
          value: 'home',
          title: 'Home',
          icon: 'mdi-home',
          section: '',
          description: undefined,
          to: undefined,
          href: undefined,
          type: 'nav',
        },
        {
          value: 'plants',
          title: 'Plants',
          icon: 'mdi-leaf',
          section: 'Garden',
          description: 'All of them',
          to: undefined,
          href: undefined,
          type: 'nav',
        },
        {
          value: 'plots',
          title: 'Plots',
          icon: undefined,
          section: 'Garden',
          description: undefined,
          to: '/plots',
          href: undefined,
          type: 'nav',
        },
        {
          value: 'docs',
          title: 'Docs',
          icon: undefined,
          section: 'Garden',
          description: undefined,
          to: undefined,
          href: 'https://example.com/docs',
          type: 'nav',
        },
        {
          value: 'new-plant',
          title: 'New plant',
          icon: 'mdi-plus',
          section: 'ACTIONS',
          type: 'command',
        },
        { value: 'export', title: 'Export', section: 'DATA', type: 'command' },
        {
          value: 'toggle-theme',
          title: 'Light theme',
          icon: 'mdi-white-balance-sunny',
          section: 'ACTIONS',
          type: 'action',
        },
      ]);
    });

    it('offers the dark theme in the light one, and the / shortcut with a search box', () => {
      localStorage.setItem('garden.theme', 'light');
      const { palette } = mountShell({ search: '' });

      expect(
        items(palette)
          .slice(-2)
          .map((item) => item.title),
      ).toEqual(['Dark theme', 'Turn off the / search shortcut']);
    });

    it('switches between light and dark', async () => {
      const { palette, themeName } = mountShell();
      palette().vm.$emit('select', items(palette).at(-1));
      await nextTick();

      expect(themeName()).toBe('feralLight');
      expect(localStorage.getItem('garden.theme')).toBe('light');
      expect(items(palette).at(-1)!.title).toBe('Dark theme');

      palette().vm.$emit('select', items(palette).at(-1));
      expect(themeName()).toBe('feralDark');
    });

    it('turns the / shortcut off and on again, keeping the choice', async () => {
      const { palette } = mountShell({ search: '' });
      palette().vm.$emit('select', items(palette).at(-1));
      await nextTick();

      expect(localStorage.getItem('garden.slashShortcut')).toBe('false');
      expect(key({ key: '/' }).defaultPrevented).toBe(false);
      expect(items(palette).at(-1)!.title).toBe('Turn on the / search shortcut');

      palette().vm.$emit('select', items(palette).at(-1));
      expect(localStorage.getItem('garden.slashShortcut')).toBe('true');
    });

    it('reports a command picked', () => {
      const { shell, palette } = mountShell({ commands: [{ value: 'export', title: 'Export' }] });
      palette().vm.$emit(
        'select',
        items(palette).find((item) => item.value === 'export'),
      );

      expect(shell().emitted('command')).toEqual([['export']]);
    });

    it('goes to a link picked: its view, its route or its address', async () => {
      const open = vi.spyOn(window, 'open').mockReturnValue(null);
      const { shell, palette, router } = mountShell();
      const push = vi.spyOn(router, 'push');
      const pick = (value: string) =>
        palette().vm.$emit(
          'select',
          items(palette).find((item) => item.value === value),
        );

      pick('plants');
      pick('plots');
      pick('docs');

      expect(shell().emitted('update:activeView')).toEqual([['plants']]);
      expect(push).toHaveBeenCalledWith('/plots');
      expect(open).toHaveBeenCalledWith('https://example.com/docs', '_blank', 'noopener');
      open.mockRestore();
    });

    it("goes nowhere for a link's route without a router", () => {
      const wrapper = mountWithVuetify(
        FrAppShell as never,
        {
          props: {
            title: 'Garden',
            storagePrefix: 'garden',
            activeView: 'home',
            sections: [{ items: [{ value: 'home', title: 'Home' }] }],
          },
          attachTo: document.body,
        } as never,
      );
      mounted.push(wrapper);
      const palette = wrapper.findComponent({ name: 'FrCommandPalette' });

      palette.vm.$emit('select', { value: 'plots', title: 'Plots', to: '/plots', type: 'nav' });

      expect(wrapper.emitted('update:activeView')).toBeUndefined();
    });

    it("hands a source's result to the source, or opens its address", () => {
      const open = vi.spyOn(window, 'open').mockReturnValue(null);
      const { palette } = mountShell();
      const select = vi.fn();
      const result = { value: 'genovese', title: 'Genovese', href: 'https://example.com/basil' };
      const picked = (source: object, picks: FrCommandPaletteResult = result) => ({
        value: 'source-0:genovese',
        title: 'Genovese',
        section: 'Varieties',
        type: 'result',
        source: { section: 'Varieties', ...source },
        result: picks,
      });

      palette().vm.$emit('select', picked({ select }));
      palette().vm.$emit('select', picked({}));
      palette().vm.$emit('select', picked({}, { value: 'x', title: 'No address' }));

      expect(select).toHaveBeenCalledWith(result);
      expect(open).toHaveBeenCalledOnce();
      expect(open).toHaveBeenCalledWith('https://example.com/basil', '_blank', 'noopener');
      open.mockRestore();
    });
  });
});
