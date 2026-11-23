import { h } from 'vue';
import { VContainer } from 'vuetify/components';
import { FrBtn, FrPage } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

describe('FrPage', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('is a fluid container marked fr-page, holding the content', () => {
    const wrapper = mountWithVuetify(FrPage, {
      slots: { default: () => h('p', { class: 'body' }, 'Plants') },
    });

    expect(wrapper.findAllComponents(VContainer)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['fr-page', 'fr-container', 'v-container--fluid']),
    );
    expect(wrapper.find('.fr-page > .body').text()).toBe('Plants');
  });

  it('puts the title above the content, with the actions beside it', () => {
    const wrapper = mountWithVuetify(FrPage, {
      props: { title: 'Manage Plants' },
      slots: {
        actions: () => h(FrBtn, { class: 'add' }, () => 'Add'),
        default: () => h('p', { class: 'body' }, 'Plants'),
      },
    });
    const children = wrapper.element.children;

    expect(children[0]?.classList).toContain('fr-page-title');
    expect(children[0]?.classList).toContain('mb-6');
    expect(wrapper.find('.fr-page-title h1').text()).toBe('Manage Plants');
    expect(wrapper.find('.fr-page-title__actions .add').text()).toBe('Add');
    expect(children[1]?.classList).toContain('body');
  });

  it('shows no title without one, nor an actions area without the slot', () => {
    expect(mountWithVuetify(FrPage).find('.fr-page-title').exists()).toBe(false);
    expect(
      mountWithVuetify(FrPage, { props: { title: 'Plants' } })
        .find('.fr-page-title__actions')
        .exists(),
    ).toBe(false);
  });

  it("passes VContainer's props on to the container", () => {
    const wrapper = mountWithVuetify(FrPage, {
      attrs: { fluid: false, maxWidth: 600, class: 'plants', 'data-test': 'page' },
    });

    expect(wrapper.classes()).not.toContain('v-container--fluid');
    expect((wrapper.element as HTMLElement).style.maxWidth).toBe('600px');
    expect(wrapper.classes()).toContain('plants');
    expect(wrapper.attributes('data-test')).toBe('page');
  });
});
