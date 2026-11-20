import { flushPromises } from '@vue/test-utils';
import { h } from 'vue';
import { VImg } from 'vuetify/components';
import { FrImage } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

const logo = { src: '/logo.png', alt: 'Logo', eager: true };

describe('FrImage', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VImg, marked fr-image', () => {
    const wrapper = mountWithVuetify(FrImage, { props: logo });

    expect(wrapper.findAllComponents(VImg)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-img', 'fr-image']));
  });

  it('renders the image from src, with its alt text', () => {
    const img = mountWithVuetify(FrImage, { props: logo }).find('img');

    expect(img.attributes()).toMatchObject({ src: '/logo.png', alt: 'Logo' });
  });

  it("sets no defaults, so the whole image shows, as Vuetify 2's contain did", () => {
    const wrapper = mountWithVuetify(FrImage, { props: logo });

    expect(wrapper.findComponent(VImg).props()).toMatchObject({ cover: false, eager: true });
    expect(wrapper.find('img').classes()).toContain('v-img__img--contain');
    expect(wrapper.classes()).not.toContain('mx-auto');
  });

  it('passes VImg props through', () => {
    const wrapper = mountWithVuetify(FrImage, {
      props: { ...logo, cover: true, maxWidth: 250, rounded: 'lg' },
    });

    expect(wrapper.find('img').classes()).toContain('v-img__img--cover');
    expect(wrapper.attributes('style')).toContain('max-width: 250px');
    expect(wrapper.classes()).toContain('rounded-lg');
  });

  it('sets the default slot over the image', () => {
    const wrapper = mountWithVuetify(FrImage, {
      props: logo,
      slots: { default: () => h('span', { class: 'caption' }, 'Owl') },
    });

    expect(wrapper.find('.v-responsive__content .caption').text()).toBe('Owl');
  });

  it('shows the placeholder slot while the image loads', () => {
    const wrapper = mountWithVuetify(FrImage, {
      props: logo,
      slots: { placeholder: () => h('span', { class: 'loading' }, 'Loading') },
    });

    expect(wrapper.find('.v-img__placeholder .loading').text()).toBe('Loading');
  });

  it('shows the error slot, not the placeholder, when the image fails to load', async () => {
    const wrapper = mountWithVuetify(FrImage, {
      props: logo,
      slots: {
        placeholder: () => h('span', { class: 'loading' }, 'Loading'),
        error: () => h('span', { class: 'failed' }, 'No logo'),
      },
    });

    await wrapper.find('img').trigger('error');
    await flushPromises();

    expect(wrapper.find('.v-img__error .failed').text()).toBe('No logo');
    expect(wrapper.find('.loading').exists()).toBe(false);
  });

  it('keeps the placeholder when the image fails without an error slot', async () => {
    const wrapper = mountWithVuetify(FrImage, {
      props: logo,
      slots: { placeholder: () => h('span', { class: 'loading' }, 'Loading') },
    });

    await wrapper.find('img').trigger('error');
    await flushPromises();

    expect(wrapper.find('.v-img__error').exists()).toBe(false);
    expect(wrapper.find('.loading').exists()).toBe(true);
  });

  it('wraps the image in a <picture> with the sources slot, and only then', () => {
    const plain = mountWithVuetify(FrImage, { props: logo });
    const withSources = mountWithVuetify(FrImage, {
      props: logo,
      slots: { sources: () => h('source', { srcset: '/logo.webp', type: 'image/webp' }) },
    });

    expect(plain.find('picture').exists()).toBe(false);
    expect(withSources.find('picture.v-img__picture source').attributes('srcset')).toBe(
      '/logo.webp',
    );
    expect(withSources.find('picture img').attributes('src')).toBe('/logo.png');
  });

  it('reports a click', async () => {
    const onClick = vi.fn();
    const wrapper = mountWithVuetify(FrImage, { props: logo, attrs: { onClick } });

    await wrapper.trigger('click');

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrImage, {
      props: logo,
      attrs: { class: 'mx-auto', 'data-test': 'logo' },
    });

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-img', 'fr-image', 'mx-auto']));
    expect(wrapper.attributes('data-test')).toBe('logo');
  });
});
