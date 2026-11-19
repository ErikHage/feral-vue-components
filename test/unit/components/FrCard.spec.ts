import { h } from 'vue';
import { VCard, VCardItem } from 'vuetify/components';
import { FrCard, frCardDefaults } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

describe('FrCard', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VCard, marked fr-card', () => {
    const wrapper = mountWithVuetify(FrCard);

    expect(wrapper.findAllComponents(VCard)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-card', 'fr-card']));
  });

  it('applies the feral defaults', () => {
    const card = mountWithVuetify(FrCard).findComponent(VCard);

    expect(card.props()).toMatchObject({ variant: 'elevated', elevation: 2, rounded: 'lg' });
    expect(frCardDefaults).toEqual({ variant: 'elevated', elevation: 2, rounded: 'lg' });
  });

  it.each([
    ['variant', 'outlined'],
    ['elevation', 8],
    ['rounded', 0],
  ] as const)('lets the caller override %s', (prop, value) => {
    const card = mountWithVuetify(FrCard, { props: { [prop]: value } }).findComponent(VCard);

    expect(card.props(prop)).toBe(value);
  });

  it('renders the title and subtitle props in one item of its own', () => {
    const wrapper = mountWithVuetify(FrCard, { props: { title: 'Harvest', subtitle: 'Tomatoes' } });

    expect(wrapper.findAllComponents(VCardItem)).toHaveLength(1);
    expect(wrapper.find('.v-card-title').text()).toBe('Harvest');
    expect(wrapper.find('.v-card-subtitle').text()).toBe('Tomatoes');
  });

  it('leaves out the subtitle when only a title is given, and the title when only a subtitle is', () => {
    const titleOnly = mountWithVuetify(FrCard, { props: { title: 'Harvest' } });
    const subtitleOnly = mountWithVuetify(FrCard, { props: { subtitle: 'Tomatoes' } });

    expect(titleOnly.find('.v-card-subtitle').exists()).toBe(false);
    expect(subtitleOnly.find('.v-card-title').exists()).toBe(false);
    expect(subtitleOnly.find('.v-card-subtitle').text()).toBe('Tomatoes');
  });

  it('renders no item when there is nothing to put in it', () => {
    const wrapper = mountWithVuetify(FrCard, { slots: { default: () => 'Body' } });

    expect(wrapper.findComponent(VCardItem).exists()).toBe(false);
  });

  it.each([
    ['prependIcon', 'mdi-sprout', '.v-card-item__prepend .mdi-sprout'],
    ['appendIcon', 'mdi-sprout', '.v-card-item__append .mdi-sprout'],
    ['prependAvatar', '/sprout.png', '.v-card-item__prepend .v-avatar'],
    ['appendAvatar', '/sprout.png', '.v-card-item__append .v-avatar'],
  ])('puts %s in its own item, not a second one', (prop, value, selector) => {
    const wrapper = mountWithVuetify(FrCard, { props: { title: 'Harvest', [prop]: value } });

    expect(wrapper.findAllComponents(VCardItem)).toHaveLength(1);
    expect(wrapper.find(selector).exists()).toBe(true);
  });

  it('replaces the title and subtitle with the title slot', () => {
    const wrapper = mountWithVuetify(FrCard, {
      props: { title: 'Prop title', subtitle: 'Prop subtitle' },
      slots: { title: () => h('b', { class: 'slot-title' }, 'Slot title') },
    });

    expect(wrapper.find('.v-card-item .slot-title').text()).toBe('Slot title');
    expect(wrapper.text()).not.toContain('Prop');
  });

  it('renders the default slot as the body, with no wrapper of its own', () => {
    const wrapper = mountWithVuetify(FrCard, {
      props: { title: 'Harvest' },
      slots: { default: () => h('p', { class: 'body' }, 'Body') },
    });

    expect(wrapper.find('.v-card > .body').text()).toBe('Body');
  });

  it('puts the actions slot after a spacer in the card actions', () => {
    const wrapper = mountWithVuetify(FrCard, {
      slots: { actions: () => h('button', 'Save') },
    });
    const actions = wrapper.find('.v-card-actions');

    expect(actions.element.firstElementChild?.classList).toContain('v-spacer');
    expect(actions.find('button').text()).toBe('Save');
  });

  it('renders no card actions without the actions slot', () => {
    const wrapper = mountWithVuetify(FrCard, { props: { title: 'Harvest' } });

    expect(wrapper.find('.v-card-actions').exists()).toBe(false);
  });

  it('passes through VCard props it does not handle', () => {
    const wrapper = mountWithVuetify(FrCard, { props: { text: '3 kg', disabled: true } });

    expect(wrapper.find('.v-card-text').text()).toBe('3 kg');
    expect(wrapper.classes()).toContain('v-card--disabled');
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrCard, {
      attrs: { class: 'plot-card', 'data-test': 'card', id: 'plot' },
    });

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-card', 'fr-card', 'plot-card']));
    expect(wrapper.attributes()).toMatchObject({ 'data-test': 'card', id: 'plot' });
  });

  it('emits click to the caller', async () => {
    const onClick = vi.fn();
    const wrapper = mountWithVuetify(FrCard, { attrs: { onClick } });

    await wrapper.trigger('click');

    expect(onClick).toHaveBeenCalledOnce();
  });
});
