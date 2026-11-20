import { h } from 'vue';
import { VListSubheader } from 'vuetify/components';
import { FrList, FrListHeader, type FrListPartScope } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

describe('FrListHeader', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VListSubheader, marked fr-list-header', () => {
    const wrapper = mountWithVuetify(FrListHeader, { props: { title: 'Herbs' } });

    expect(wrapper.findAllComponents(VListSubheader)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['v-list-subheader', 'fr-list-header']),
    );
  });

  it('shows its default slot as the text', () => {
    const wrapper = mountWithVuetify(FrListHeader, { slots: { default: 'Herbs' } });

    expect(wrapper.find('.v-list-subheader__text').text()).toBe('Herbs');
  });

  it('shows its title without a slot', () => {
    const wrapper = mountWithVuetify(FrListHeader, { props: { title: 'Fruit' } });

    expect(wrapper.find('.v-list-subheader__text').text()).toBe('Fruit');
  });

  it('shows the slot over the title when given both', () => {
    const wrapper = mountWithVuetify(FrListHeader, {
      props: { title: 'Fruit' },
      slots: { default: () => h('em', 'Herbs') },
    });

    expect(wrapper.find('.v-list-subheader__text').text()).toBe('Herbs');
  });

  it("sets no defaults, so it keeps Vuetify's look", () => {
    const wrapper = mountWithVuetify(FrListHeader, { props: { title: 'Herbs' } });

    expect(wrapper.findComponent(VListSubheader).props()).toMatchObject({
      color: undefined,
      inset: false,
      sticky: false,
      tag: 'div',
    });
  });

  it('passes VListSubheader props through', () => {
    const wrapper = mountWithVuetify(FrListHeader, {
      props: { title: 'Herbs', color: 'primary', inset: true, sticky: true },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([
        'text-primary',
        'v-list-subheader--inset',
        'v-list-subheader--sticky',
      ]),
    );
  });

  it("renders an FrList's subheader items when bound to the subheader slot's props", () => {
    const wrapper = mountWithVuetify(FrList, {
      props: { items: [{ type: 'subheader', title: 'Herbs' }] },
      slots: {
        subheader: ({ props }: FrListPartScope) => h(FrListHeader, { ...props, color: 'primary' }),
      },
    });

    expect(wrapper.find('.fr-list .fr-list-header.text-primary').text()).toBe('Herbs');
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrListHeader, {
      props: { title: 'Herbs' },
      attrs: { class: 'mt-2', 'data-test': 'header' },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['v-list-subheader', 'fr-list-header', 'mt-2']),
    );
    expect(wrapper.attributes('data-test')).toBe('header');
  });
});
