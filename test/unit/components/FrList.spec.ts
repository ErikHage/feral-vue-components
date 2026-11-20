import { h } from 'vue';
import { VList, VListItem } from 'vuetify/components';
import { FrList, frListDefaults, type FrListPartScope, type FrListRowScope } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

interface Plant {
  name: string;
  plantId: number;
  plantings: number;
}

const plants: Plant[] = [
  { name: 'Tomato', plantId: 1, plantings: 3 },
  { name: 'Basil', plantId: 2, plantings: 1 },
];

const plantProps = { items: plants, itemTitle: 'name', itemValue: 'plantId' };

describe('FrList', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VList, marked fr-list', () => {
    const wrapper = mountWithVuetify(FrList);

    expect(wrapper.findAllComponents(VList)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-list', 'fr-list']));
  });

  it('is compact by default', () => {
    const wrapper = mountWithVuetify(FrList);

    expect(wrapper.findComponent(VList).props('density')).toBe('compact');
    expect(wrapper.classes()).toContain('v-list--density-compact');
    expect(frListDefaults).toEqual({ density: 'compact' });
  });

  it('lets the caller override density', () => {
    const wrapper = mountWithVuetify(FrList, { props: { density: 'comfortable' } });

    expect(wrapper.findComponent(VList).props('density')).toBe('comfortable');
  });

  it('renders rows written in its default slot', () => {
    const wrapper = mountWithVuetify(FrList, {
      slots: { default: () => [h(VListItem, { title: 'Recurrence', subtitle: 'Weekly' })] },
    });

    expect(wrapper.find('.v-list-item-title').text()).toBe('Recurrence');
    expect(wrapper.find('.v-list-item-subtitle').text()).toBe('Weekly');
  });

  it("builds rows from items, in Vuetify's own way without slots", () => {
    const wrapper = mountWithVuetify(FrList, { props: plantProps });

    expect(wrapper.findAll('.v-list-item-title').map((t) => t.text())).toEqual(['Tomato', 'Basil']);
  });

  it('ignores items when rows are written in the default slot', () => {
    const wrapper = mountWithVuetify(FrList, {
      props: plantProps,
      slots: { default: () => [h(VListItem, { title: 'Written' })] },
    });

    expect(wrapper.findAll('.v-list-item-title').map((t) => t.text())).toEqual(['Written']);
  });

  it.each(['title', 'subtitle', 'prepend', 'append'] as const)(
    "passes the %s slot on to each row built from items, with the row's item",
    (name) => {
      const wrapper = mountWithVuetify(FrList, {
        props: { ...plantProps, itemProps: () => ({ subtitle: 'plant' }) },
        slots: {
          [name]: ({ item }: FrListRowScope<typeof name, Plant>) =>
            h('span', { class: 'mine' }, `${item.name}: ${item.plantings}`),
        },
      });

      expect(wrapper.findAll('.mine').map((m) => m.text())).toEqual(['Tomato: 3', 'Basil: 1']);
    },
  );

  it("gives row slots Vuetify's row state", () => {
    const wrapper = mountWithVuetify(FrList, {
      props: plantProps,
      slots: {
        append: ({ isActive, isSelected }: FrListRowScope<'append', unknown>) =>
          h('span', { class: 'state' }, `${isActive} ${isSelected}`),
      },
    });

    expect(wrapper.find('.state').text()).toBe('false false');
  });

  it('passes the header, subheader and divider slots on, with props to bind', () => {
    const wrapper = mountWithVuetify(FrList, {
      props: {
        items: [
          { type: 'subheader', title: 'Herbs' },
          { title: 'Basil', value: 'basil', children: [{ title: 'Genovese', value: 'g' }] },
          { type: 'divider' },
        ],
      },
      slots: {
        subheader: ({ props }: FrListPartScope) => h('h4', { class: 'sub' }, String(props.title)),
        header: ({ props }: FrListPartScope) => h(VListItem, { ...props, class: 'group' }),
        divider: () => h('hr', { class: 'line' }),
      },
    });

    expect(wrapper.find('.sub').text()).toBe('Herbs');
    expect(wrapper.find('.v-list-group .group .v-list-item-title').text()).toBe('Basil');
    expect(wrapper.find('hr.line').exists()).toBe(true);
    expect(wrapper.find('.v-divider').exists()).toBe(false);
  });

  it("draws Vuetify's own subheader and divider without those slots", () => {
    const wrapper = mountWithVuetify(FrList, {
      props: { items: [{ type: 'subheader', title: 'Herbs' }, { type: 'divider' }] },
    });

    expect(wrapper.find('.v-list-subheader').text()).toBe('Herbs');
    expect(wrapper.find('.v-divider').exists()).toBe(true);
  });

  it('passes VList props through', () => {
    const wrapper = mountWithVuetify(FrList, { props: { lines: 'two', nav: true } });

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-list--two-line', 'v-list--nav']));
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrList, {
      attrs: { class: 'mb-4', 'data-test': 'list' },
    });

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-list', 'fr-list', 'mb-4']));
    expect(wrapper.attributes('data-test')).toBe('list');
  });
});
