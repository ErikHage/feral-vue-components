import { VTextarea } from 'vuetify/components';
import { FrTextarea, frTextareaDefaults } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

describe('FrTextarea', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VTextarea, marked fr-textarea', () => {
    const wrapper = mountWithVuetify(FrTextarea);

    expect(wrapper.findAllComponents(VTextarea)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-textarea', 'fr-textarea']));
  });

  it('applies the feral field defaults', () => {
    const field = mountWithVuetify(FrTextarea).findComponent(VTextarea);

    expect(field.props()).toMatchObject({ variant: 'solo', density: 'compact', rounded: 'lg' });
    expect(frTextareaDefaults).toEqual({ variant: 'solo', density: 'compact', rounded: 'lg' });
  });

  it.each([
    ['variant', 'outlined'],
    ['density', 'comfortable'],
    ['rounded', 0],
  ] as const)('lets the caller override %s', (prop, value) => {
    const field = mountWithVuetify(FrTextarea, { props: { [prop]: value } }).findComponent(
      VTextarea,
    );

    expect(field.props(prop)).toBe(value);
  });

  it('reports what is typed through v-model', async () => {
    const onUpdate = vi.fn();
    const wrapper = mountWithVuetify(FrTextarea, { attrs: { 'onUpdate:modelValue': onUpdate } });

    await wrapper.find('textarea').setValue('Tomato');

    expect(onUpdate).toHaveBeenLastCalledWith('Tomato');
  });

  it('passes VTextarea props through', () => {
    const wrapper = mountWithVuetify(FrTextarea, {
      props: { label: 'Name', modelValue: 'Basil', prependInnerIcon: 'mdi-leaf', counter: true },
    });

    expect(wrapper.find('label').text()).toBe('Name');
    expect((wrapper.find('textarea').element as HTMLInputElement | HTMLTextAreaElement).value).toBe(
      'Basil',
    );
    expect(wrapper.find('.v-field__prepend-inner .mdi-leaf').exists()).toBe(true);
    expect(wrapper.find('.v-counter').text()).toBe('5');
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrTextarea, {
      attrs: { class: 'name-field', 'data-test': 'field' },
    });

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['fr-textarea', 'name-field']));
    expect(wrapper.attributes('data-test')).toBe('field');
  });
});
