import { flushPromises } from '@vue/test-utils';
import { defineComponent, h, nextTick } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';
import { VLayout, VNavigationDrawer, VTooltip } from 'vuetify/components';
import { FrAppNavigationDrawer, type FrAppNavigationSection } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

const sections: FrAppNavigationSection[] = [
  {
    items: [{ value: 'home', title: 'Home', icon: 'mdi-home' }],
  },
  {
    label: 'Garden',
    items: [
      { value: 'plants', title: 'Plants', subtitle: 'All of them', icon: 'mdi-leaf' },
      { value: 'plots', title: 'Plots', icon: 'mdi-vector-square', to: '/plots' },
    ],
  },
  {
    label: 'Help',
    items: [{ value: 'docs', title: 'Docs', icon: 'mdi-book', href: 'https://example.com/docs' }],
  },
];

/** A drawer needs a layout around it, and its `to` links a router */
function mountDrawer(props: Record<string, unknown> = {}, slots: Record<string, unknown> = {}) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { render: () => null } },
      { path: '/plots', component: { render: () => null } },
    ],
  });
  const Host = defineComponent({
    inheritAttrs: false,
    setup(_, { attrs }) {
      return () =>
        h(VLayout, () =>
          h(
            FrAppNavigationDrawer,
            { title: 'Vigilant Harvest', sections, activeView: 'home', ...attrs },
            slots,
          ),
        );
    },
  });
  const wrapper = mountWithVuetify(Host, {
    attrs: props,
    global: { plugins: [router] },
    attachTo: document.body,
  });
  const drawer = () => wrapper.findComponent({ name: 'FrAppNavigationDrawer' });
  return { wrapper, drawer, router };
}

