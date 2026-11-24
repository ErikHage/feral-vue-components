import { h, nextTick } from 'vue';
import { VMenu } from 'vuetify/components';
import { FrAppUserMenu, FrListItem } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

/** The menu for a user, with a Sign out row. It renders in an overlay on body */
function mountUser(props: Record<string, unknown>, attrs: Record<string, unknown> = {}) {
  return mountWithVuetify(FrAppUserMenu, {
    props: props as never,
    attrs,
    slots: { default: () => h(FrListItem, { class: 'sign-out', title: 'Sign out' }) },
    attachTo: document.body,
  });
}

const card = () => document.querySelector<HTMLElement>('.v-overlay-container .fr-app-user-menu');

async function open(wrapper: ReturnType<typeof mountUser>) {
  await wrapper.find('button').trigger('click');
  await nextTick();
}

describe('FrAppUserMenu', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
    document.body.innerHTML = '';
  });

  it.each([
    ['Ada Lovelace', 'AL'],
    ['ada', 'A'],
    ['grace brewster hopper', 'GB'],
    ['  Alan   Turing ', 'AT'],
    ['', ''],
  ])('shows %j as the initials %j', (name, initials) => {
    const wrapper = mountUser({ name });

    expect(wrapper.find('button .v-avatar').text()).toBe(initials);
  });

  it("shows a closed 48px text button with a 40px primary avatar, named for the user's account", () => {
    const wrapper = mountUser({ name: 'Ada Lovelace' });
    const button = wrapper.find('button');
    const avatar = button.find('.v-avatar');

    expect(button.attributes('aria-label')).toBe('Account: Ada Lovelace');
    expect(button.attributes('aria-expanded')).toBe('false');
    expect(button.classes()).toEqual(
      expect.arrayContaining(['v-btn--icon', 'v-btn--variant-text']),
    );
    expect(button.attributes('style')).toContain('width: 48px');
    expect(avatar.classes()).toEqual(
      expect.arrayContaining(['bg-primary', 'text-body-2', 'font-weight-bold']),
    );
    expect(avatar.attributes('style')).toContain('width: 40px');
    expect(card()).toBeNull();
  });

  it('opens below at the end, 8px off, as a card headed by the name and detail', async () => {
    const wrapper = mountUser({ name: 'Ada Lovelace', detail: 'Administrator' });
    await open(wrapper);

    expect(wrapper.findComponent(VMenu).props()).toMatchObject({
      location: 'bottom end',
      offset: 8,
    });
    expect(card()?.classList).toContain('elevation-8');
    expect(card()?.classList).toContain('rounded-lg');
    expect(card()?.style.minWidth).toBe('260px');
    expect(card()?.style.maxWidth).toBe('320px');

    const header = card()?.querySelector('.fr-app-user-menu__header');
    const avatar = header?.querySelector('.v-avatar');
    expect(avatar?.textContent?.trim()).toBe('AL');
    expect(avatar?.getAttribute('aria-hidden')).toBe('true');
    expect(header?.querySelector('.fr-app-user-menu__name')?.textContent?.trim()).toBe(
      'Ada Lovelace',
    );
    expect(header?.querySelector('.fr-app-user-menu__detail')?.textContent?.trim()).toBe(
      'Administrator',
    );
  });

  it('leaves the detail line out when there is none', async () => {
    const wrapper = mountUser({ name: 'Ada Lovelace' });
    await open(wrapper);

    expect(card()?.querySelector('.fr-app-user-menu__name')).not.toBeNull();
    expect(card()?.querySelector('.fr-app-user-menu__detail')).toBeNull();
  });

  it("puts the host's rows in a compact, slim nav list under a divider", async () => {
    const wrapper = mountUser({ name: 'Ada Lovelace' });
    await open(wrapper);

    const list = card()?.querySelector('.v-divider + .v-list');
    expect(list?.classList).toContain('v-list--nav');
    expect(list?.classList).toContain('v-list--slim');
    expect(list?.classList).toContain('v-list--density-compact');
    expect(list?.classList).toContain('pa-2');
    expect(list?.querySelector('.sign-out')?.textContent).toBe('Sign out');
  });

  it('puts attributes on the avatar button, keeping the click that opens the menu', async () => {
    const onClick = vi.fn();
    const wrapper = mountUser({ name: 'Ada' }, { id: 'account', class: 'ml-2', onClick });
    const button = wrapper.find('button');

    expect(button.attributes('id')).toBe('account');
    expect(button.classes()).toContain('ml-2');

    await open(wrapper);

    expect(onClick).toHaveBeenCalledOnce();
    expect(card()).not.toBeNull();
  });

  it('opens onto an empty list without rows', async () => {
    const wrapper = mountWithVuetify(FrAppUserMenu, {
      props: { name: 'Ada' },
      attachTo: document.body,
    });
    await wrapper.find('button').trigger('click');
    await nextTick();

    expect(card()?.querySelector('.v-list')?.children).toHaveLength(0);
  });
});
