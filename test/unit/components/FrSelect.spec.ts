import { h } from 'vue';
import { VSelect } from 'vuetify/components';
import { FrSelect, frSelectDefaults } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

const plants = [
  { plantId: 1, friendlyName: 'Tomato' },
  { plantId: 2, friendlyName: 'Basil' },
];
const plantProps = { items: plants, itemTitle: 'friendlyName', itemValue: 'plantId' };

/** The list opens in an overlay Vuetify moves to document.body, so open it and read it there */
function mountOpen(
  props: Record<string, unknown> = {},
  slots: Record<string, unknown> = {},
  attrs: Record<string, unknown> = {},
) {
  return mountWithVuetify(FrSelect, {
    props: { ...plantProps, menu: true, ...props },
    slots: slots as never,
    attrs,
    attachTo: document.body,
  });
}

const rows = () => [...document.querySelectorAll('.v-overlay-container .v-list-item')];

describe('FrSelect', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
    document.body.innerHTML = '';
  });

  it('renders exactly one VSelect, marked fr-select', () => {
    const wrapper = mountWithVuetify(FrSelect);

    expect(wrapper.findAllComponents(VSelect)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-select', 'fr-select']));
  });

  it('applies the feral defaults', () => {
    const field = mountWithVuetify(FrSelect).findComponent(VSelect);

    expect(field.props()).toMatchObject({ variant: 'solo', density: 'compact', rounded: 'lg' });
    expect(frSelectDefaults).toEqual({ variant: 'solo', density: 'compact', rounded: 'lg' });
  });

  it.each([
    ['variant', 'outlined'],
    ['density', 'comfortable'],
    ['rounded', 0],
  ] as const)('lets the caller override %s', (prop, value) => {
    const field = mountWithVuetify(FrSelect, { props: { [prop]: value } }).findComponent(VSelect);

    expect(field.props(prop)).toBe(value);
  });

  it("lists the items by Vuetify's own rows without an item slot", async () => {
    const wrapper = mountOpen();
    await wrapper.vm.$nextTick();

    expect(rows().map((row) => row.textContent)).toEqual(['Tomato', 'Basil']);
  });

  it("puts the item slot's content in a row of its own, with the caller's item", async () => {
    const wrapper = mountOpen(
      {},
      {
        item: ({ item, index }: { item: (typeof plants)[number]; index: number }) =>
          h('b', { class: 'plant' }, `${index}. ${item.friendlyName} #${item.plantId}`),
      },
    );
    await wrapper.vm.$nextTick();

    expect(rows()).toHaveLength(2);
    expect(
      rows().map((row) => row.querySelector('.v-list-item-title .plant')?.textContent),
    ).toEqual(['0. Tomato #1', '1. Basil #2']);
    expect(rows()[0]?.getAttribute('role')).toBe('option');
  });

  it('selects the item when its custom row is clicked', async () => {
    const onUpdate = vi.fn();
    const wrapper = mountOpen(
      {},
      { item: ({ item }: { item: (typeof plants)[number] }) => item.friendlyName },
      { 'onUpdate:modelValue': onUpdate },
    );
    await wrapper.vm.$nextTick();

    (rows()[1] as HTMLElement).click();
    await wrapper.vm.$nextTick();

    expect(onUpdate).toHaveBeenLastCalledWith(2);
  });

  it('shows the no-data slot when there are no items', async () => {
    const wrapper = mountOpen(
      { items: [] },
      { 'no-data': () => h('span', { class: 'empty' }, 'No plants yet') },
    );
    await wrapper.vm.$nextTick();

    expect(rows()).toHaveLength(1);
    expect(rows()[0]?.querySelector('.v-list-item-title .empty')?.textContent).toBe(
      'No plants yet',
    );
  });

  it("keeps Vuetify's no-data text without the no-data slot", async () => {
    const wrapper = mountOpen({ items: [], noDataText: 'Nothing here' });
    await wrapper.vm.$nextTick();

    expect(rows().map((row) => row.textContent)).toEqual(['Nothing here']);
  });

  it('passes VSelect props through', () => {
    const wrapper = mountWithVuetify(FrSelect, {
      props: { ...plantProps, label: 'Plant', modelValue: 2, clearable: true },
    });

    expect(wrapper.find('label').text()).toBe('Plant');
    expect(wrapper.find('.v-select__selection').text()).toBe('Basil');
    expect(wrapper.find('.v-field__clearable').exists()).toBe(true);
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrSelect, {
      attrs: { class: 'plot-field', 'data-test': 'field', id: 'plot' },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['v-select', 'fr-select', 'plot-field']),
    );
    expect(wrapper.attributes('data-test')).toBe('field');
  });
});
