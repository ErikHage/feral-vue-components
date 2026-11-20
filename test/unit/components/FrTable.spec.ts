import { h } from 'vue';
import { VTable } from 'vuetify/components';
import { FrTable, frTableDefaults } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

const rows = () =>
  h('tbody', [
    h('tr', [h('td', 'Tomato'), h('td', '12')]),
    h('tr', [h('td', 'Basil'), h('td', '3')]),
  ]);

describe('FrTable', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VTable, marked fr-table', () => {
    const wrapper = mountWithVuetify(FrTable, { slots: { default: rows } });

    expect(wrapper.findAllComponents(VTable)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-table', 'fr-table']));
  });

  it('is compact by default, and the caller can override it', () => {
    const plain = mountWithVuetify(FrTable, { slots: { default: rows } });
    const comfortable = mountWithVuetify(FrTable, {
      props: { density: 'comfortable' },
      slots: { default: rows },
    });

    expect(plain.classes()).toContain('v-table--density-compact');
    expect(comfortable.classes()).toContain('v-table--density-comfortable');
    expect(frTableDefaults).toEqual({ density: 'compact' });
  });

  it('puts the default slot inside its <table>', () => {
    const wrapper = mountWithVuetify(FrTable, { slots: { default: rows } });

    expect(wrapper.findAll('.v-table__wrapper > table > tbody > tr').map((r) => r.text())).toEqual([
      'Tomato12',
      'Basil3',
    ]);
  });

  it('puts the caption first in the table, and top and bottom around it', () => {
    const wrapper = mountWithVuetify(FrTable, {
      slots: {
        default: rows,
        caption: () => h('caption', 'Harvest'),
        top: () => h('h3', { class: 'heading' }, 'This week'),
        bottom: () => h('p', { class: 'total' }, '15 in all'),
      },
    });

    expect(wrapper.find('table').element.firstElementChild?.outerHTML).toBe(
      '<caption>Harvest</caption>',
    );
    expect(wrapper.element.firstElementChild?.className).toBe('heading');
    expect(wrapper.element.lastElementChild?.className).toBe('total');
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['v-table--has-top', 'v-table--has-bottom']),
    );
  });

  it('is not marked as having a top or bottom without those slots', () => {
    const wrapper = mountWithVuetify(FrTable, { slots: { default: rows } });

    expect(wrapper.classes()).not.toContain('v-table--has-top');
    expect(wrapper.classes()).not.toContain('v-table--has-bottom');
  });

  it('builds no <table> without a default slot', () => {
    const wrapper = mountWithVuetify(FrTable, { slots: { top: () => h('p', 'No rows yet') } });

    expect(wrapper.find('table').exists()).toBe(false);
    expect(wrapper.text()).toBe('No rows yet');
  });

  it('passes VTable props through', () => {
    const wrapper = mountWithVuetify(FrTable, {
      props: { hover: true, striped: 'even', height: 300, fixedHeader: true, gridlines: 'all' },
      slots: { default: rows },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([
        'v-table--hover',
        'v-table--striped-even',
        'v-table--fixed-header',
        'v-table--gridlines-all',
      ]),
    );
    expect(wrapper.find('.v-table__wrapper').attributes('style')).toContain('height: 300px');
  });

  it('labels its <table> with aria-label, and passes other attributes and classes to the root', () => {
    const wrapper = mountWithVuetify(FrTable, {
      attrs: { class: 'mb-4', 'data-test': 'harvest', 'aria-label': 'Harvest' },
      slots: { default: rows },
    });

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-table', 'fr-table', 'mb-4']));
    expect(wrapper.attributes('data-test')).toBe('harvest');
    expect(wrapper.find('table').attributes('aria-label')).toBe('Harvest');
  });
});
