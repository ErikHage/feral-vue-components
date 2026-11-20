import { h } from 'vue';
import { VSkeletonLoader } from 'vuetify/components';
import { FrSkeleton } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

const recipe = () => h('article', { class: 'recipe' }, 'Tomato soup');

describe('FrSkeleton', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VSkeletonLoader, the skeleton marked fr-skeleton', () => {
    const wrapper = mountWithVuetify(FrSkeleton);

    expect(wrapper.findAllComponents(VSkeletonLoader)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-skeleton-loader', 'fr-skeleton']));
  });

  it('draws the shapes its type names, and announces that it is loading', () => {
    const wrapper = mountWithVuetify(FrSkeleton, { props: { type: 'heading, paragraph' } });

    expect(wrapper.find('.v-skeleton-loader__heading').exists()).toBe(true);
    expect(wrapper.findAll('.v-skeleton-loader__paragraph .v-skeleton-loader__text')).toHaveLength(
      3,
    );
    expect(wrapper.attributes()).toMatchObject({ role: 'alert', 'aria-live': 'polite' });
  });

  it('is always the skeleton without a slot, loading or not', () => {
    const wrapper = mountWithVuetify(FrSkeleton, { props: { type: 'heading', loading: false } });

    expect(wrapper.find('.v-skeleton-loader__heading').exists()).toBe(true);
  });

  it('shows the skeleton in place of its slot while loading', () => {
    const wrapper = mountWithVuetify(FrSkeleton, {
      props: { type: 'heading', loading: true },
      slots: { default: recipe },
    });

    expect(wrapper.find('.v-skeleton-loader__heading').exists()).toBe(true);
    expect(wrapper.find('.recipe').exists()).toBe(false);
  });

  it('shows its slot alone once not loading, with no element of its own', async () => {
    const wrapper = mountWithVuetify(FrSkeleton, {
      props: { type: 'heading', loading: true },
      slots: { default: recipe },
    });

    await wrapper.setProps({ loading: false });

    expect(wrapper.find('.recipe').text()).toBe('Tomato soup');
    expect(wrapper.find('.v-skeleton-loader').exists()).toBe(false);
    expect(wrapper.html()).toBe('<article class="recipe">Tomato soup</article>');
  });

  it("sets no defaults, so it keeps Vuetify's look", () => {
    const skeleton = mountWithVuetify(FrSkeleton).findComponent(VSkeletonLoader);

    expect(skeleton.props()).toMatchObject({
      type: 'ossein',
      elevation: undefined,
      boilerplate: false,
      loading: false,
    });
  });

  it('passes VSkeletonLoader props through', () => {
    const wrapper = mountWithVuetify(FrSkeleton, {
      props: { type: 'heading', elevation: 2, maxWidth: 600, boilerplate: true },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['elevation-2', 'v-skeleton-loader--boilerplate']),
    );
    expect(wrapper.attributes('style')).toContain('max-width: 600px');
    expect(wrapper.attributes('role')).toBeUndefined();
  });

  it('passes through attributes and classes, onto the skeleton', () => {
    const wrapper = mountWithVuetify(FrSkeleton, {
      attrs: { class: 'mx-auto', 'data-test': 'recipe' },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['v-skeleton-loader', 'fr-skeleton', 'mx-auto']),
    );
    expect(wrapper.attributes('data-test')).toBe('recipe');
  });
});
