import { HUES, TONES, isColor, registerColors, vuetifyColor } from '../../src/utils/colors';

describe('colors', () => {
  it.each([...TONES, ...HUES])('knows %s as a colour', (color) => {
    expect(isColor(color)).toBe(true);
  });

  it("knows an app's colours once it registers them", () => {
    expect(isColor('soil')).toBe(false);

    registerColors(['soil', 'moss']);

    expect(isColor('soil')).toBe(true);
    expect(isColor('moss')).toBe(true);
    expect(isColor('sky')).toBe(false);
  });

  it.each([
    ['danger', 'error'],
    ['neutral', undefined],
    ['contrast', 'white'],
    ['primary', 'primary'],
    ['teal', 'teal'],
    ['constructor', 'constructor'],
    [undefined, undefined],
  ])('hands Vuetify %j as %j', (color, expected) => {
    expect(vuetifyColor(color)).toBe(expected);
  });
});
