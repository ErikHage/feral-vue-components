import { flushPromises } from '@vue/test-utils';
import { h } from 'vue';
import { VForm, VTextField } from 'vuetify/components';
import { FrForm, type FrFormSlotScope } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

const required = (value: string) => !!value || 'Required';

/** A form holding one field that must be filled in, empty unless `value` is given */
function mountForm(value?: string, options: Parameters<typeof mountWithVuetify>[1] = {}) {
  return mountWithVuetify(FrForm, {
    ...options,
    slots: {
      default: () =>
        h(VTextField, {
          label: 'Plant',
          rules: [required],
          ...(value === undefined ? {} : { modelValue: value }),
        }),
    },
  } as never);
}

type FrFormExposed = {
  validate: () => Promise<{ valid: boolean; errors: unknown[] }>;
  reset: () => void;
  resetValidation: () => void;
};

describe('FrForm', () => {
  let warn: ReturnType<typeof vi.spyOn>;
  let nativeSubmit: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
    nativeSubmit = vi.spyOn(HTMLFormElement.prototype, 'submit').mockImplementation(() => {});
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    expect(nativeSubmit).not.toHaveBeenCalled();
    warn.mockRestore();
    nativeSubmit.mockRestore();
  });

  it('renders exactly one VForm, marked fr-form', () => {
    const wrapper = mountWithVuetify(FrForm);

    expect(wrapper.findAllComponents(VForm)).toHaveLength(1);
    expect(wrapper.element.tagName).toBe('FORM');
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-form', 'fr-form']));
  });

  it('renders the default slot, given the form state and its functions', () => {
    const wrapper = mountWithVuetify(FrForm, {
      slots: {
        default: ({ isValid, errors, validate, reset, resetValidation }: FrFormSlotScope) =>
          h(
            'span',
            { class: 'state' },
            [
              String(isValid),
              errors.length,
              typeof validate,
              typeof reset,
              typeof resetValidation,
            ].join(' '),
          ),
      },
    });

    expect(wrapper.find('.state').text()).toBe('null 0 function function function');
  });

  it('emits submit with a failing result when a field fails, without submitting the page', async () => {
    const wrapper = mountForm();

    await wrapper.find('form').trigger('submit');
    await flushPromises();

    const [[result]] = wrapper.emitted('submit') as [[{ valid: boolean; errors: unknown[] }]];
    expect(result.valid).toBe(false);
    expect(result.errors).toEqual([{ id: expect.anything(), errorMessages: ['Required'] }]);
    expect(wrapper.find('.v-messages').text()).toBe('Required');
  });

  it('emits submit with a passing result when every field passes, without submitting the page', async () => {
    const wrapper = mountForm('Tomato');

    await wrapper.find('form').trigger('submit');
    await flushPromises();

    expect(wrapper.emitted('submit')).toEqual([[{ valid: true, errors: [] }]]);
  });

  it("reports the form's validity through v-model", async () => {
    const wrapper = mountForm();

    await (wrapper.vm as unknown as FrFormExposed).validate();
    await flushPromises();

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([false]);
  });

  it('passes a v-model value on to VForm', () => {
    const wrapper = mountWithVuetify(FrForm, { props: { modelValue: true } });

    expect(wrapper.findComponent(VForm).props('modelValue')).toBe(true);
  });

  it('tracks its validity without a v-model, for the default slot', async () => {
    const wrapper = mountWithVuetify(FrForm, {
      slots: {
        default: ({ isValid }: FrFormSlotScope) => [
          h(VTextField, { rules: [required] }),
          h('span', { class: 'state' }, String(isValid)),
        ],
      },
    });

    await (wrapper.vm as unknown as FrFormExposed).validate();
    await flushPromises();

    expect(wrapper.find('.state').text()).toBe('false');
  });

  it('exposes validate, which checks the fields and shows their errors', async () => {
    const wrapper = mountForm();

    const result = await (wrapper.vm as unknown as FrFormExposed).validate();
    await flushPromises();

    expect(result.valid).toBe(false);
    expect(wrapper.find('.v-messages').text()).toBe('Required');
  });

  it("exposes resetValidation, which clears the fields' errors", async () => {
    const wrapper = mountForm();
    const form = wrapper.vm as unknown as FrFormExposed;
    await form.validate();
    await flushPromises();

    form.resetValidation();
    await flushPromises();

    expect(wrapper.find('.v-messages').text()).toBe('');
  });

  it("exposes reset, which clears the fields' values", async () => {
    const wrapper = mountForm();
    const input = wrapper.find('input');
    await input.setValue('Tomato');

    (wrapper.vm as unknown as FrFormExposed).reset();
    await flushPromises();

    expect(input.element.value).toBe('');
  });

  it('passes VForm props through', () => {
    const wrapper = mountForm('Tomato', { props: { disabled: true, validateOn: 'submit' } });

    expect(wrapper.findComponent(VForm).props()).toMatchObject({
      disabled: true,
      validateOn: 'submit',
    });
    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrForm, {
      attrs: { class: 'plot-form', 'data-test': 'form' },
    });

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-form', 'fr-form', 'plot-form']));
    expect(wrapper.attributes('data-test')).toBe('form');
  });
});
