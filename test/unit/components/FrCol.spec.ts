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
