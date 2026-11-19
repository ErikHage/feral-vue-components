import { h } from 'vue';
import { VBadge, VIcon } from 'vuetify/components';
import { FrBadge } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

describe('FrBadge', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VBadge, marked fr-badge', () => {
    const wrapper = mountWithVuetify(FrBadge);

    expect(wrapper.findAllComponents(VBadge)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-badge', 'fr-badge']));
  });

  it("sets no defaults, so it keeps Vuetify's look", () => {
    const badge = mountWithVuetify(FrBadge).findComponent(VBadge);

    expect(badge.props()).toMatchObject({ color: undefined, location: 'top end', dot: false });
  });

  it('puts the default slot in the wrapper, under the badge', () => {
    const wrapper = mountWithVuetify(FrBadge, {
      props: { content: 3 },
      slots: { default: () => h('button', { class: 'inbox' }, 'Inbox') },
    });

    expect(wrapper.find('.v-badge__wrapper > .inbox').text()).toBe('Inbox');
  });

  it('shows the content prop without a badge slot', () => {
    const wrapper = mountWithVuetify(FrBadge, { props: { content: 3 } });

    expect(wrapper.find('.v-badge__badge').text()).toBe('3');
  });

  it('shows the icon prop without a badge slot', () => {
    const wrapper = mountWithVuetify(FrBadge, { props: { icon: 'mdi-check' } });

    expect(wrapper.find('.v-badge__badge').findComponent(VIcon).exists()).toBe(true);
  });

  it('shows the badge slot in place of the content', () => {
    const wrapper = mountWithVuetify(FrBadge, {
      props: { content: 3 },
      slots: { badge: () => h('b', { class: 'new' }, 'new') },
    });

    expect(wrapper.find('.v-badge__badge .new').text()).toBe('new');
    expect(wrapper.find('.v-badge__badge').text()).not.toContain('3');
  });

  it('passes VBadge props through', () => {
    const wrapper = mountWithVuetify(FrBadge, {
      props: { content: 120, max: 99, color: 'error', dot: false, inline: true },
    });

    expect(wrapper.find('.v-badge__badge').text()).toBe('99+');
    expect(wrapper.find('.v-badge__badge').classes()).toContain('bg-error');
    expect(wrapper.classes()).toContain('v-badge--inline');
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrBadge, {
      attrs: { class: 'plot-badge', 'data-test': 'badge', id: 'plot' },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['v-badge', 'fr-badge', 'plot-badge']),
    );
    expect(wrapper.attributes()).toMatchObject({ 'data-test': 'badge', id: 'plot' });
  });
});
