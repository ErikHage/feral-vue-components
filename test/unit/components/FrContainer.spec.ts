import { h } from 'vue';
import { VContainer } from 'vuetify/components';
import { FrCol, FrContainer, frContainerDefaults, FrRow } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

describe('FrContainer', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VContainer, marked fr-container', () => {
    const wrapper = mountWithVuetify(FrContainer);

    expect(wrapper.findAllComponents(VContainer)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-container', 'fr-container']));
  });

  it('renders the default slot as its content', () => {
    const wrapper = mountWithVuetify(FrContainer, {
      slots: { default: () => h('p', { class: 'body' }, 'Plantings') },
    });

    expect(wrapper.find('.fr-container > .body').text()).toBe('Plantings');
  });

  it('is fluid by default, so a page fills the width', () => {
    const wrapper = mountWithVuetify(FrContainer);

    expect(wrapper.findComponent(VContainer).props('fluid')).toBe(true);
    expect(wrapper.classes()).toContain('v-container--fluid');
    expect(frContainerDefaults).toEqual({ fluid: true });
  });

  it('keeps Vuetify\'s width for the breakpoint given :fluid="false"', () => {
    const wrapper = mountWithVuetify(FrContainer, { props: { fluid: false } });

    expect(wrapper.classes()).not.toContain('v-container--fluid');
  });

  it('passes VContainer props through', () => {
    const wrapper = mountWithVuetify(FrContainer, {
      props: { maxWidth: 600, tag: 'main' },
    });

    expect(wrapper.element.tagName).toBe('MAIN');
    expect(wrapper.classes()).toContain('v-container--fluid');
    expect((wrapper.element as HTMLElement).style.maxWidth).toBe('600px');
  });

  it('holds an FrRow of FrCols', () => {
    const wrapper = mountWithVuetify(FrContainer, {
      slots: { default: () => h(FrRow, () => [h(FrCol, () => 'A'), h(FrCol, () => 'B')]) },
    });

    expect(wrapper.findAll('.fr-container > .fr-row > .fr-col').map((c) => c.text())).toEqual([
      'A',
      'B',
    ]);
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrContainer, {
      attrs: { class: 'text-center', 'data-test': 'page', id: 'plot' },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['v-container', 'fr-container', 'text-center']),
    );
    expect(wrapper.attributes()).toMatchObject({ 'data-test': 'page', id: 'plot' });
  });
});
