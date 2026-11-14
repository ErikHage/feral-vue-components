import { createApp, defineComponent, h } from 'vue';
import { createComponentsPlugin, FeralComponents } from '../../src/plugin';

describe('createComponentsPlugin', () => {
  it('registers each component globally under its name', () => {
    const Dummy = defineComponent({ render: () => h('i') });
    const app = createApp({ render: () => null });

    app.use(createComponentsPlugin({ FrDummy: Dummy }));

    expect(app.component('FrDummy')).toBe(Dummy);
  });
});

describe('FeralComponents', () => {
  it('installs without error', () => {
    expect(() => createApp({ render: () => null }).use(FeralComponents)).not.toThrow();
  });
});
