import { h } from 'vue';
import { VBtn, VCard, VCardItem } from 'vuetify/components';
import { FrBtn, FrCard, frCardActionsDefaults, frCardDefaults } from '../../../src';
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

  it.each(['prepend', 'append'])('renders the %s slot in its own item', (side) => {
    const wrapper = mountWithVuetify(FrCard, {
      props: { title: 'Harvest' },
      slots: { [side]: () => h('i', { class: 'slot-icon' }) },
    });

    expect(wrapper.findAllComponents(VCardItem)).toHaveLength(1);
    expect(wrapper.find(`.v-card-item__${side} .slot-icon`).exists()).toBe(true);
  });

  it.each(['prepend', 'append'])('renders the item for the %s slot alone', (side) => {
    const wrapper = mountWithVuetify(FrCard, {
      slots: { [side]: () => h('i', { class: 'slot-icon' }) },
    });

    expect(wrapper.findAllComponents(VCardItem)).toHaveLength(1);
    expect(wrapper.find(`.v-card-item__${side} .slot-icon`).exists()).toBe(true);
  });

  it.each([
    ['prepend', { prependIcon: 'mdi-sprout', prependAvatar: '/sprout.png' }],
    ['append', { appendIcon: 'mdi-sprout', appendAvatar: '/sprout.png' }],
  ])('lets the %s slot replace the icon and avatar props on its side', (side, props) => {
    const wrapper = mountWithVuetify(FrCard, {
      props: { title: 'Harvest', ...props },
      slots: { [side]: () => h('i', { class: 'slot-icon' }) },
    });
    const area = wrapper.find(`.v-card-item__${side}`);

    expect(area.find('.slot-icon').exists()).toBe(true);
    expect(area.find('.mdi-sprout').exists()).toBe(false);
    expect(area.find('.v-avatar').exists()).toBe(false);
  });

  it('draws no prepend or append area without their slots or props', () => {
    const wrapper = mountWithVuetify(FrCard, { props: { title: 'Harvest' } });

    expect(wrapper.find('.v-card-item__prepend').exists()).toBe(false);
    expect(wrapper.find('.v-card-item__append').exists()).toBe(false);
  });

  it('replaces the title and subtitle with the title slot', () => {
    const wrapper = mountWithVuetify(FrCard, {
      props: { title: 'Prop title', subtitle: 'Prop subtitle' },
      slots: { title: () => h('b', { class: 'slot-title' }, 'Slot title') },
    });

    expect(wrapper.find('.v-card-item .slot-title').text()).toBe('Slot title');
    expect(wrapper.text()).not.toContain('Prop');
  });

  it('puts the default slot in a card text, padded to line up with the title', () => {
    const wrapper = mountWithVuetify(FrCard, {
      props: { title: 'Harvest' },
      slots: { default: () => h('p', { class: 'body' }, 'Body') },
    });

    expect(wrapper.find('.v-card > .v-card-item + .v-card-text > .body').text()).toBe('Body');
  });

  it('puts the default slot straight in the card when flush', () => {
    const wrapper = mountWithVuetify(FrCard, {
      props: { title: 'Harvest', flush: true },
      slots: { default: () => h('table', { class: 'body' }) },
    });

    expect(wrapper.find('.v-card > .body').exists()).toBe(true);
    expect(wrapper.find('.v-card-text').exists()).toBe(false);
    expect(wrapper.attributes('flush')).toBeUndefined();
  });

  it('renders no card text without a default slot', () => {
    const wrapper = mountWithVuetify(FrCard, { props: { title: 'Harvest' } });

    expect(wrapper.find('.v-card-text').exists()).toBe(false);
  });

  it('puts the actions slot after a spacer in the card actions', () => {
    const wrapper = mountWithVuetify(FrCard, {
      slots: { actions: () => h('button', 'Save') },
    });
    const actions = wrapper.find('.v-card-actions');

    expect(actions.element.firstElementChild?.classList).toContain('v-spacer');
    expect(actions.find('button').text()).toBe('Save');
  });

  it('makes the buttons in actions primary text buttons, unless they say otherwise', () => {
    const wrapper = mountWithVuetify(FrCard, {
      slots: {
        actions: () => [
          h(FrBtn, { class: 'save' }, () => 'Save'),
          h(FrBtn, { class: 'delete', color: 'error', variant: 'flat' }, () => 'Delete'),
        ],
      },
    });
    const [save, remove] = wrapper.findAllComponents(VBtn).map((b) => b.classes());

    expect(save).toEqual(expect.arrayContaining(['text-primary', 'v-btn--variant-text']));
    expect(remove).toEqual(expect.arrayContaining(['bg-error', 'v-btn--variant-flat']));
    expect(remove).not.toContain('text-primary');
    expect(frCardActionsDefaults).toEqual({ VBtn: { color: 'primary' } });
  });

  it("leaves buttons in the body to Vuetify's defaults", () => {
    const wrapper = mountWithVuetify(FrCard, { slots: { default: () => h(FrBtn, () => 'Go') } });

    const button = wrapper.findComponent(VBtn).classes();

    expect(button).toContain('v-btn--variant-elevated');
    expect(button.filter((c) => c.endsWith('-primary'))).toEqual([]);
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
