import { FrAppLogo } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

describe('FrAppLogo', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('draws an 18px svg marked fr-app-logo, hidden from screen readers', () => {
    const wrapper = mountWithVuetify(FrAppLogo);

    expect(wrapper.element.tagName).toBe('svg');
    expect(wrapper.classes()).toContain('fr-app-logo');
    expect(wrapper.attributes()).toMatchObject({
      width: '18',
      height: '18',
      viewBox: '0 0 24 24',
      'aria-hidden': 'true',
      focusable: 'false',
    });
  });

  it('takes its size from the size prop', () => {
    const wrapper = mountWithVuetify(FrAppLogo, { props: { size: 22 } });

    expect(wrapper.attributes('width')).toBe('22');
    expect(wrapper.attributes('height')).toBe('22');
  });

  it('is white on a dark theme', () => {
    const wrapper = mountWithVuetify(FrAppLogo);

    expect(wrapper.attributes('fill')).toBe('#FFFFFF');
    expect(wrapper.attributes('stroke')).toBe('#FFFFFF');
  });

  it('is near-black on a light theme', () => {
    const wrapper = mountWithVuetify(FrAppLogo, {}, { theme: { defaultTheme: 'feralLight' } });

    expect(wrapper.attributes('fill')).toBe('#050606');
    expect(wrapper.attributes('stroke')).toBe('#050606');
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrAppLogo, { attrs: { class: 'mr-2', 'data-test': 'logo' } });

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['fr-app-logo', 'mr-2']));
    expect(wrapper.attributes('data-test')).toBe('logo');
  });
});
