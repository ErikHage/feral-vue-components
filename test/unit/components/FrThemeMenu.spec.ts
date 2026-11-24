import { flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue';
import { VMenu } from 'vuetify/components';
import { FrThemeMenu, frThemeMenuOptions } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

function mountTheme(modelValue: string, attrs: Record<string, unknown> = {}) {
  return mountWithVuetify(FrThemeMenu, {
    props: { modelValue } as never,
    attrs,
    attachTo: document.body,
  });
}

const list = () => document.querySelector('.v-overlay-container .fr-theme-menu .v-list');
const items = () => [...(list()?.querySelectorAll<HTMLElement>('.v-list-item') ?? [])];

async function open(wrapper: ReturnType<typeof mountTheme>) {
  await wrapper.find('button').trigger('click');
  await nextTick();
}

describe('FrThemeMenu', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
    document.body.innerHTML = '';
  });

  it('offers Light, Dark and System', () => {
    expect(frThemeMenuOptions.map(({ value, title, icon }) => [value, title, icon])).toEqual([
      ['light', 'Light', 'mdi-white-balance-sunny'],
      ['dark', 'Dark', 'mdi-moon-waning-crescent'],
      ['system', 'System', 'mdi-monitor'],
    ]);
  });

  it.each([
    ['light', 'mdi-white-balance-sunny'],
    ['dark', 'mdi-moon-waning-crescent'],
    ['system', 'mdi-monitor'],
  ])("shows %s's icon on a closed text button named Theme", (value, icon) => {
    const wrapper = mountTheme(value);
    const button = wrapper.find('button');

    expect(button.find(`.${icon}`).exists()).toBe(true);
    expect(button.attributes('aria-label')).toBe('Theme');
    expect(button.attributes('aria-expanded')).toBe('false');
    expect(button.classes()).toEqual(
      expect.arrayContaining(['v-btn--variant-text', 'v-btn--density-comfortable']),
    );
    expect(list()).toBeNull();
  });

  it('shows a neutral icon, with a warning, for a value that is none of the options', () => {
    const wrapper = mountTheme('sepia');

    expect(wrapper.find('.mdi-theme-light-dark').exists()).toBe(true);
    expect(warn.mock.calls[0]?.[0]).toContain(
      'Invalid prop: custom validator check failed for prop "modelValue"',
    );
    warn.mockClear();
  });

  it('opens below at the end onto a menu of the three, the picked one checked and active', async () => {
    const wrapper = mountTheme('dark');
    await open(wrapper);

    expect(wrapper.findComponent(VMenu).props('location')).toBe('bottom end');
    const card = document.querySelector<HTMLElement>('.fr-theme-menu');
    expect(card?.classList).toContain('pa-2');
    expect(card?.style.minWidth).toBe('160px');
    expect(list()?.getAttribute('role')).toBe('menu');
    expect(list()?.getAttribute('aria-label')).toBe('Theme');
    expect(list()?.classList).toContain('v-list--nav');
    expect(list()?.classList).toContain('v-list--density-compact');

    expect(
      items().map((item) => [
        item.textContent?.trim(),
        item.getAttribute('role'),
        item.getAttribute('aria-checked'),
        item.classList.contains('v-list-item--active'),
      ]),
    ).toEqual([
      ['Light', 'menuitemradio', 'false', false],
      ['Dark', 'menuitemradio', 'true', true],
      ['System', 'menuitemradio', 'false', false],
    ]);
    expect(items()[0]?.querySelector('.mdi-white-balance-sunny')).not.toBeNull();
    expect(items()[2]?.querySelector('.mdi-monitor')).not.toBeNull();
  });

  it('reports a pick through v-model and closes', async () => {
    const wrapper = mountTheme('dark');
    await open(wrapper);

    items()[2]?.click();
    await flushPromises();

    expect(wrapper.emitted('update:modelValue')).toEqual([['system']]);
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('false');
    wrapper.unmount();
  });

  it('puts attributes on the button, keeping the click that opens the menu', async () => {
    const onClick = vi.fn();
    const wrapper = mountTheme('light', { id: 'theme', class: 'ml-2', onClick });
    const button = wrapper.find('button');

    expect(button.attributes('id')).toBe('theme');
    expect(button.classes()).toContain('ml-2');

    await open(wrapper);

    expect(onClick).toHaveBeenCalledOnce();
    expect(list()).not.toBeNull();
  });
});
