import { VBtn } from 'vuetify/components';
import { FrIconBtn, frIconBtnDefaults } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

const edit = { icon: 'mdi-pencil', label: 'Edit Tomato' };

describe('FrIconBtn', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VBtn, marked fr-icon-btn, showing the icon', () => {
    const wrapper = mountWithVuetify(FrIconBtn, { props: edit });

    expect(wrapper.findAllComponents(VBtn)).toHaveLength(1);
    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['v-btn', 'v-btn--icon', 'fr-icon-btn']),
    );
    expect(wrapper.find('.v-icon').classes()).toContain('mdi-pencil');
  });

  it('is named by its label, for screen readers', () => {
    const wrapper = mountWithVuetify(FrIconBtn, { props: edit });

    expect(wrapper.attributes('aria-label')).toBe('Edit Tomato');
    expect(wrapper.text()).toBe('');
  });

  it('applies the feral defaults: small, text, neutral', () => {
    const btn = mountWithVuetify(FrIconBtn, { props: edit }).findComponent(VBtn);

    expect(btn.props()).toMatchObject({ variant: 'text', size: 'small' });
    expect(btn.props('color')).toBeUndefined();
    expect(frIconBtnDefaults).toEqual({ variant: 'text', size: 'small' });
  });

  it.each([
    ['variant', 'tonal'],
    ['size', 'default'],
    ['color', 'error'],
  ] as const)('lets the caller override %s', (prop, value) => {
    const btn = mountWithVuetify(FrIconBtn, {
      props: edit,
      attrs: { [prop]: value },
    }).findComponent(VBtn);

    expect(btn.props(prop)).toBe(value);
  });

  it('emits click to the caller, and not when disabled', async () => {
    const onClick = vi.fn();
    const wrapper = mountWithVuetify(FrIconBtn, { props: edit, attrs: { onClick } });

    await wrapper.trigger('click');
    expect(onClick).toHaveBeenCalledTimes(1);

    await wrapper.setProps({ disabled: true } as never);
    await wrapper.trigger('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrIconBtn, {
      props: edit,
      attrs: { class: 'edit', 'data-test': 'edit' },
    });

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['fr-icon-btn', 'edit']));
    expect(wrapper.attributes('data-test')).toBe('edit');
  });
});
