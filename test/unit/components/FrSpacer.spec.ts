import { h } from 'vue';
import { VSpacer } from 'vuetify/components';
import { FrSpacer } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

describe('FrSpacer', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VSpacer, marked fr-spacer', () => {
    const wrapper = mountWithVuetify(FrSpacer);

    expect(wrapper.findAllComponents(VSpacer)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-spacer', 'fr-spacer']));
  });

  it('is an empty div by default', () => {
    const wrapper = mountWithVuetify(FrSpacer);

    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.element.childNodes).toHaveLength(0);
  });

  it('renders the default slot inside it, given one', () => {
    const wrapper = mountWithVuetify(FrSpacer, {
      slots: { default: () => h('span', { class: 'gap' }, 'gap') },
    });

    expect(wrapper.find('.fr-spacer .gap').text()).toBe('gap');
  });

  it('passes the tag through', () => {
    const wrapper = mountWithVuetify(FrSpacer, { props: { tag: 'span' } });

    expect(wrapper.element.tagName).toBe('SPAN');
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrSpacer, {
      attrs: { class: 'd-none d-sm-block', 'data-test': 'spacer' },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['v-spacer', 'fr-spacer', 'd-none', 'd-sm-block']),
    );
    expect(wrapper.attributes('data-test')).toBe('spacer');
  });
});
