import { h } from 'vue';
import { VListItem } from 'vuetify/components';
import { FrList, FrListItem } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

describe('FrListItem', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VListItem, marked fr-list-item', () => {
    const wrapper = mountWithVuetify(FrListItem, { props: { title: 'Basil' } });

    expect(wrapper.findAllComponents(VListItem)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-list-item', 'fr-list-item']));
  });

  it('shows its title and subtitle props without slots', () => {
    const wrapper = mountWithVuetify(FrListItem, {
      props: { title: 'Recurrence', subtitle: 'Every 3 days' },
    });

    expect(wrapper.find('.v-list-item-title').text()).toBe('Recurrence');
    expect(wrapper.find('.v-list-item-subtitle').text()).toBe('Every 3 days');
  });

  it('draws no empty areas for slots it was not given', () => {
    const wrapper = mountWithVuetify(FrListItem, { props: { title: 'Basil' } });

    expect(wrapper.find('.v-list-item__prepend').exists()).toBe(false);
    expect(wrapper.find('.v-list-item__append').exists()).toBe(false);
    expect(wrapper.find('.v-list-item-subtitle').exists()).toBe(false);
  });

  it('shows the title and subtitle slots in place of the props, given their values', () => {
    const wrapper = mountWithVuetify(FrListItem, {
      props: { title: 'Basil', subtitle: 'Herb' },
      slots: {
        title: ({ title }: { title?: unknown }) => h('s', { class: 'mine' }, String(title)),
        subtitle: ({ subtitle }: { subtitle?: unknown }) => h('em', `${subtitle} (removed)`),
      },
    });

    expect(wrapper.find('.v-list-item-title s.mine').text()).toBe('Basil');
    expect(wrapper.find('.v-list-item-subtitle em').text()).toBe('Herb (removed)');
  });

  it('puts the prepend and append slots either side, and the default slot under the title', () => {
    const wrapper = mountWithVuetify(FrListItem, {
      props: { title: 'Planted' },
      slots: {
        prepend: () => h('i', { class: 'dot' }),
        default: () => h('p', { class: 'body' }, '3 beds'),
        append: () => h('span', { class: 'count' }, '12'),
      },
    });

    expect(wrapper.find('.v-list-item__prepend .dot').exists()).toBe(true);
    expect(wrapper.find('.v-list-item__content .body').text()).toBe('3 beds');
    expect(wrapper.find('.v-list-item__append .count').text()).toBe('12');
  });

  it("gives the slots Vuetify's row state", () => {
    const wrapper = mountWithVuetify(FrListItem, {
      props: { title: 'Garden', active: true },
      slots: {
        append: ({ isActive, isSelected }: { isActive: boolean; isSelected: boolean }) =>
          h('span', { class: 'state' }, `${isActive} ${isSelected}`),
      },
    });

    expect(wrapper.find('.state').text()).toBe('true false');
  });

  it("sets no defaults, so it keeps Vuetify's look", () => {
    const item = mountWithVuetify(FrListItem, { props: { title: 'Basil' } }).findComponent(
      VListItem,
    );

    expect(item.props()).toMatchObject({ variant: 'text', rounded: undefined, density: 'default' });
  });

  it('passes VListItem props through', () => {
    const wrapper = mountWithVuetify(FrListItem, {
      props: { title: 'Basil', prependIcon: 'mdi-leaf', rounded: 'lg', disabled: true },
    });

    expect(wrapper.find('.v-list-item__prepend .mdi-leaf').exists()).toBe(true);
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['rounded-lg', 'v-list-item--disabled']),
    );
  });

  it('reports a click, as a clickable row', async () => {
    const onClick = vi.fn();
    const wrapper = mountWithVuetify(FrListItem, { props: { title: 'Basil' }, attrs: { onClick } });

    await wrapper.trigger('click');

    expect(onClick).toHaveBeenCalledOnce();
    expect(wrapper.classes()).toContain('v-list-item--link');
  });

  it("takes an FrList's density, as a written row", () => {
    const wrapper = mountWithVuetify(FrList, {
      slots: { default: () => [h(FrListItem, { title: 'Basil' })] },
    });

    expect(wrapper.find('.fr-list-item').classes()).toContain('v-list-item--density-compact');
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrListItem, {
      props: { title: 'Basil' },
      attrs: { class: 'mb-1', 'data-test': 'row' },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['v-list-item', 'fr-list-item', 'mb-1']),
    );
    expect(wrapper.attributes('data-test')).toBe('row');
  });
});
