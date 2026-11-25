import { flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue';
import { VDialog, VTextField } from 'vuetify/components';
import {
  FrCommandPalette,
  type FrCommandPaletteItem,
  type FrCommandPaletteSource,
} from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

const items: FrCommandPaletteItem[] = [
  { value: 'home', title: 'Home', icon: 'mdi-home' },
  { value: 'plants', title: 'Plants', section: 'Garden', description: 'Every variety' },
  { value: 'plots', title: 'Plots', section: 'Garden', icon: 'mdi-vector-square' },
  { value: 'log', title: 'Activity Log', section: 'Recordkeeping' },
  { value: 'new-plant', title: 'Add a plant', section: 'ACTIONS', kind: 'command' },
];

function mountPalette(props: Record<string, unknown> = {}) {
  return mountWithVuetify(FrCommandPalette, {
    props: { open: true, items, ...props } as never,
    attachTo: document.body,
  });
}

const input = () => document.querySelector<HTMLInputElement>('.fr-command-palette input')!;
const options = () => [
  ...document.querySelectorAll<HTMLElement>('.fr-command-palette [role="option"]'),
];
const titles = () =>
  options().map((option) => option.querySelector('.v-list-item-title')?.textContent);
const active = () => document.querySelector('.fr-command-palette [aria-selected="true"]');
const live = () => document.querySelector('.fr-command-palette [aria-live="polite"]')?.textContent;

async function type(text: string) {
  input().value = text;
  input().dispatchEvent(new Event('input'));
  await flushPromises();
}

async function press(key: 'ArrowDown' | 'ArrowUp' | 'Enter' | 'Escape') {
  input().dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
  await flushPromises();
}

describe('FrCommandPalette', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
    document.body.innerHTML = '';
  });

  it('shows nothing while closed', async () => {
    mountPalette({ open: false });
    await nextTick();

    expect(document.querySelector('.fr-command-palette')).toBeNull();
  });

  it('opens as a 560px dialog named Command palette, at the top of the page', async () => {
    const wrapper = mountPalette();
    await nextTick();

    expect(wrapper.findComponent(VDialog).props()).toMatchObject({
      modelValue: true,
      maxWidth: '560',
      transition: 'dialog-top-transition',
    });
    const dialog = document.querySelector('.fr-command-palette[role="dialog"]');
    expect(dialog?.getAttribute('aria-label')).toBe('Command palette');
  });

  it('offers a search box that is a combobox over the results', async () => {
    const wrapper = mountPalette();
    await flushPromises();

    expect(input().getAttribute('placeholder')).toBe('Search views and actions...');
    expect(input().getAttribute('aria-label')).toBe('Search views and actions...');
    expect(input().getAttribute('role')).toBe('combobox');
    expect(input().getAttribute('aria-autocomplete')).toBe('list');
    expect(input().getAttribute('aria-expanded')).toBe('true');
    const listId = input().getAttribute('aria-controls');
    expect(document.getElementById(listId!)?.getAttribute('role')).toBe('listbox');
    expect(wrapper.findComponent(VTextField).props()).toMatchObject({
      variant: 'solo',
      flat: true,
      clearable: true,
      density: 'comfortable',
      prependInnerIcon: 'mdi-magnify',
    });
  });

  it('lists every item while nothing is typed, grouped by section, the first highlighted', async () => {
    mountPalette();
    await flushPromises();

    expect(titles()).toEqual(['Home', 'Plants', 'Plots', 'Activity Log', 'Add a plant']);
    const groups = [...document.querySelectorAll('.fr-command-palette [role="group"]')];
    expect(groups).toHaveLength(4);
    expect(groups[0]?.getAttribute('aria-labelledby')).toBeNull();
    const garden = document.getElementById(groups[1]!.getAttribute('aria-labelledby')!);
    expect(garden?.textContent?.trim()).toBe('Garden');
    expect(active()?.textContent).toContain('Home');
    expect(input().getAttribute('aria-activedescendant')).toBe(active()?.id);
    expect(options()[1]?.querySelector('.v-list-item-subtitle')?.textContent?.trim()).toBe(
      'Every variety',
    );
    expect(options()[0]?.querySelector('.mdi-home')).not.toBeNull();
    expect(options()[0]?.classList).toContain('v-list-item--active');
    expect(live()).toBe('5 results');
  });

  it('keeps the items that match every word typed, best first, searching sections too', async () => {
    mountPalette();
    await flushPromises();

    await type('pl');
    expect(titles()).toEqual(['Plants', 'Plots', 'Add a plant']);
    expect(active()?.textContent).toContain('Plants');

    await type('garden pl');
    expect(titles()).toEqual(['Plants', 'Plots']);

    await type('  variety  ');
    expect(titles()).toEqual(['Plants']);
    expect(live()).toBe('1 result');
  });

  it('says so when nothing matches', async () => {
    mountPalette();
    await flushPromises();

    await type('zucchini');

    expect(options()).toHaveLength(0);
    expect(document.querySelector('.fr-command-palette__empty')?.textContent?.trim()).toBe(
      'No matches found',
    );
    expect(input().getAttribute('aria-expanded')).toBe('false');
    expect(input().hasAttribute('aria-controls')).toBe(false);
    expect(input().hasAttribute('aria-activedescendant')).toBe(false);
    expect(live()).toBe('No matches found');

    await press('ArrowDown');
    await press('Enter');
    expect(active()).toBeNull();
  });

  it('lists everything again when the search is cleared', async () => {
    const wrapper = mountPalette();
    await flushPromises();
    await type('plo');

    wrapper.findComponent(VTextField).vm.$emit('update:modelValue', null);
    await flushPromises();

    expect(titles()).toHaveLength(5);
  });

  it('moves the highlight with the arrows, wrapping, and follows the mouse', async () => {
    mountPalette();
    await flushPromises();
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;

    await press('ArrowDown');
    expect(active()?.textContent).toContain('Plants');
    expect(scrollIntoView).toHaveBeenLastCalledWith({ block: 'nearest' });

    await press('ArrowUp');
    await press('ArrowUp');
    expect(active()?.textContent).toContain('Add a plant');

    await press('ArrowDown');
    expect(active()?.textContent).toContain('Home');

    options()[3]?.dispatchEvent(new MouseEvent('mouseenter'));
    await nextTick();
    expect(active()?.textContent).toContain('Activity Log');
    delete (Element.prototype as Partial<Element>).scrollIntoView;
  });

  it('picks the highlighted item on Enter, reporting it and closing', async () => {
    const wrapper = mountPalette();
    await flushPromises();

    await press('ArrowDown');
    await press('Enter');

    expect(wrapper.emitted('select')).toEqual([[items[1]]]);
    expect(wrapper.emitted('update:open')).toEqual([[false]]);
  });

  it('picks an item on a click, with its extra fields', async () => {
    const wrapper = mountPalette();
    await flushPromises();

    options()[4]?.click();
    await flushPromises();

    expect(wrapper.emitted('select')?.[0]?.[0]).toMatchObject({
      value: 'new-plant',
      kind: 'command',
    });
    expect(wrapper.emitted('update:open')).toEqual([[false]]);
  });

  it('closes on Escape', async () => {
    const wrapper = mountPalette();
    await flushPromises();

    await press('Escape');

    expect(wrapper.emitted('update:open')).toEqual([[false]]);
    expect(wrapper.emitted('select')).toBeUndefined();
  });

  it('reports Vuetify closing it, as on a click outside it', async () => {
    const wrapper = mountPalette();
    await flushPromises();

    wrapper.findComponent(VDialog).vm.$emit('update:modelValue', false);

    expect(wrapper.emitted('update:open')).toEqual([[false]]);
  });

  it('starts afresh each time it opens', async () => {
    const wrapper = mountPalette({ open: false });
    await wrapper.setProps({ open: true } as never);
    await flushPromises();
    await type('plo');
    await press('ArrowDown');

    await wrapper.setProps({ open: false } as never);
    await wrapper.setProps({ open: true } as never);
    await flushPromises();

    expect(input().value).toBe('');
    expect(titles()).toHaveLength(5);
    expect(active()?.textContent).toContain('Home');
  });

  it('focuses the search box once open', async () => {
    const wrapper = mountPalette();
    await flushPromises();
    (document.activeElement as HTMLElement | null)?.blur();

    wrapper.findComponent(VDialog).vm.$emit('afterEnter');
    await flushPromises();

    expect(document.activeElement).toBe(input());
  });

  describe('on closing', () => {
    function mountFromButton() {
      const button = document.createElement('button');
      document.body.append(button);
      button.focus();
      const wrapper = mountPalette({ open: false });
      return { button, wrapper };
    }

    async function openThenClose(wrapper: ReturnType<typeof mountPalette>) {
      await wrapper.setProps({ open: true } as never);
      await flushPromises();
      await wrapper.setProps({ open: false } as never);
      await flushPromises();
    }

    it('gives focus back to what opened it when focus was in the palette', async () => {
      const { button, wrapper } = mountFromButton();
      await wrapper.setProps({ open: true } as never);
      await flushPromises();
      input().focus();

      wrapper.findComponent(VDialog).vm.$emit('afterLeave');

      expect(document.activeElement).toBe(button);
    });

    it('gives focus back when it was lost to the page', async () => {
      const { button, wrapper } = mountFromButton();
      await openThenClose(wrapper);
      button.blur();

      wrapper.findComponent(VDialog).vm.$emit('afterLeave');

      expect(document.activeElement).toBe(button);
    });

    it('leaves focus where the user put it', async () => {
      const { wrapper } = mountFromButton();
      const elsewhere = document.createElement('input');
      document.body.append(elsewhere);
      await openThenClose(wrapper);
      elsewhere.focus();

      wrapper.findComponent(VDialog).vm.$emit('afterLeave');

      expect(document.activeElement).toBe(elsewhere);
    });

    it('does nothing when what opened it has gone, or it closes twice', async () => {
      const { button, wrapper } = mountFromButton();
      await openThenClose(wrapper);
      button.remove();

      wrapper.findComponent(VDialog).vm.$emit('afterLeave');
      wrapper.findComponent(VDialog).vm.$emit('afterLeave');

      expect(document.activeElement).toBe(document.body);
    });
  });

  describe('with sources', () => {
    const people: FrCommandPaletteSource = {
      section: 'People',
      suggest: () => [{ value: 'ada', title: 'Ada Lovelace', icon: 'mdi-account' }],
      search(query) {
        return Promise.resolve(
          [
            { value: 'ada', title: 'Ada Lovelace', description: this.section },
            { value: 'alan', title: 'Alan Turing' },
          ].filter((person) => person.title.toLowerCase().includes(query.toLowerCase())),
        );
      },
    };
    const recent: FrCommandPaletteSource = { section: 'Recent', suggest: () => null };

    it('names the searchable sources in the placeholder', async () => {
      mountPalette({ sources: [people, recent, { section: 'Plans', search: () => [] }] });
      await flushPromises();

      expect(input().getAttribute('placeholder')).toBe(
        'Search views, actions, and people, plans...',
      );
    });

    it("leads an empty search with the sources' suggestions", async () => {
      mountPalette({ sources: [people, recent] });
      await flushPromises();

      expect(titles()).toEqual([
        'Ada Lovelace',
        'Home',
        'Plants',
        'Plots',
        'Activity Log',
        'Add a plant',
      ]);
      expect(active()?.textContent).toContain('Ada Lovelace');
      expect(active()?.querySelector('.mdi-account')).not.toBeNull();
    });

    it("follows the items' matches with the sources' search results", async () => {
      mountPalette({ sources: [people, { section: 'Silent' }] });
      await flushPromises();

      await type('a');

      expect(titles().slice(-2)).toEqual(['Ada Lovelace', 'Alan Turing']);
      expect(options().at(-2)?.querySelector('.v-list-item-subtitle')?.textContent?.trim()).toBe(
        'People',
      );
    });

    it("reports a source's result with its source, keyed apart from the items", async () => {
      const wrapper = mountPalette({ sources: [people] });
      await flushPromises();

      await press('Enter');

      expect(wrapper.emitted('select')?.[0]?.[0]).toEqual({
        value: 'source-0:ada',
        title: 'Ada Lovelace',
        description: undefined,
        icon: 'mdi-account',
        section: 'People',
        type: 'result',
        source: people,
        result: { value: 'ada', title: 'Ada Lovelace', icon: 'mdi-account' },
      });
    });

    it('drops an answer to a search the user has since changed', async () => {
      let answer: (results: { value: string; title: string }[]) => void = () => {};
      const slow: FrCommandPaletteSource = {
        section: 'Slow',
        search: () => new Promise((resolve) => (answer = resolve)),
      };
      mountPalette({ sources: [slow] });
      await flushPromises();

      await type('first');
      const first = answer;
      await type('second');
      first([{ value: 'stale', title: 'Stale first' }]);
      await flushPromises();
      expect(titles()).toEqual([]);

      answer([{ value: 'fresh', title: 'Fresh second' }]);
      await flushPromises();
      expect(titles()).toEqual(['Fresh second']);
    });

    it('keeps a highlight the user moved when suggestions arrive', async () => {
      let answer: (results: { value: string; title: string }[]) => void = () => {};
      const slow: FrCommandPaletteSource = {
        section: 'Slow',
        suggest: () => new Promise((resolve) => (answer = resolve)),
      };
      mountPalette({ sources: [slow] });
      await flushPromises();
      await press('ArrowDown');

      answer([{ value: 'recent', title: 'Recent plot' }]);
      await flushPromises();

      expect(titles()[0]).toBe('Recent plot');
      expect(active()?.textContent).toContain('Plants');
    });

    it('moves the highlight to the first result when the highlighted one goes', async () => {
      const wrapper = mountPalette();
      await flushPromises();
      options()[3]?.dispatchEvent(new MouseEvent('mouseenter'));
      await nextTick();

      await wrapper.setProps({ items: items.filter((item) => item.value !== 'log') } as never);
      await flushPromises();

      expect(active()?.textContent).toContain('Home');
    });
  });
});
