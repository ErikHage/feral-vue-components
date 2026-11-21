import { defineComponent, h } from 'vue';
import { VCol, VRow } from 'vuetify/components';
import { FrCol } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

describe('FrCol', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VCol, marked fr-col', () => {
    const wrapper = mountWithVuetify(FrCol);

    expect(wrapper.findAllComponents(VCol)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-col', 'fr-col']));
  });

  it('renders the default slot as the column content', () => {
    const wrapper = mountWithVuetify(FrCol, {
      slots: { default: () => h('p', { class: 'body' }, 'Tomatoes') },
    });

    expect(wrapper.find('.fr-col > .body').text()).toBe('Tomatoes');
  });

  it('passes the grid props through to their classes', () => {
    const wrapper = mountWithVuetify(FrCol, {
      props: { cols: 12, md: 6, lg: 4, offsetMd: 1, order: 2, alignSelf: 'center' },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([
        'v-col--cols-12',
        'v-col--cols-md-6',
        'v-col--cols-lg-4',
        'v-col--offset-md-1',
        'order-2',
        'align-self-center',
      ]),
    );
  });

  it.each([
    [2, 'order-2'],
    ['12', 'order-12'],
    [0, 'order-0'],
    ['first', 'order-first'],
    ['last', 'order-last'],
  ])('renders order %s as the %s class, with no stray order-- class', (order, className) => {
    const wrapper = mountWithVuetify(FrCol, { props: { order } });

    expect(wrapper.classes()).toContain(className);
    expect(wrapper.classes().filter((name) => name.startsWith('order--'))).toEqual([]);
  });

  it.each(['Sm', 'Md', 'Lg', 'Xl', 'Xxl'])('renders the %s order class', (breakpoint) => {
    const wrapper = mountWithVuetify(FrCol, { props: { [`order${breakpoint}`]: 'last' } });

    expect(wrapper.classes()).toContain(`order-${breakpoint.toLowerCase()}-last`);
  });

  it.each(['auto', 'start', 'end', 'center', 'baseline', 'stretch'] as const)(
    'renders align-self %s as its class',
    (alignSelf) => {
      const wrapper = mountWithVuetify(FrCol, { props: { alignSelf } });

      expect(wrapper.classes()).toContain(`align-self-${alignSelf}`);
    },
  );

  it('gives VCol none of its deprecated order or align-self props', () => {
    const names = ['order', 'orderSm', 'orderMd', 'orderLg', 'orderXl', 'orderXxl'];
    const wrapper = mountWithVuetify(FrCol, {
      props: { ...Object.fromEntries(names.map((name) => [name, 1])), alignSelf: 'end' },
    });
    const colProps: Record<string, unknown> = wrapper.findComponent(VCol).props();

    for (const name of [...names, 'alignSelf']) expect(colProps[name], name).toBeNull();
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['order-1', 'order-xxl-1', 'align-self-end']),
    );
  });

  it('renders no order or align-self class without the props, or for an empty order', () => {
    const bare = mountWithVuetify(FrCol);
    const empty = mountWithVuetify(FrCol, { props: { order: '' } });

    for (const wrapper of [bare, empty]) {
      expect(wrapper.classes().filter((name) => /^(order|align-self)-/.test(name))).toEqual([]);
    }
  });

  it('warns about an align-self Vuetify has no class for, as VCol did', () => {
    // @ts-expect-error not one of the align-self values, on purpose
    mountWithVuetify(FrCol, { props: { alignSelf: 'sideways' } });

    const [message] = warn.mock.calls.map((call: unknown[]) => String(call[0]));
    warn.mockClear();

    expect(message).toContain('custom validator check failed for prop "alignSelf"');
  });

  it('renders as another tag', () => {
    const wrapper = mountWithVuetify(FrCol, { props: { tag: 'section' } });

    expect(wrapper.element.tagName).toBe('SECTION');
  });

  it('sits in a VRow beside VCols', () => {
    const Host = defineComponent({
      render: () =>
        h(VRow, () => [h(FrCol, { cols: 6 }, () => 'A'), h(VCol, { cols: 6 }, () => 'B')]),
    });
    const wrapper = mountWithVuetify(Host);

    expect(wrapper.findAll('.v-row > .v-col').map((col) => col.text())).toEqual(['A', 'B']);
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrCol, {
      attrs: { class: 'plot-col', 'data-test': 'col', id: 'plot' },
    });

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-col', 'fr-col', 'plot-col']));
    expect(wrapper.attributes()).toMatchObject({ 'data-test': 'col', id: 'plot' });
  });
});
