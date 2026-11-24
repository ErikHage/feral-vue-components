import { flushPromises } from '@vue/test-utils';
import { h, nextTick } from 'vue';
import { VMenu } from 'vuetify/components';
import { FrAppSettingsMenu, FrListItem } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

/** The menu with two rows, one of which records its clicks. It renders in an overlay on body */
function mountSettings(attrs: Record<string, unknown> = {}, onToggle = vi.fn()) {
  return mountWithVuetify(FrAppSettingsMenu, {
    attrs,
    slots: {
      default: () => [
        h(FrListItem, { class: 'toggle', title: 'Compact rows', onClick: onToggle }),
        h(FrListItem, { class: 'about', title: 'About' }),
      ],
    },
    attachTo: document.body,
  });
}

const card = () => document.querySelector('.v-overlay-container .fr-app-settings-menu .v-card');

describe('FrAppSettingsMenu', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
    document.body.innerHTML = '';
  });

  it('shows a closed cog button named Settings', () => {
    const wrapper = mountSettings();
    const button = wrapper.find('button');

    expect(button.attributes('aria-label')).toBe('Settings');
    expect(button.attributes('aria-expanded')).toBe('false');
    expect(button.find('.mdi-cog-outline').exists()).toBe(true);
    expect(button.classes()).toEqual(
      expect.arrayContaining(['v-btn--variant-text', 'v-btn--density-comfortable']),
    );
    expect(card()).toBeNull();
  });

  it('opens at the end of the cog, onto a card holding a compact nav list of the items', async () => {
    const wrapper = mountSettings();

    await wrapper.find('button').trigger('click');
    await nextTick();

    expect(wrapper.findComponent(VMenu).props('location')).toBe('end');
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('true');
    expect(card()?.classList).toContain('pa-2');
    expect((card() as HTMLElement).style.minWidth).toBe('220px');
    const list = card()?.querySelector('.v-list');
    expect(list?.classList).toContain('v-list--nav');
    expect(list?.classList).toContain('v-list--density-compact');
    expect(list?.querySelector('.toggle')?.textContent).toBe('Compact rows');
    expect(list?.querySelector('.about')?.textContent).toBe('About');
  });

  it('stays open when an item is clicked', async () => {
    const onToggle = vi.fn();
    const wrapper = mountSettings({}, onToggle);
    await wrapper.find('button').trigger('click');
    await nextTick();

    (card()?.querySelector('.toggle') as HTMLElement).click();
    await flushPromises();

    expect(onToggle).toHaveBeenCalledOnce();
    expect(wrapper.findComponent(VMenu).props('closeOnContentClick')).toBe(false);
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('true');
    wrapper.unmount();
  });

  it('puts attributes on the cog button, keeping the click that opens the menu', async () => {
    const onClick = vi.fn();
    const wrapper = mountSettings({ id: 'settings', class: 'ml-2', onClick });
    const button = wrapper.find('button');

    expect(button.attributes('id')).toBe('settings');
    expect(button.classes()).toContain('ml-2');

    await button.trigger('click');
    await nextTick();

    expect(onClick).toHaveBeenCalledOnce();
    expect(card()).not.toBeNull();
  });

  it('opens onto an empty list without items', async () => {
    const wrapper = mountWithVuetify(FrAppSettingsMenu, { attachTo: document.body });

    await wrapper.find('button').trigger('click');
    await nextTick();

    expect(card()?.querySelector('.v-list')?.children).toHaveLength(0);
  });
});
