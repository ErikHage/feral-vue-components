import { h } from 'vue';
import { VSheet } from 'vuetify/components';
import { FrSheet, frSheetDefaults } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

describe('FrSheet', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VSheet, marked fr-sheet', () => {
    const wrapper = mountWithVuetify(FrSheet);

    expect(wrapper.findAllComponents(VSheet)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-sheet', 'fr-sheet']));
  });

  it('is rounded lg by default, and the caller can override it', () => {
    const plain = mountWithVuetify(FrSheet);
    const square = mountWithVuetify(FrSheet, { props: { rounded: 0 } });

    expect(plain.classes()).toContain('rounded-lg');
    expect(square.classes()).toContain('rounded-0');
    expect(square.classes()).not.toContain('rounded-lg');
    expect(frSheetDefaults).toEqual({ rounded: 'lg' });
  });

  it.each([
    [undefined, ['pa-4'], ['pa-2']],
    ['default', ['pa-4'], ['pa-2']],
    ['small', ['pa-2'], ['pa-4']],
    ['none', [], ['pa-2', 'pa-4']],
  ] as const)('with padding %s, has %j and not %j', (padding, has, hasNot) => {
    const wrapper = mountWithVuetify(FrSheet, { props: { padding } });

    expect(wrapper.classes()).toEqual(expect.arrayContaining([...has]));
    for (const name of hasNot) expect(wrapper.classes()).not.toContain(name);
  });

  it('keeps padding to itself, not passing it on to VSheet', () => {
    const wrapper = mountWithVuetify(FrSheet, { props: { padding: 'small' } });

    expect(wrapper.attributes('padding')).toBeUndefined();
  });

  it('holds the default slot, and nothing without one', () => {
    const filled = mountWithVuetify(FrSheet, {
      slots: { default: () => h('p', { class: 'body' }, 'Plants') },
    });
    const empty = mountWithVuetify(FrSheet);

    expect(filled.find('.fr-sheet > .body').text()).toBe('Plants');
    expect(empty.element.childNodes).toHaveLength(0);
  });

  it('passes VSheet props through', () => {
    const wrapper = mountWithVuetify(FrSheet, {
      props: {
        elevation: 2,
        color: 'surface-variant',
        height: '30vh',
        border: true,
        tag: 'section',
      },
    });

    expect(wrapper.element.tagName).toBe('SECTION');
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['elevation-2', 'bg-surface-variant', 'v-sheet--border']),
    );
    expect(wrapper.attributes('style')).toContain('height: 30vh');
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrSheet, {
      attrs: { class: 'mb-4', 'data-test': 'plants' },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['v-sheet', 'fr-sheet', 'pa-4', 'mb-4']),
    );
    expect(wrapper.attributes('data-test')).toBe('plants');
  });
});
