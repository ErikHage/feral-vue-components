import { createApp, defineComponent, h } from 'vue';
import { VCard } from 'vuetify/components';
import { FrCard } from '../../src';
import { createComponentsPlugin, FeralComponents } from '../../src/plugin';
import { mountWithVuetify } from './helpers/mount';

describe('createComponentsPlugin', () => {
  it('registers each component globally under its name', () => {
    const Dummy = defineComponent({ render: () => h('i') });
    const app = createApp({ render: () => null });

    app.use(createComponentsPlugin({ FrDummy: Dummy }));

    expect(app.component('FrDummy')).toBe(Dummy);
  });
});

describe('FeralComponents', () => {
  it('registers FrCard globally, so <fr-card> resolves in templates', () => {
    const wrapper = mountWithVuetify(defineComponent({ template: '<fr-card title="Global" />' }), {
      global: { plugins: [FeralComponents] },
    });

    expect(wrapper.findComponent(VCard).exists()).toBe(true);
    expect(wrapper.find('.v-card-title').text()).toBe('Global');
  });

  it('registers it under the name FrCard', () => {
    const app = createApp({ render: () => null }).use(FeralComponents);

    expect(app.component('FrCard')).toBe(FrCard);
  });
});
