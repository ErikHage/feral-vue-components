import { h } from 'vue';
import { VIcon } from 'vuetify/components';
import { FrFieldGroup } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

const hour = () => [h('input', { id: 'hour', class: 'hour' }), h('input', { class: 'minute' })];

describe('FrFieldGroup', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('is a div marked field-group, its label above the content', () => {
    const wrapper = mountWithVuetify(FrFieldGroup, {
      props: { label: 'Sowing time' },
      slots: { default: hour },
    });

    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.classes()).toEqual(['field-group']);
    expect(wrapper.element.firstElementChild?.tagName).toBe('LABEL');
    expect(wrapper.find('label').text()).toBe('Sowing time');
    expect(wrapper.findAll('.field-group > input')).toHaveLength(2);
  });

  it('points the label at field-id, so the label labels that field', () => {
    const wrapper = mountWithVuetify(FrFieldGroup, {
      props: { label: 'Hour', fieldId: 'hour' },
      slots: { default: hour },
      attachTo: document.body,
    });
    const label = wrapper.find('label').element as HTMLLabelElement;

    expect(label.htmlFor).toBe('hour');
    expect(label.control).toBe(wrapper.find('.hour').element);
    wrapper.unmount();
  });

  it('gives the label an id of its own, unique to each group on the page', () => {
    const wrapper = mountWithVuetify({
      render: () => [h(FrFieldGroup, { label: 'Sowing' }), h(FrFieldGroup, { label: 'Planting' })],
    });
    const ids = wrapper.findAll('label').map((label) => label.attributes('id'));

    expect(ids[0]).toMatch(/-label$/);
    expect(new Set(ids).size).toBe(2);
  });

  it('draws no label without one, only the content', () => {
    const wrapper = mountWithVuetify(FrFieldGroup, { slots: { default: hour } });

    expect(wrapper.find('label').exists()).toBe(false);
    expect(wrapper.findAll('input')).toHaveLength(2);
  });

  it('puts an icon before the label, given one', () => {
    const plain = mountWithVuetify(FrFieldGroup, { props: { label: 'Time' } });
    const iconed = mountWithVuetify(FrFieldGroup, {
      props: { label: 'Time', icon: 'mdi-clock-outline' },
    });

    expect(plain.findComponent(VIcon).exists()).toBe(false);
    expect(iconed.findComponent(VIcon).props()).toMatchObject({
      icon: 'mdi-clock-outline',
      size: 'small',
    });
    expect(iconed.find('label').element.firstElementChild?.classList).toContain('v-icon');
  });

  it('marks a required label with an asterisk hidden from assistive technology', () => {
    const plain = mountWithVuetify(FrFieldGroup, { props: { label: 'Time' } });
    const required = mountWithVuetify(FrFieldGroup, { props: { label: 'Time', required: true } });

    expect(plain.find('label span').exists()).toBe(false);
    expect(required.find('label span').attributes('aria-hidden')).toBe('true');
    expect(required.find('label').text()).toBe('Time *');
  });

  it('shows the description under the label, with an id of its own', () => {
    const wrapper = mountWithVuetify(FrFieldGroup, {
      props: { label: 'Time', description: '24-hour clock' },
    });
    const description = wrapper.find('p');

    expect(description.text()).toBe('24-hour clock');
    expect(description.attributes('id')).toMatch(/-description$/);
    expect(description.element.previousElementSibling?.tagName).toBe('LABEL');
  });

  it('shows the description slot in place of the description prop', () => {
    const wrapper = mountWithVuetify(FrFieldGroup, {
      props: { label: 'Time', description: '24-hour clock' },
      slots: { description: () => h('a', { href: '#help' }, 'Which clock?') },
    });

    expect(wrapper.find('p a').text()).toBe('Which clock?');
    expect(wrapper.find('p').text()).toBe('Which clock?');
  });

  it('shows the description slot without the prop too', () => {
    const wrapper = mountWithVuetify(FrFieldGroup, {
      props: { label: 'Time' },
      slots: { description: () => 'In your timezone' },
    });

    expect(wrapper.find('p').text()).toBe('In your timezone');
    expect(wrapper.find('label').classes()).toContain('mb-1');
  });

  it('draws no description without the prop or the slot', () => {
    const wrapper = mountWithVuetify(FrFieldGroup, { props: { label: 'Time' } });

    expect(wrapper.find('p').exists()).toBe(false);
  });

  it.each([
    ['default', false, ['text-body-2', 'font-weight-semibold', 'mb-2']],
    ['default', true, ['text-body-2', 'font-weight-semibold', 'mb-1']],
    ['small', false, ['text-caption', 'font-weight-medium', 'mb-1']],
    ['small', true, ['text-caption', 'font-weight-medium', 'mb-1']],
  ] as const)('styles a %s label, with description %s, as %j', (size, described, classes) => {
    const wrapper = mountWithVuetify(FrFieldGroup, {
      props: { label: 'Time', size, description: described ? 'Help' : undefined },
    });

    expect(wrapper.find('label').classes()).toEqual([
      'd-flex',
      'align-center',
      'text-high-emphasis',
      ...classes,
    ]);
  });

  it('is default-sized unless told otherwise', () => {
    const wrapper = mountWithVuetify(FrFieldGroup, { props: { label: 'Time' } });

    expect(wrapper.find('label').classes()).toContain('text-body-2');
  });

  it('wraps the content in a div with box-id, given one, and not otherwise', () => {
    const boxed = mountWithVuetify(FrFieldGroup, {
      props: { label: 'Time', boxId: 'time-box' },
      slots: { default: hour },
    });
    const plain = mountWithVuetify(FrFieldGroup, {
      props: { label: 'Time' },
      slots: { default: hour },
    });

    expect(boxed.findAll('.field-group > #time-box > input')).toHaveLength(2);
    expect(plain.findAll('.field-group > input')).toHaveLength(2);
    expect(plain.findAll('.field-group > div')).toHaveLength(0);
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrFieldGroup, {
      props: { label: 'Time' },
      attrs: { class: 'mb-4', 'data-test': 'time', role: 'group' },
    });

    expect(wrapper.classes()).toEqual(['field-group', 'mb-4']);
    expect(wrapper.attributes()).toMatchObject({ 'data-test': 'time', role: 'group' });
  });
});
