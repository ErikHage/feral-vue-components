import { defineComponent, h } from 'vue';
import { useTheme } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { createFeralVuetifyOptions, feralDark, feralLight } from '../../src';
import { mountWithVuetify } from './helpers/mount';

describe('createFeralVuetifyOptions', () => {
  it('defaults to the feral dark theme, with both feral themes defined', () => {
    const options = createFeralVuetifyOptions();

    expect(options.theme).toEqual({
      defaultTheme: 'feralDark',
      themes: { feralDark, feralLight },
    });
  });

  it('uses the mdi icon set', () => {
    expect(createFeralVuetifyOptions().icons).toEqual({
      defaultSet: 'mdi',
      aliases,
      sets: { mdi },
    });
  });

  it('merges overrides deeply, keeping what they do not name', () => {
    const options = createFeralVuetifyOptions({
      theme: {
        defaultTheme: 'feralLight',
        themes: { feralLight: { colors: { primary: '#123456' } } },
      },
    });

    expect(options.theme).toEqual({
      defaultTheme: 'feralLight',
      themes: { feralDark, feralLight: { dark: false, colors: { primary: '#123456' } } },
    });
    expect(options.icons).toEqual(createFeralVuetifyOptions().icons);
  });

  it('replaces non-object values, such as arrays, rather than merging them', () => {
    const variations = { colors: ['primary'], lighten: 1, darken: 1 };

    const options = createFeralVuetifyOptions({ theme: { variations } });

    expect(options.theme).toMatchObject({ variations });
  });

  it('does not change the exported themes when overridden', () => {
    createFeralVuetifyOptions({
      theme: { themes: { feralDark: { colors: { primary: '#000' } } } },
    });

    expect(feralDark).toEqual({ dark: true, colors: {} });
  });
});

describe('a Vuetify app built from the feral options', () => {
  const ThemeProbe = defineComponent({
    setup() {
      const theme = useTheme();
      return () => h('span', `${theme.name.value} ${String(theme.current.value.dark)}`);
    },
  });

  it('starts on the feral dark theme', () => {
    expect(mountWithVuetify(ThemeProbe).text()).toBe('feralDark true');
  });

  it('fills unset colours from Vuetify’s own dark theme', () => {
    const wrapper = mountWithVuetify(
      defineComponent({
        setup() {
          const theme = useTheme();
          return () => h('span', String(theme.current.value.colors.primary));
        },
      }),
    );

    expect(wrapper.text()).toBe('#2196F3');
  });
});
