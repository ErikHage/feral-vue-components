import { VTextField } from 'vuetify/components';
import { FrTextField, frTextFieldDefaults } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

describe('FrTextField', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VTextField, marked fr-text-field', () => {
    const wrapper = mountWithVuetify(FrTextField);

    expect(wrapper.findAllComponents(VTextField)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-text-field', 'fr-text-field']));
  });

  it('applies the feral field defaults', () => {
    const field = mountWithVuetify(FrTextField).findComponent(VTextField);

    expect(field.props()).toMatchObject({ variant: 'solo', density: 'compact', rounded: 'lg' });
    expect(frTextFieldDefaults).toEqual({ variant: 'solo', density: 'compact', rounded: 'lg' });
  });

  it.each([
    ['variant', 'outlined'],
    ['density', 'comfortable'],
    ['rounded', 0],
  ] as const)('lets the caller override %s', (prop, value) => {
    const field = mountWithVuetify(FrTextField, { props: { [prop]: value } }).findComponent(
      VTextField,
    );

    expect(field.props(prop)).toBe(value);
  });

  it('reports what is typed through v-model', async () => {
    const onUpdate = vi.fn();
    const wrapper = mountWithVuetify(FrTextField, { attrs: { 'onUpdate:modelValue': onUpdate } });

    await wrapper.find('input').setValue('Tomato');

    expect(onUpdate).toHaveBeenLastCalledWith('Tomato');
  });

  it('passes VTextField props through', () => {
    const wrapper = mountWithVuetify(FrTextField, {
      props: { label: 'Name', modelValue: 'Basil', prependInnerIcon: 'mdi-leaf', counter: true },
    });

    expect(wrapper.find('label').text()).toBe('Name');
    expect((wrapper.find('input').element as HTMLInputElement | HTMLTextAreaElement).value).toBe(
      'Basil',
    );
    expect(wrapper.find('.v-field__prepend-inner .mdi-leaf').exists()).toBe(true);
    expect(wrapper.find('.v-counter').text()).toBe('5');
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrTextField, {
      attrs: { class: 'name-field', 'data-test': 'field' },
    });

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['fr-text-field', 'name-field']));
    expect(wrapper.attributes('data-test')).toBe('field');
  });
});
