import { h } from 'vue';
import { VBreadcrumbs, VBreadcrumbsDivider } from 'vuetify/components';
import { FrBreadcrumbs } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

const crumbs = [
  { title: 'Home', href: '/' },
  { title: 'Plantings', href: '/plantings' },
  { title: 'Tomato' },
];

describe('FrBreadcrumbs', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VBreadcrumbs, marked fr-breadcrumbs', () => {
    const wrapper = mountWithVuetify(FrBreadcrumbs);

    expect(wrapper.findAllComponents(VBreadcrumbs)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-breadcrumbs', 'fr-breadcrumbs']));
  });

  it('renders the items, with a divider between each pair', () => {
    const wrapper = mountWithVuetify(FrBreadcrumbs, { props: { items: crumbs } });

    expect(wrapper.findAll('.v-breadcrumbs-item').map((item) => item.text())).toEqual([
      'Home',
      'Plantings',
      'Tomato',
    ]);
    expect(wrapper.findAllComponents(VBreadcrumbsDivider)).toHaveLength(2);
  });

  it('divides with a chevron by default', () => {
    const wrapper = mountWithVuetify(FrBreadcrumbs, { props: { items: crumbs } });
    const dividers = wrapper.findAll('.v-breadcrumbs-divider');

    expect(dividers.every((divider) => divider.find('.mdi-chevron-right').exists())).toBe(true);
    expect(wrapper.text()).not.toContain('/');
  });

  it('divides with the divider prop as text when given', () => {
    const wrapper = mountWithVuetify(FrBreadcrumbs, { props: { items: crumbs, divider: '>' } });
    const dividers = wrapper.findAll('.v-breadcrumbs-divider');

    expect(dividers.map((divider) => divider.text())).toEqual(['>', '>']);
    expect(wrapper.find('.v-breadcrumbs-divider .v-icon').exists()).toBe(false);
  });

  it('divides with the divider slot, given the item before it and its index', () => {
    const wrapper = mountWithVuetify(FrBreadcrumbs, {
      props: { items: crumbs, divider: '>' },
      slots: {
        // Mounted directly, the generic item type isn't inferred, so the slot sees unknown
        divider: ({ item, index }: { item: unknown; index: number }) =>
          h('span', { class: 'after' }, `${index}:${(item as (typeof crumbs)[number]).title}`),
      },
    });

    expect(wrapper.findAll('.v-breadcrumbs-divider .after').map((d) => d.text())).toEqual([
      '0:Home',
      '1:Plantings',
    ]);
  });

  it('passes VBreadcrumbs props through', () => {
    const wrapper = mountWithVuetify(FrBreadcrumbs, {
      props: { items: crumbs, density: 'compact', icon: 'mdi-sprout', color: 'primary' },
    });

    expect(wrapper.classes()).toContain('v-breadcrumbs--density-compact');
    expect(wrapper.find('.v-breadcrumbs__prepend .mdi-sprout').exists()).toBe(true);
    expect(wrapper.find('.v-breadcrumbs-item').classes()).toContain('text-primary');
    expect(wrapper.findAll('.v-breadcrumbs-item').at(-1)?.classes()).toContain(
      'v-breadcrumbs-item--disabled',
    );
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrBreadcrumbs, {
      attrs: { class: 'plot-crumbs', 'data-test': 'crumbs', id: 'plot' },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['v-breadcrumbs', 'fr-breadcrumbs', 'plot-crumbs']),
    );
    expect(wrapper.attributes()).toMatchObject({ 'data-test': 'crumbs', id: 'plot' });
  });
});
