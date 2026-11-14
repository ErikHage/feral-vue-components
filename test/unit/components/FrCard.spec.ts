import { h } from 'vue';
import { VCard } from 'vuetify/components';
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

  it('renders exactly one VCard', () => {
    const wrapper = mountWithVuetify(FrCard);

    expect(wrapper.findAllComponents(VCard)).toHaveLength(1);
    expect(wrapper.classes()).toContain('v-card');
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

  it('passes through VCard props it does not default', () => {
    const wrapper = mountWithVuetify(FrCard, {
      props: { title: 'Harvest', subtitle: 'Tomatoes', text: '3 kg' },
    });

    expect(wrapper.find('.v-card-title').text()).toBe('Harvest');
    expect(wrapper.find('.v-card-subtitle').text()).toBe('Tomatoes');
    expect(wrapper.find('.v-card-text').text()).toBe('3 kg');
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrCard, {
      attrs: { class: 'plot-card', 'data-test': 'card', id: 'plot' },
    });

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-card', 'plot-card']));
    expect(wrapper.attributes()).toMatchObject({ 'data-test': 'card', id: 'plot' });
  });

  it('forwards the default, title and actions slots', () => {
    const wrapper = mountWithVuetify(FrCard, {
      slots: {
        default: () => h('p', { class: 'body' }, 'Body'),
        title: () => 'Slot title',
        actions: () => h('button', 'Save'),
      },
    });

    expect(wrapper.find('.body').text()).toBe('Body');
    expect(wrapper.find('.v-card-title').text()).toBe('Slot title');
    expect(wrapper.find('.v-card-actions button').text()).toBe('Save');
  });

  it('forwards scoped slot props', () => {
    const wrapper = mountWithVuetify(FrCard, {
      props: { loading: true },
      slots: {
        loader: (scope: { isActive: boolean }) =>
          h('span', { class: 'loader' }, String(scope.isActive)),
      },
    });

    expect(wrapper.find('.loader').text()).toBe('true');
  });

  it('emits click to the caller', async () => {
    const onClick = vi.fn();
    const wrapper = mountWithVuetify(FrCard, { attrs: { onClick } });

    await wrapper.trigger('click');

    expect(onClick).toHaveBeenCalledOnce();
  });
});
