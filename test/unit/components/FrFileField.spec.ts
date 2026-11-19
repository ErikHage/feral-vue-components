import { h } from 'vue';
import { VFileInput } from 'vuetify/components';
import { FrFileField, frFileFieldDefaults, type FrFileFieldSelectionScope } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

const seeds = new File(['tomato'], 'seeds.csv', { type: 'text/csv' });
const plan = new File(['bed 3'], 'plan.pdf', { type: 'application/pdf' });

describe('FrFileField', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VFileInput, marked fr-file-field', () => {
    const wrapper = mountWithVuetify(FrFileField);

    expect(wrapper.findAllComponents(VFileInput)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-file-input', 'fr-file-field']));
  });

  it('applies the feral field defaults', () => {
    const field = mountWithVuetify(FrFileField).findComponent(VFileInput);

    expect(field.props()).toMatchObject({ variant: 'solo', density: 'compact', rounded: 'lg' });
    expect(frFileFieldDefaults).toEqual({ variant: 'solo', density: 'compact', rounded: 'lg' });
  });

  it.each([
    ['variant', 'outlined'],
    ['density', 'comfortable'],
    ['rounded', 0],
  ] as const)('lets the caller override %s', (prop, value) => {
    const field = mountWithVuetify(FrFileField, { props: { [prop]: value } as never });

    expect(field.findComponent(VFileInput).props(prop)).toBe(value);
  });

  it("shows the chosen files' names without a selection slot", () => {
    const wrapper = mountWithVuetify(FrFileField, { props: { modelValue: [seeds, plan] } });

    expect(wrapper.find('.v-field__input').text()).toContain('seeds.csv, plan.pdf');
  });

  it('shows the selection slot in place of the names, given the names and total size', () => {
    const wrapper = mountWithVuetify(FrFileField, {
      props: { modelValue: [seeds, plan], multiple: true },
      slots: {
        selection: ({ fileNames, totalBytes }: FrFileFieldSelectionScope) =>
          h('span', { class: 'picked' }, `${fileNames.length} files, ${totalBytes} bytes`),
      },
    });

    expect(wrapper.find('.v-field__input .picked').text()).toBe('2 files, 11 bytes');
    expect(wrapper.find('.v-field__input').text()).not.toContain('seeds.csv');
  });

  it('reports a chosen file through v-model', async () => {
    const onUpdate = vi.fn();
    const wrapper = mountWithVuetify(FrFileField, { attrs: { 'onUpdate:modelValue': onUpdate } });
    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, 'files', { value: [seeds] });

    await input.trigger('change');

    expect(onUpdate).toHaveBeenLastCalledWith(seeds);
  });

  it('passes VFileInput props through', () => {
    const wrapper = mountWithVuetify(FrFileField, {
      props: { label: 'Seed list', accept: '.csv', multiple: true },
    });
    const input = wrapper.find('input[type="file"]');

    expect(wrapper.find('label').text()).toBe('Seed list');
    expect(input.attributes('accept')).toBe('.csv');
    expect(input.attributes('multiple')).toBeDefined();
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrFileField, {
      attrs: { class: 'plot-file', 'data-test': 'file' },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['v-file-input', 'fr-file-field', 'plot-file']),
    );
    expect(wrapper.attributes('data-test')).toBe('file');
  });
});
