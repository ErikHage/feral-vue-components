/** The colours named for what they mean */
export const TONES = ['primary', 'success', 'info', 'warning', 'danger', 'neutral'] as const;

/** The colours named for how they look, from Vuetify's palette */
export const HUES = [
  'red',
  'orange',
  'amber',
  'green',
  'teal',
  'cyan',
  'blue',
  'indigo',
  'purple',
  'deep-purple',
  'pink',
  'grey',
  'blue-grey',
] as const;

export type FrTone = (typeof TONES)[number];
export type FrHue = (typeof HUES)[number];

/**
 * The Vuetify colour each feral colour name is drawn in, where they differ. The feral themes call
 * danger `error`, and neutral takes no colour at all
 */
const VUETIFY_COLORS: Record<string, string | undefined> = {
  danger: 'error',
  neutral: undefined,
  contrast: 'white',
};

const appColors = new Set<string>();

/** Adds an app's own colour names, such as those its theme defines, to those isColor accepts */
export function registerColors(names: string[]): void {
  names.forEach((name) => appColors.add(name));
}

/** Whether the value names a tone, a hue or one of the app's registered colours */
export function isColor(value: string): boolean {
  return (
    (TONES as readonly string[]).includes(value) ||
    (HUES as readonly string[]).includes(value) ||
    appColors.has(value)
  );
}

/** The colour to hand Vuetify for a feral colour name; any other name is passed on as it is */
export function vuetifyColor(color: string | undefined): string | undefined {
  return color !== undefined && Object.hasOwn(VUETIFY_COLORS, color)
    ? VUETIFY_COLORS[color]
    : color;
}
