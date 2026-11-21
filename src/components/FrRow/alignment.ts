import type { PropType } from 'vue';

const alignValues = ['start', 'end', 'center', 'baseline', 'stretch'] as const;
const justifyValues = [
  'start',
  'end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
] as const;
const alignContentValues = [...justifyValues, 'stretch'] as const;

/** How an FrRow lines its columns up across the row (CSS align-items) */
export type FrRowAlign = (typeof alignValues)[number];
/** How an FrRow spreads its columns along the row (CSS justify-content) */
export type FrRowJustify = (typeof justifyValues)[number];
/** How an FrRow spreads its lines of columns once they wrap (CSS align-content) */
export type FrRowAlignContent = (typeof alignContentValues)[number];

/** A string prop limited to `values`, typed as their union and checked at runtime, as VRow did */
function oneOf<T extends string>(values: readonly T[]) {
  return {
    // Through unknown: TypeScript will not narrow String to a generic T directly
    type: String as unknown as PropType<T>,
    default: undefined,
    validator: (value: string) => (values as readonly string[]).includes(value),
  };
}

/**
 * VRow's alignment props, each also at sm and up. Vuetify 4 deprecates them on VRow in favour of
 * its utility classes, so FrRow declares them itself and renders the classes instead
 */
export const frRowAlignmentProps = {
  align: oneOf(alignValues),
  alignSm: oneOf(alignValues),
  alignMd: oneOf(alignValues),
  alignLg: oneOf(alignValues),
  alignXl: oneOf(alignValues),
  alignXxl: oneOf(alignValues),
  justify: oneOf(justifyValues),
  justifySm: oneOf(justifyValues),
  justifyMd: oneOf(justifyValues),
  justifyLg: oneOf(justifyValues),
  justifyXl: oneOf(justifyValues),
  justifyXxl: oneOf(justifyValues),
  alignContent: oneOf(alignContentValues),
  alignContentSm: oneOf(alignContentValues),
  alignContentMd: oneOf(alignContentValues),
  alignContentLg: oneOf(alignContentValues),
  alignContentXl: oneOf(alignContentValues),
  alignContentXxl: oneOf(alignContentValues),
};

export type FrRowAlignmentProps = {
  [P in keyof typeof frRowAlignmentProps]?: (typeof frRowAlignmentProps)[P] extends {
    type: PropType<infer T>;
  }
    ? T
    : never;
};

const prefixes = [
  ['alignContent', 'align-content'],
  ['align', 'align'],
  ['justify', 'justify'],
] as const;

/**
 * Vuetify's utility class for each alignment prop given, named as VRow names it: `align-center`,
 * `justify-md-space-between`, `align-content-xxl-stretch`
 */
export function alignmentClasses(props: FrRowAlignmentProps): string[] {
  return Object.entries(props).flatMap(([name, value]) => {
    if (value == null) return [];
    const [prop, prefix] = prefixes.find(([key]) => name.startsWith(key))!;
    const breakpoint = name.slice(prop.length).toLowerCase();
    return [[prefix, breakpoint, value].filter(Boolean).join('-')];
  });
}
