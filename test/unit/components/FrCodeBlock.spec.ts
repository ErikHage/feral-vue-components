import { h } from 'vue';
import { FrCodeBlock } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

const code = 'const plants = [\n  "tomato",\n  "basil",\n];\n';

describe('FrCodeBlock', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders a single <pre>, marked fr-code-block', () => {
    const wrapper = mountWithVuetify(FrCodeBlock);

    expect(wrapper.element.tagName).toBe('PRE');
    expect(wrapper.classes()).toContain('fr-code-block');
  });

  it('shows the default slot exactly as written, adding no whitespace', () => {
    const wrapper = mountWithVuetify(FrCodeBlock, { slots: { default: () => code } });

    expect(wrapper.element.textContent).toBe(code);
  });

  it('holds elements in the slot, a <code> say', () => {
    const wrapper = mountWithVuetify(FrCodeBlock, {
      slots: { default: () => h('code', { class: 'language-ts' }, 'let a = 1;') },
    });

    expect(wrapper.find('pre > code.language-ts').text()).toBe('let a = 1;');
  });

  it('is padded, rounded, scrolls sideways, and takes its background from the theme', () => {
    const style = (mountWithVuetify(FrCodeBlock).element as HTMLElement).style;

    expect(style.padding).toBe('16px');
    expect(style.borderRadius).toBe('8px');
    expect(style.overflowX).toBe('auto');
    expect(style.background).toContain('var(--v-theme-on-surface)');
  });

  it('sets its look inline, adding no Vuetify utility classes of its own', () => {
    const wrapper = mountWithVuetify(FrCodeBlock);

    expect(wrapper.classes()).toEqual(['fr-code-block']);
  });

  it("merges the caller's classes and styles, the caller's style winning", () => {
    const wrapper = mountWithVuetify(FrCodeBlock, {
      attrs: { class: 'pa-2', style: 'background: black; padding: 4px' },
    });
    const style = (wrapper.element as HTMLElement).style;

    expect(wrapper.classes()).toEqual(['fr-code-block', 'pa-2']);
    expect(style.background).toBe('black');
    expect(style.padding).toBe('4px');
    expect(style.borderRadius).toBe('8px');
  });

  it('passes through attributes', () => {
    const wrapper = mountWithVuetify(FrCodeBlock, {
      attrs: { 'data-test': 'code', id: 'plot', 'aria-label': 'Example' },
    });

    expect(wrapper.attributes()).toMatchObject({
      'data-test': 'code',
      id: 'plot',
      'aria-label': 'Example',
    });
  });
});
