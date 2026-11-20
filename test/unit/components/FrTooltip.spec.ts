import { flushPromises } from '@vue/test-utils';
import { h, nextTick } from 'vue';
import { VTooltip } from 'vuetify/components';
import { FrTooltip } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

type ActivatorScope = { isActive: boolean; props: Record<string, unknown> };

/** A tooltip describing an icon button. It renders in an overlay on body */
function mountTooltip(
  props: Record<string, unknown> = {},
  slots: Record<string, unknown> = {},
  attrs: Record<string, unknown> = {},
) {
  return mountWithVuetify(FrTooltip, {
    props: props as never,
    attrs,
    slots: {
      activator: ({ props: activatorProps }: ActivatorScope) =>
        h('button', { class: 'copy', ...activatorProps }, 'Copy'),
      ...slots,
    },
    attachTo: document.body,
  });
}

// VTooltip renders even a shut tooltip, content and all, marking only an open one active
const tooltip = () => document.querySelector('.v-overlay-container .v-tooltip');
const open = () => document.querySelector('.v-overlay-container .v-tooltip.v-overlay--active');
const content = () => tooltip()?.querySelector('.v-overlay__content');

describe('FrTooltip', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
    document.body.innerHTML = '';
  });

  it('renders exactly one VTooltip, marked fr-tooltip', async () => {
    const wrapper = mountTooltip({ text: 'Copy the link', modelValue: true });
    await nextTick();

    expect(wrapper.findAllComponents(VTooltip)).toHaveLength(1);
    expect(tooltip()?.classList).toContain('fr-tooltip');
  });

  it('renders the activator, described by the tooltip once open', async () => {
    const wrapper = mountTooltip({ text: 'Copy the link', modelValue: true });
    await nextTick();

    const describedBy = wrapper.find('.copy').attributes('aria-describedby');
    expect(describedBy).toBeTruthy();
    expect(open()?.id).toBe(describedBy);
  });

  it('shows its text prop without a default slot', async () => {
    mountTooltip({ text: 'Copy the link', modelValue: true });
    await nextTick();

    expect(content()?.textContent).toBe('Copy the link');
  });

  it('shows the default slot in place of the text prop', async () => {
    mountTooltip(
      { text: 'Copy the link', modelValue: true },
      { default: () => h('strong', { class: 'rich' }, 'Copy: ctrl+c') },
    );
    await nextTick();

    expect(content()?.querySelector('.rich')?.textContent).toBe('Copy: ctrl+c');
    expect(content()?.textContent).toBe('Copy: ctrl+c');
  });

  it('opens when its activator is hovered', async () => {
    const wrapper = mountTooltip({ text: 'Copy the link', openDelay: 0 });

    expect(open()).toBeNull();

    await wrapper.find('.copy').trigger('mouseenter');
    await flushPromises();
    await vi.waitFor(() => expect(open()?.textContent).toBe('Copy the link'));
  });

  it('stays shut while disabled', async () => {
    const wrapper = mountTooltip({ text: 'Copy the link', disabled: true, openDelay: 0 });

    await wrapper.find('.copy').trigger('mouseenter');
    await flushPromises();
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(open()).toBeNull();
  });

  it("sets no defaults, so it keeps Vuetify's behaviour", () => {
    const wrapper = mountTooltip();

    expect(wrapper.findComponent(VTooltip).props()).toMatchObject({
      location: 'end',
      openOnHover: true,
    });
  });

  it('passes VTooltip props through', () => {
    const wrapper = mountTooltip({ location: 'top', openDelay: 300, maxWidth: 200 });

    expect(wrapper.findComponent(VTooltip).props()).toMatchObject({
      location: 'top',
      openDelay: 300,
      maxWidth: 200,
    });
  });

  it('renders no activator and stays shut without slots', async () => {
    const wrapper = mountWithVuetify(FrTooltip, { attachTo: document.body });
    await nextTick();

    expect(wrapper.findComponent(VTooltip).exists()).toBe(true);
    expect(wrapper.html()).not.toContain('<button');
    expect(open()).toBeNull();
  });

  it('passes classes on to the tooltip', async () => {
    mountTooltip({ text: 'Copy', modelValue: true }, {}, { class: 'hint' });
    await nextTick();

    expect(tooltip()?.classList).toContain('hint');
  });
});
