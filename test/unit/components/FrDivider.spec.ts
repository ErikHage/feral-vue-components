import { h } from 'vue';
import { VDivider } from 'vuetify/components';
import { FrDivider } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

describe('FrDivider', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VDivider, marked fr-divider', () => {
    const wrapper = mountWithVuetify(FrDivider);

    expect(wrapper.findAllComponents(VDivider)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-divider', 'fr-divider']));
  });

  it('is a plain line without a slot', () => {
    const wrapper = mountWithVuetify(FrDivider);

    expect(wrapper.element.tagName).toBe('HR');
    expect(wrapper.find('.v-divider__content').exists()).toBe(false);
  });

  it('sets the default slot in the middle of the line', () => {
    const wrapper = mountWithVuetify(FrDivider, {
      slots: { default: () => h('span', { class: 'or' }, 'or') },
    });

    expect(wrapper.find('.v-divider__content .or').text()).toBe('or');
    expect(wrapper.findAll('hr.fr-divider, .v-divider__wrapper hr')).toHaveLength(2);
  });

  it("sets no defaults, so it keeps Vuetify's look", () => {
    const divider = mountWithVuetify(FrDivider).findComponent(VDivider);

    expect(divider.props()).toMatchObject({ vertical: false, inset: false, variant: 'solid' });
  });

  it('passes VDivider props through', () => {
    const wrapper = mountWithVuetify(FrDivider, {
      props: { vertical: true, inset: true, thickness: 3, variant: 'dashed' },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['v-divider--vertical', 'v-divider--inset']),
    );
    expect(wrapper.findComponent(VDivider).props()).toMatchObject({
      thickness: 3,
      variant: 'dashed',
    });
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrDivider, {
      attrs: { class: 'my-4', 'data-test': 'divider' },
    });

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-divider', 'fr-divider', 'my-4']));
    expect(wrapper.attributes('data-test')).toBe('divider');
  });
});
