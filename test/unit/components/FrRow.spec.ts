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

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['align-center', 'justify-space-between']),
    );
  });

  it.each([
    ['align', 'start', 'align-start'],
    ['align', 'end', 'align-end'],
    ['align', 'center', 'align-center'],
    ['align', 'baseline', 'align-baseline'],
    ['align', 'stretch', 'align-stretch'],
    ['justify', 'start', 'justify-start'],
    ['justify', 'end', 'justify-end'],
    ['justify', 'center', 'justify-center'],
    ['justify', 'space-between', 'justify-space-between'],
    ['justify', 'space-around', 'justify-space-around'],
    ['justify', 'space-evenly', 'justify-space-evenly'],
    ['alignContent', 'start', 'align-content-start'],
    ['alignContent', 'end', 'align-content-end'],
    ['alignContent', 'center', 'align-content-center'],
    ['alignContent', 'space-between', 'align-content-space-between'],
    ['alignContent', 'space-around', 'align-content-space-around'],
    ['alignContent', 'space-evenly', 'align-content-space-evenly'],
    ['alignContent', 'stretch', 'align-content-stretch'],
  ])('renders %s %s as the %s class', (prop, value, className) => {
    const wrapper = mountWithVuetify(FrRow, { props: { [prop]: value } });

    expect(wrapper.classes()).toContain(className);
  });

  it.each(['Sm', 'Md', 'Lg', 'Xl', 'Xxl'])('renders the %s breakpoint classes', (breakpoint) => {
    const infix = breakpoint.toLowerCase();
    const wrapper = mountWithVuetify(FrRow, {
      props: {
        [`align${breakpoint}`]: 'baseline',
        [`justify${breakpoint}`]: 'space-evenly',
        [`alignContent${breakpoint}`]: 'stretch',
      },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([
        `align-${infix}-baseline`,
        `justify-${infix}-space-evenly`,
        `align-content-${infix}-stretch`,
      ]),
    );
  });

  it('gives VRow none of its deprecated alignment props', () => {
    const names = ['align', 'justify', 'alignContent'].flatMap((prop) =>
      ['', 'Sm', 'Md', 'Lg', 'Xl', 'Xxl'].map((breakpoint) => prop + breakpoint),
    );
    const wrapper = mountWithVuetify(FrRow, {
      props: Object.fromEntries(names.map((name) => [name, 'center'])),
    });
    const rowProps: Record<string, unknown> = wrapper.findComponent(VRow).props();

    expect(names).toHaveLength(18);
    for (const name of names) expect(rowProps[name], name).toBeNull();
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['align-center', 'justify-xxl-center', 'align-content-md-center']),
    );
  });

  it('renders no alignment class without the props', () => {
    const wrapper = mountWithVuetify(FrRow);

    expect(wrapper.classes().filter((name) => /^(align|justify)-/.test(name))).toEqual([]);
  });

  it('warns about a value Vuetify has no class for, as VRow did', () => {
    // @ts-expect-error not one of the justify values, on purpose
    mountWithVuetify(FrRow, { props: { justify: 'sideways' } });

    const [message] = warn.mock.calls.map((call: unknown[]) => String(call[0]));
    warn.mockClear();

    expect(message).toContain('custom validator check failed for prop "justify"');
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
