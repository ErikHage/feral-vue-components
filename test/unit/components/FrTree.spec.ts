import { flushPromises } from '@vue/test-utils';
import { h } from 'vue';
import { VTreeview } from 'vuetify/components';
import { FrTree, frTreeDefaults } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

interface Plot {
  id: number;
  title: string;
  children?: Plot[];
}

const items: Plot[] = [
  {
    id: 1,
    title: 'North bed',
    children: [
      { id: 11, title: 'Tomatoes' },
      { id: 12, title: 'Basil' },
    ],
  },
  { id: 2, title: 'Greenhouse' },
];

function mountTree(props: Record<string, unknown> = {}, slots: Record<string, unknown> = {}) {
  return mountWithVuetify(
    FrTree as never,
    {
      props: { items, itemValue: 'id', ...props },
      slots,
    } as never,
  );
}

// A shut branch's children are rendered too, hidden: only the rows on show count
const shown = <T extends { element: Element }>(found: T[]) =>
  found.filter((node) => !node.element.closest('[style*="display: none"]'));
const rows = (wrapper: ReturnType<typeof mountTree>) =>
  shown(wrapper.findAll('.v-treeview-item .v-list-item-title')).map((title) => title.text());

describe('FrTree', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VTreeview, marked fr-tree', () => {
    const wrapper = mountTree();

    expect(wrapper.findAllComponents(VTreeview)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-treeview', 'fr-tree']));
  });

  it('is compact by default, and the caller can override it', () => {
    // One tree at a time: two live in one document make Vuetify warn of duplicate IDs
    const plain = mountTree();
    expect(plain.classes()).toContain('v-list--density-compact');
    plain.unmount();

    const comfortable = mountTree({ density: 'comfortable' });
    expect(comfortable.classes()).toContain('v-list--density-comfortable');
    expect(frTreeDefaults).toEqual({ density: 'compact' });
  });

  it("shows the top rows, and a branch's children once it is opened", () => {
    const shut = mountTree();
    expect(rows(shut)).toEqual(['North bed', 'Greenhouse']);
    shut.unmount();

    const opened = mountTree({ opened: [1] });
    expect(rows(opened)).toEqual(['North bed', 'Tomatoes', 'Basil', 'Greenhouse']);
  });

  it('reports a branch opened by its toggle through v-model:opened', async () => {
    const onUpdate = vi.fn();
    const wrapper = mountTree({ 'onUpdate:opened': onUpdate });

    await wrapper.find('.v-treeview-item .v-btn').trigger('click');

    expect(onUpdate).toHaveBeenLastCalledWith([1]);
  });

  it('puts the title, subtitle, prepend and append slots in each row, given the item', () => {
    const wrapper = mountTree(
      {},
      {
        title: ({ item }: { item: Plot }) => h('b', item.title.toUpperCase()),
        subtitle: ({ item }: { item: Plot }) => h('i', `#${item.id}`),
        prepend: ({ item }: { item: Plot }) =>
          h('span', { class: 'kind' }, item.children ? 'bed' : 'plot'),
        append: () => h('span', { class: 'count' }, '3'),
      },
    );

    expect(shown(wrapper.findAll('.v-list-item-title b')).map((b) => b.text())).toEqual([
      'NORTH BED',
      'GREENHOUSE',
    ]);
    expect(shown(wrapper.findAll('.v-list-item-subtitle i')).map((i) => i.text())).toEqual([
      '#1',
      '#2',
    ]);
    expect(shown(wrapper.findAll('.kind')).map((k) => k.text())).toEqual(['bed', 'plot']);
    expect(shown(wrapper.findAll('.count'))).toHaveLength(2);
  });

  it('draws its own titles and toggles without those slots', () => {
    const wrapper = mountTree();

    expect(rows(wrapper)).toEqual(['North bed', 'Greenhouse']);
    expect(wrapper.find('.v-treeview-item .v-btn .v-icon').exists()).toBe(true);
    expect(wrapper.find('.v-list-item-subtitle').exists()).toBe(false);
  });

  it('puts the toggle slot in place of the open arrow', () => {
    const wrapper = mountTree(
      {},
      {
        toggle: ({ isOpen }: { isOpen: boolean }) =>
          h('span', { class: 'arrow' }, isOpen ? '-' : '+'),
      },
    );

    expect(wrapper.findAll('.arrow').map((a) => a.text())).toEqual(['+']);
  });

  it('renders the item slot in place of a whole row', () => {
    const wrapper = mountTree(
      {},
      { item: ({ item }: { item: Plot }) => h('div', { class: 'own-row' }, item.title) },
    );

    expect(shown(wrapper.findAll('.own-row')).map((r) => r.text())).toEqual(['Greenhouse']);
    expect(rows(wrapper)).toEqual(['North bed']);
  });

  // VTreeview shows no-data only when a search matches nothing, not for empty items
  it('shows its own no-data row when a search finds nothing, and the no-data slot in its place', async () => {
    const plain = mountTree({ search: 'Pumpkin' });
    await flushPromises();
    expect(plain.text()).toContain('No data available');
    plain.unmount();

    const slotted = mountTree(
      { search: 'Pumpkin' },
      { 'no-data': () => h('p', { class: 'none' }, 'No plots match') },
    );
    await flushPromises();
    expect(slotted.find('.none').text()).toBe('No plots match');
  });

  it('passes VTreeview props through', () => {
    const wrapper = mountTree({ selectable: true, openOnClick: true, color: 'success' });

    expect(wrapper.findComponent(VTreeview).props()).toMatchObject({
      selectable: true,
      openOnClick: true,
      color: 'success',
    });
    expect(wrapper.find('.v-selection-control').exists()).toBe(true);
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(
      FrTree as never,
      {
        props: { items },
        attrs: { class: 'mb-4', 'data-test': 'plots' },
      } as never,
    );

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-treeview', 'fr-tree', 'mb-4']));
    expect(wrapper.attributes('data-test')).toBe('plots');
  });
});
