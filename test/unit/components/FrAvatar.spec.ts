import { h } from 'vue';
import { VAvatar, VIcon, VImg } from 'vuetify/components';
import { FrAvatar } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

describe('FrAvatar', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VAvatar, marked fr-avatar', () => {
    const wrapper = mountWithVuetify(FrAvatar);

    expect(wrapper.findAllComponents(VAvatar)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-avatar', 'fr-avatar']));
  });

  it("sets no defaults, so it keeps Vuetify's look", () => {
    const avatar = mountWithVuetify(FrAvatar).findComponent(VAvatar);

    expect(avatar.props()).toMatchObject({ variant: 'flat', rounded: undefined, size: 'default' });
  });

  it.each([
    ['text', 'EH', (w: ReturnType<typeof mountWithVuetify>) => w.text() === 'EH'],
    [
      'icon',
      'mdi-sprout',
      (w: ReturnType<typeof mountWithVuetify>) => w.findComponent(VIcon).exists(),
    ],
    [
      'image',
      '/plot.png',
      (w: ReturnType<typeof mountWithVuetify>) => w.findComponent(VImg).exists(),
    ],
  ] as const)('shows the %s prop without a default slot', (prop, value, shows) => {
    const wrapper = mountWithVuetify(FrAvatar, { props: { [prop]: value } });

    expect(shows(wrapper)).toBe(true);
  });

  it('shows the default slot in place of the text', () => {
    const wrapper = mountWithVuetify(FrAvatar, {
      props: { text: 'Prop' },
      slots: { default: () => h('b', { class: 'initials' }, 'EH') },
    });

    expect(wrapper.find('.v-avatar .initials').text()).toBe('EH');
    expect(wrapper.text()).not.toContain('Prop');
  });

  it('draws the badge as a dot without a badge slot', () => {
    const wrapper = mountWithVuetify(FrAvatar, { props: { text: 'EH', badge: true } });

    expect(wrapper.find('.v-badge--dot').exists()).toBe(true);
  });

  it("puts the badge slot's content in the badge", () => {
    const wrapper = mountWithVuetify(FrAvatar, {
      props: { text: 'EH', badge: true },
      slots: { badge: () => h('span', { class: 'count' }, '3') },
    });

    expect(wrapper.find('.v-badge--dot').exists()).toBe(false);
    expect(wrapper.find('.v-badge__badge .count').text()).toBe('3');
  });

  it('passes VAvatar props through', () => {
    const wrapper = mountWithVuetify(FrAvatar, {
      props: { size: 'large', color: 'primary', rounded: 'lg' },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['v-avatar--size-large', 'bg-primary', 'rounded-lg']),
    );
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrAvatar, {
      attrs: { class: 'plot-avatar', 'data-test': 'avatar', id: 'plot' },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['v-avatar', 'fr-avatar', 'plot-avatar']),
    );
    expect(wrapper.attributes()).toMatchObject({ 'data-test': 'avatar', id: 'plot' });
  });
});