describe('FrAppNavigationDrawer', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
    document.body.innerHTML = '';
  });

  describe('on a wide screen', () => {
    it('is a permanent 240px surface drawer named Main, marked fr-app-navigation-drawer', () => {
      const { wrapper } = mountDrawer();
      const nav = wrapper.find('nav');

      expect(nav.attributes('id')).toBe('app-nav');
      expect(nav.attributes('aria-label')).toBe('Main');
      expect(nav.classes()).toEqual(
        expect.arrayContaining([
          'fr-app-navigation-drawer',
          'bg-surface',
          'v-navigation-drawer--active',
        ]),
      );
      expect(nav.classes()).not.toContain('v-navigation-drawer--temporary');
      expect(nav.attributes('style')).toContain('width: 240px');
      expect(wrapper.findComponent(VNavigationDrawer).props()).toMatchObject({
        permanent: true,
        temporary: false,
        modelValue: true,
        retainFocus: false,
      });
    });

    it('shows the logo, the title and the subtitle', () => {
      const { wrapper } = mountDrawer({ subtitle: 'Garden planner' });
      const brand = wrapper.find('.fr-app-navigation-drawer__brand');

      expect(
        brand.find('.fr-app-navigation-drawer__mark svg.fr-app-logo').attributes('width'),
      ).toBe('24');
      expect(brand.find('.fr-app-navigation-drawer__title').text()).toBe('Vigilant Harvest');
      expect(brand.find('.fr-app-navigation-drawer__subtitle').text()).toBe('Garden planner');
    });

    it('leaves the subtitle out when there is none', () => {
      const { wrapper } = mountDrawer();

      expect(wrapper.find('.fr-app-navigation-drawer__subtitle').exists()).toBe(false);
    });

    it('offers to collapse to a rail', async () => {
      const { wrapper, drawer } = mountDrawer();
      const collapse = wrapper.find('.fr-app-navigation-drawer__collapse');

      expect(collapse.attributes('aria-label')).toBe('Collapse navigation');
      expect(collapse.attributes('aria-expanded')).toBe('true');
      await collapse.trigger('click');

      expect(drawer().emitted('update:rail')).toEqual([[true]]);
    });

    it('offers no collapse when not collapsible', () => {
      const { wrapper } = mountDrawer({ collapsible: false });

      expect(wrapper.find('.fr-app-navigation-drawer__collapse').exists()).toBe(false);
    });

    it('ignores Escape', async () => {
      const { wrapper, drawer } = mountDrawer();

      await wrapper.find('nav').trigger('keydown', { key: 'Escape' });

      expect(drawer().emitted('update:open')).toBeUndefined();
    });

    it('leaves the drawer open when an item is picked', async () => {
      const { wrapper, drawer } = mountDrawer();

      await wrapper.find('#nav-plants').trigger('click');

      expect(drawer().emitted('update:activeView')).toEqual([['plants']]);
      expect(drawer().emitted('update:open')).toBeUndefined();
    });
  });

  describe('as a rail', () => {
    it('is 64px wide, its brand a button that expands it, showing a larger logo', async () => {
      const { wrapper, drawer } = mountDrawer({ rail: true });
      const brand = wrapper.find('button.fr-app-navigation-drawer__brand--rail');

      expect(wrapper.find('nav').attributes('style')).toContain('width: 64px');
      expect(wrapper.find('.fr-app-navigation-drawer__title').exists()).toBe(false);
      expect(brand.attributes()).toMatchObject({
        type: 'button',
        'aria-label': 'Expand navigation',
        'aria-expanded': 'false',
      });
      expect(brand.find('svg.fr-app-logo').attributes('width')).toBe('28');

      await brand.trigger('click');

      expect(drawer().emitted('update:rail')).toEqual([[false]]);
    });

    it('shows icons only, named by tooltips, with dividers in place of headings', () => {
      const { wrapper } = mountDrawer({ rail: true });

      expect(wrapper.find('.fr-app-navigation-drawer__nav--rail').exists()).toBe(true);
      expect(wrapper.find('.fr-app-navigation-drawer__section').exists()).toBe(false);
      expect(wrapper.findAll('.fr-app-navigation-drawer__nav > .v-divider')).toHaveLength(2);
      expect(wrapper.find('#nav-plants .v-list-item__content').text()).toBe('');
      expect(wrapper.find('#nav-plants').attributes('aria-label')).toBe('Plants');
      expect(wrapper.findAllComponents(VTooltip).map((tooltip) => tooltip.props())).toEqual(
        ['Home', 'Plants', 'Plots', 'Docs'].map(() =>
          expect.objectContaining({ activator: 'parent', location: 'end' }),
        ),
      );
    });

    it('shows every section, collapsed or not', () => {
      const { wrapper } = mountDrawer({ rail: true, collapsedSections: ['Garden'] });

      expect(wrapper.find('#app-nav-section-1').isVisible()).toBe(true);
      expect(wrapper.find('#app-nav-section-1').attributes('aria-labelledby')).toBeUndefined();
    });
  });

  describe('on a small screen', () => {
    it('is a temporary drawer, hidden until open, that keeps focus and is never a rail', () => {
      const { wrapper } = mountDrawer({ mobile: true, rail: true });

      expect(wrapper.findComponent(VNavigationDrawer).props()).toMatchObject({
        permanent: false,
        temporary: true,
        modelValue: false,
        retainFocus: true,
      });
      expect(wrapper.find('nav').attributes('style')).toContain('width: 240px');
      expect(wrapper.find('.fr-app-navigation-drawer__title').exists()).toBe(true);
      expect(wrapper.find('.fr-app-navigation-drawer__collapse').exists()).toBe(false);
    });

    it('shows while open', () => {
      const { wrapper } = mountDrawer({ mobile: true, open: true });

      expect(wrapper.findComponent(VNavigationDrawer).props('modelValue')).toBe(true);
      expect(wrapper.find('nav').classes()).toContain('v-navigation-drawer--active');
    });

    it('closes on Escape', async () => {
      const { wrapper, drawer } = mountDrawer({ mobile: true, open: true });

      await wrapper.find('nav').trigger('keydown', { key: 'Escape' });

      expect(drawer().emitted('update:open')).toEqual([[false]]);
    });

    it('reports Vuetify closing it, as on a click outside it', () => {
      const { wrapper, drawer } = mountDrawer({ mobile: true, open: true });

      wrapper.findComponent(VNavigationDrawer).vm.$emit('update:modelValue', false);

      expect(drawer().emitted('update:open')).toEqual([[false]]);
    });

    it('closes when an item is picked', async () => {
      const { wrapper, drawer } = mountDrawer({ mobile: true, open: true });

      await wrapper.find('#nav-plants').trigger('click');

      expect(drawer().emitted('update:activeView')).toEqual([['plants']]);
      expect(drawer().emitted('update:open')).toEqual([[false]]);
    });
  });

  describe('its sections', () => {
    it('heads a labelled section with a button that controls its group', () => {
      const { wrapper } = mountDrawer();
      const headings = wrapper.findAll('button.fr-app-navigation-drawer__section');

      expect(headings.map((heading) => heading.text())).toEqual(['Garden', 'Help']);
      expect(headings[0]?.attributes()).toMatchObject({
        type: 'button',
        'aria-expanded': 'true',
        'aria-controls': 'app-nav-section-1',
      });
      expect(headings[0]?.find('#app-nav-section-1-label').text()).toBe('Garden');
      expect(headings[0]?.find('.mdi-chevron-down').exists()).toBe(true);
      const group = wrapper.find('#app-nav-section-1');
      expect(group.attributes('role')).toBe('group');
      expect(group.attributes('aria-labelledby')).toBe('app-nav-section-1-label');
    });

    it('gives a section without a label no heading', () => {
      const { wrapper } = mountDrawer();
      const group = wrapper.find('#app-nav-section-0');

      expect(group.attributes('aria-labelledby')).toBeUndefined();
      expect(group.find('#nav-home').exists()).toBe(true);
    });

    it('collapses and expands a section from its heading, reporting the collapsed labels', async () => {
      const { wrapper, drawer } = mountDrawer({ collapsedSections: ['Help'] });
      const garden = wrapper.find('button.fr-app-navigation-drawer__section');

      await garden.trigger('click');

      expect(drawer().emitted('update:collapsedSections')).toEqual([[['Help', 'Garden']]]);
      expect(garden.attributes('aria-expanded')).toBe('false');
      expect(garden.find('.fr-app-navigation-drawer__section-chevron--collapsed').exists()).toBe(
        true,
      );
      expect(wrapper.find('#app-nav-section-1').isVisible()).toBe(false);

      await garden.trigger('click');

      expect(drawer().emitted('update:collapsedSections')?.[1]).toEqual([['Help']]);
      expect(garden.attributes('aria-expanded')).toBe('true');
      expect(wrapper.find('#app-nav-section-1').isVisible()).toBe(true);
    });

    it('follows collapsedSections when the host changes it', async () => {
      const { wrapper } = mountDrawer({ collapsedSections: ['Garden'] });
      expect(wrapper.find('#app-nav-section-1').isVisible()).toBe(false);
      expect(wrapper.find('#app-nav-section-2').isVisible()).toBe(true);

      await wrapper.setProps({ collapsedSections: ['Help'] } as never);
      await nextTick();

      expect(wrapper.find('#app-nav-section-1').isVisible()).toBe(true);
      expect(wrapper.find('#app-nav-section-2').isVisible()).toBe(false);
    });
  });

  describe('its items', () => {
    it('marks the active view as the current page', () => {
      const { wrapper } = mountDrawer({ activeView: 'plants' });
      const plants = wrapper.find('#nav-plants');

      expect(plants.attributes('aria-current')).toBe('page');
      expect(plants.classes()).toEqual(
        expect.arrayContaining([
          'v-list-item--active',
          'text-primary',
          'fr-app-navigation-drawer__item',
        ]),
      );
      expect(wrapper.find('#nav-home').attributes('aria-current')).toBeUndefined();
      expect(wrapper.find('#nav-home').classes()).not.toContain('v-list-item--active');
    });

    it('shows each item with its icon, title and subtitle, read as a link', () => {
      const { wrapper } = mountDrawer();
      const plants = wrapper.find('#nav-plants');

      expect(plants.attributes('role')).toBe('link');
      expect(plants.attributes('aria-label')).toBe('Plants');
      expect(plants.find('.mdi-leaf').exists()).toBe(true);
      expect(plants.find('.v-list-item-title').text()).toBe('Plants');
      expect(plants.find('.v-list-item-subtitle').text()).toBe('All of them');
    });

    it('routes an item with to, leaving activeView to the router', async () => {
      const { wrapper, drawer, router } = mountDrawer();
      const plots = wrapper.find('#nav-plots');

      expect(plots.element.tagName).toBe('A');
      expect(plots.attributes('href')).toBe('/plots');
      expect(plots.attributes('role')).toBeUndefined();

      await plots.trigger('click');
      await flushPromises();

      expect(router.currentRoute.value.path).toBe('/plots');
      expect(drawer().emitted('update:activeView')).toBeUndefined();
      expect(wrapper.find('#nav-plots').classes()).toContain('v-list-item--active');
    });

    it('opens an item with href in a new tab', async () => {
      const { wrapper, drawer } = mountDrawer();
      const docs = wrapper.find('#nav-docs');

      expect(docs.attributes()).toMatchObject({
        href: 'https://example.com/docs',
        target: '_blank',
        rel: 'noopener noreferrer',
      });
      expect(docs.attributes('role')).toBeUndefined();
      docs.element.addEventListener('click', (event) => event.preventDefault());

      await docs.trigger('click');

      expect(drawer().emitted('update:activeView')).toBeUndefined();
    });
  });

  it.each([
    [false, '.v-navigation-drawer__append .footer'],
    [true, '.v-navigation-drawer__append .footer'],
  ])('puts the footer at the foot, telling it the drawer is a rail: %s', (rail, selector) => {
    const footer = (scope: { rail: boolean }) => h('span', { class: 'footer' }, String(scope.rail));

    expect(mountDrawer({ rail }, { footer }).wrapper.find(selector).text()).toBe(String(rail));
  });

  it('has no foot without a footer', () => {
    expect(mountDrawer().wrapper.find('.v-navigation-drawer__append').exists()).toBe(false);
  });
});
