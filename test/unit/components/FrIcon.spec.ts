import { VIcon } from 'vuetify/components';
import { FrIcon } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

describe('FrIcon', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VIcon, marked fr-icon', () => {
    const wrapper = mountWithVuetify(FrIcon, { props: { icon: 'mdi-sprout' } });

    expect(wrapper.findAllComponents(VIcon)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-icon', 'fr-icon']));
  });

  it('shows the icon named in its default slot', () => {
    const wrapper = mountWithVuetify(FrIcon, { slots: { default: 'mdi-sprout' } });

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['mdi', 'mdi-sprout']));
  });

  it('shows the icon named by the icon prop, without a slot', () => {
    const wrapper = mountWithVuetify(FrIcon, { props: { icon: 'mdi-watering-can' } });

    expect(wrapper.classes()).toContain('mdi-watering-can');
  });

  it('resolves Vuetify icon aliases', () => {
    const wrapper = mountWithVuetify(FrIcon, { props: { icon: '$close' } });

    expect(wrapper.classes()).toContain('mdi-close');
  });

  it("sets no defaults, so it keeps Vuetify's look", () => {
    const wrapper = mountWithVuetify(FrIcon, { props: { icon: 'mdi-sprout' } });

    expect(wrapper.findComponent(VIcon).props()).toMatchObject({
      size: 'default',
      color: undefined,
      start: false,
      end: false,
    });
    expect(wrapper.classes()).toContain('v-icon--size-default');
  });

  it('passes VIcon props through', () => {
    const wrapper = mountWithVuetify(FrIcon, {
      props: { icon: 'mdi-sprout', size: 'small', color: 'primary', start: true, disabled: true },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([
        'v-icon--size-small',
        'text-primary',
        'v-icon--start',
        'v-icon--disabled',
      ]),
    );
  });

  it('is decorative unless clicked', () => {
    const wrapper = mountWithVuetify(FrIcon, { props: { icon: 'mdi-sprout' } });

    expect(wrapper.attributes('aria-hidden')).toBe('true');
    expect(wrapper.attributes('role')).toBeUndefined();
  });

  it('becomes a focusable button with a click handler, and reports the click', async () => {
    const onClick = vi.fn();
    const wrapper = mountWithVuetify(FrIcon, {
      props: { icon: 'mdi-pencil' },
      attrs: { onClick, 'aria-label': 'Edit' },
    });

    await wrapper.trigger('click');

    expect(wrapper.attributes()).toMatchObject({
      role: 'button',
      tabindex: '0',
      'aria-hidden': 'false',
      'aria-label': 'Edit',
    });
    expect(wrapper.classes()).toContain('v-icon--clickable');
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrIcon, {
      props: { icon: 'mdi-sprout' },
      attrs: { class: 'mr-2', 'data-test': 'icon' },
    });

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-icon', 'fr-icon', 'mr-2']));
    expect(wrapper.attributes('data-test')).toBe('icon');
  });
});
