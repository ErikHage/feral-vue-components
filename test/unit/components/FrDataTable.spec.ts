import { h } from 'vue';
import { VDataTable } from 'vuetify/components';
import { FrDataTable, frDataTableDefaults, type FrDataTableCellScope } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Family', key: 'family' },
];
const plants = [
  { id: 1, name: 'Tomato', family: 'Nightshade' },
  { id: 2, name: 'Basil', family: 'Mint' },
];
type Plant = (typeof plants)[number];

/** The text of each body cell, row by row */
function cells(wrapper: ReturnType<typeof mountWithVuetify>): string[][] {
  return wrapper.findAll('tbody tr').map((row) => row.findAll('td').map((cell) => cell.text()));
}

describe('FrDataTable', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VDataTable, marked fr-data-table', () => {
    const wrapper = mountWithVuetify(FrDataTable);

    expect(wrapper.findAllComponents(VDataTable)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-data-table', 'fr-data-table']));
  });

  it('applies the feral defaults', () => {
    const wrapper = mountWithVuetify(FrDataTable);

    expect(wrapper.findComponent(VDataTable).props()).toMatchObject({
      density: 'compact',
      hover: true,
    });
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['v-table--density-compact', 'v-table--hover']),
    );
    expect(frDataTableDefaults).toEqual({ density: 'compact', hover: true });
  });

  it.each([
    ['density', 'comfortable'],
    ['hover', false],
  ] as const)('lets the caller override %s', (prop, value) => {
    const table = mountWithVuetify(FrDataTable, { props: { [prop]: value } as never });

    expect(table.findComponent(VDataTable).props(prop)).toBe(value);
  });

  it('renders the items under the headers', () => {
    const wrapper = mountWithVuetify(FrDataTable, { props: { headers, items: plants } });

    expect(wrapper.findAll('thead th').map((th) => th.text())).toEqual(['Name', 'Family']);
    expect(cells(wrapper)).toEqual([
      ['Tomato', 'Nightshade'],
      ['Basil', 'Mint'],
    ]);
  });

  it("fills a column's cells from its item slot, given the caller's item and the value", () => {
    const wrapper = mountWithVuetify(FrDataTable, {
      props: { headers, items: plants },
      slots: {
        // Mounted directly, the item type isn't inferred, so the slot sees unknown
        'item.family': ({ item, value, index }: FrDataTableCellScope<unknown>) =>
          h('b', `${index}:${value}/${(item as Plant).name}`),
      },
    });

    expect(cells(wrapper)).toEqual([
      ['Tomato', '0:Nightshade/Tomato'],
      ['Basil', '1:Mint/Basil'],
    ]);
  });

  it('fills a header from its header slot, given the column', () => {
    const wrapper = mountWithVuetify(FrDataTable, {
      props: { headers, items: plants },
      slots: {
        'header.name': ({ column }: { column: { title?: string } }) => h('i', `${column.title}!`),
      },
    });

    expect(wrapper.findAll('thead th').map((th) => th.text())).toEqual(['Name!', 'Family']);
  });

  it("shows the no-data slot without items, and Vuetify's text without the slot", () => {
    const slotted = mountWithVuetify(FrDataTable, {
      props: { headers, items: [] },
      slots: { 'no-data': () => h('span', { class: 'empty' }, 'No plants yet') },
    });
    const plain = mountWithVuetify(FrDataTable, {
      props: { headers, items: [], noDataText: 'Nothing here' },
    });

    expect(slotted.find('tbody .empty').text()).toBe('No plants yet');
    expect(plain.find('tbody').text()).toBe('Nothing here');
  });

  it('shows the loading slot while loading with no items', () => {
    const wrapper = mountWithVuetify(FrDataTable, {
      props: { headers, items: [], loading: true },
      slots: { loading: () => h('span', { class: 'wait' }, 'Fetching plants') },
    });

    expect(wrapper.find('tbody .wait').text()).toBe('Fetching plants');
  });

  it('puts top alone in the header bar above the table, with no actions area', () => {
    const wrapper = mountWithVuetify(FrDataTable, {
      props: { headers, items: plants },
      slots: { top: () => h('h3', { class: 'heading' }, 'Plants') },
    });

    const header = wrapper.element.firstElementChild as HTMLElement;
    expect(header.className).toBe('fr-data-table__header d-flex align-center justify-start');
    expect([...header.children].map((c) => c.className)).toEqual(['heading']);
    expect(wrapper.classes()).toContain('v-table--has-top');
  });

  it("shows the title on the left of the header bar in a card title's type, before top", () => {
    const wrapper = mountWithVuetify(FrDataTable, {
      props: { headers, items: plants, title: 'Plants' },
      slots: {
        top: () => h('input', { class: 'search' }),
        actions: () => h('button', 'Add'),
      },
    });

    const header = wrapper.get('.fr-data-table__header');
    expect([...header.element.children].map((c) => c.className)).toEqual([
      'fr-data-table__title text-title-large',
      'search',
      'fr-data-table__actions d-flex align-center ga-2 ms-auto',
    ]);
    expect(header.get('.fr-data-table__title').text()).toBe('Plants');
    expect(wrapper.attributes('title')).toBeUndefined();
  });

  it('builds a header bar for the title alone, and none without a title, top or actions', () => {
    const titled = mountWithVuetify(FrDataTable, {
      props: { headers, items: plants, title: 'Plants' },
    });
    const plain = mountWithVuetify(FrDataTable, { props: { headers, items: plants } });

    expect(titled.get('.fr-data-table__header').text()).toBe('Plants');
    expect(titled.classes()).toContain('v-table--has-top');
    expect(plain.find('.fr-data-table__header').exists()).toBe(false);
  });

  it('puts top on the left and actions on the right of one header bar', () => {
    const wrapper = mountWithVuetify(FrDataTable, {
      props: { headers, items: plants },
      slots: {
        top: () => h('h3', { class: 'heading' }, 'Plants'),
        actions: () => [h('button', 'Add'), h('button', 'Export')],
      },
    });

    const header = wrapper.element.firstElementChild as HTMLElement;
    expect(header.className).toBe('fr-data-table__header d-flex align-center justify-start');
    expect(header.firstElementChild?.className).toBe('heading');
    const actions = header.lastElementChild as HTMLElement;
    expect(actions.className).toBe('fr-data-table__actions d-flex align-center ga-2 ms-auto');
    expect([...actions.children].map((b) => b.textContent)).toEqual(['Add', 'Export']);
    expect(wrapper.findAll('.heading')).toHaveLength(1);
    expect(cells(wrapper)[0]).toEqual(['Tomato', 'Nightshade']);
  });

  it('puts actions on the right of the header bar without top', () => {
    const wrapper = mountWithVuetify(FrDataTable, {
      props: { headers, items: plants },
      slots: { actions: () => h('button', 'Add') },
    });

    const header = wrapper.get('.fr-data-table__header');
    expect(header.element.children).toHaveLength(1);
    expect(header.get('.fr-data-table__actions').classes()).toContain('ms-auto');
    expect(wrapper.classes()).toContain('v-table--has-top');
  });

  it("doesn't pass on row slots, which need Vuetify markup", () => {
    const wrapper = mountWithVuetify(FrDataTable, {
      props: { headers, items: plants },
      // Not one of FrDataTable's slots, so its type rejects it; passed anyway to prove it's dropped
      slots: { item: () => h('tr', { class: 'custom-row' }, h('td', 'Custom')) } as never,
    });

    expect(wrapper.find('.custom-row').exists()).toBe(false);
    expect(cells(wrapper)[0]).toEqual(['Tomato', 'Nightshade']);
  });

  it('passes VDataTable props through', () => {
    const wrapper = mountWithVuetify(FrDataTable, {
      props: { headers, items: plants, itemValue: 'id', showSelect: true, itemsPerPage: 1 },
    });

    expect(wrapper.findAll('tbody tr')).toHaveLength(1);
    expect(wrapper.find('tbody .v-selection-control').exists()).toBe(true);
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrDataTable, {
      attrs: { class: 'elevation-1', 'data-test': 'table', id: 'plot' },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['v-data-table', 'fr-data-table', 'elevation-1']),
    );
    expect(wrapper.attributes()).toMatchObject({ 'data-test': 'table', id: 'plot' });
  });
});
