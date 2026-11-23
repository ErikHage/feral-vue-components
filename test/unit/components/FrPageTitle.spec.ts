import { h } from 'vue';
import { FrBtn, FrPageTitle } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

describe('FrPageTitle', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('shows the title in an h1, in a row marked fr-page-title', () => {
    const wrapper = mountWithVuetify(FrPageTitle, { props: { title: 'Manage Plants' } });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['fr-page-title', 'd-flex', 'align-center', 'flex-wrap']),
    );
    expect(wrapper.find('h1.fr-page-title__title').text()).toBe('Manage Plants');
  });

  it('uses the element given by tag', () => {
    const wrapper = mountWithVuetify(FrPageTitle, { props: { title: 'Plants', tag: 'h2' } });

    expect(wrapper.find('h2.fr-page-title__title').text()).toBe('Plants');
    expect(wrapper.find('h1').exists()).toBe(false);
  });

  it('puts the actions on the right, wrapping, and only when given', () => {
    const bare = mountWithVuetify(FrPageTitle, { props: { title: 'Plants' } });
    expect(bare.find('.fr-page-title__actions').exists()).toBe(false);

    const wrapper = mountWithVuetify(FrPageTitle, {
      props: { title: 'Plants' },
      slots: { actions: () => h(FrBtn, { class: 'add' }, () => 'Add') },
    });
    const actions = wrapper.find('.fr-page-title__actions');

    expect(actions.classes()).toEqual(expect.arrayContaining(['ms-auto', 'flex-wrap']));
    expect(actions.find('.add').text()).toBe('Add');
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrPageTitle, {
      props: { title: 'Plants' },
      attrs: { class: 'mb-2', 'data-test': 'title' },
    });

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['fr-page-title', 'mb-2']));
    expect(wrapper.attributes('data-test')).toBe('title');
  });
});
