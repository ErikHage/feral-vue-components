import { h } from 'vue';
import { VRow } from 'vuetify/components';
import { FrCol, FrRow } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

describe('FrRow', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VRow', () => {
    const wrapper = mountWithVuetify(FrRow);

    expect(wrapper.findAllComponents(VRow)).toHaveLength(1);
    expect(wrapper.classes()).toContain('v-row');
  });

  it('holds its columns in the default slot', () => {
    const wrapper = mountWithVuetify(FrRow, {
      slots: { default: () => [h(FrCol, () => 'A'), h(FrCol, () => 'B')] },
    });

    expect(wrapper.findAll('.v-row > .fr-col').map((col) => col.text())).toEqual(['A', 'B']);
  });

  it('keeps the gutters and marks fr-row by default', () => {
    const wrapper = mountWithVuetify(FrRow);

    expect(wrapper.findComponent(VRow).props('noGutters')).toBe(false);
    expect(wrapper.classes()).toContain('fr-row');
    expect(wrapper.classes()).not.toContain('v-row--no-gutters');
  });

  it("removes the gutters and the fr-row class with spacing 'none'", () => {
    const wrapper = mountWithVuetify(FrRow, { props: { spacing: 'none' } });

    expect(wrapper.findComponent(VRow).props('noGutters')).toBe(true);
    expect(wrapper.classes()).toContain('v-row--no-gutters');
    expect(wrapper.classes()).not.toContain('fr-row');
  });

  it('passes align and justify forward', () => {
    const wrapper = mountWithVuetify(FrRow, {
      props: { align: 'center', justify: 'space-between' },
    });

    expect(wrapper.findComponent(VRow).props()).toMatchObject({
      align: 'center',
      justify: 'space-between',
    });
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['align-center', 'justify-space-between']),
    );
  });

  it('passes other VRow props through', () => {
    const wrapper = mountWithVuetify(FrRow, { props: { density: 'compact', tag: 'section' } });

    expect(wrapper.element.tagName).toBe('SECTION');
    expect(wrapper.classes()).toContain('v-row--density-compact');
  });

  it("keeps the caller's classes beside fr-row", () => {
    const wrapper = mountWithVuetify(FrRow, { attrs: { class: 'plot-row', 'data-test': 'row' } });

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-row', 'fr-row', 'plot-row']));
    expect(wrapper.attributes('data-test')).toBe('row');
  });
});
