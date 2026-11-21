import type { PropType } from 'vue';

const alignSelfValues = ['auto', 'start', 'end', 'center', 'baseline', 'stretch'] as const;

/** How an FrCol lines itself up across its row, overriding the row's align (CSS align-self) */
export type FrColAlignSelf = (typeof alignSelfValues)[number];

/** Where an FrCol sits in its row: 0 to 12, 'first' or 'last' have a class behind them */
const order = { type: [String, Number] as PropType<string | number>, default: undefined };

/**
 * VCol's order and align-self props, order also at sm and up. Vuetify 4 deprecates them on VCol in
 * favour of its utility classes, so FrCol declares them itself and renders the classes instead
 */
export const frColPlacementProps = {
  order,
  orderSm: order,
  orderMd: order,
  orderLg: order,
  orderXl: order,
  orderXxl: order,
  alignSelf: {
    type: String as PropType<FrColAlignSelf>,
    default: undefined,
    // Checked as VCol checked it, so a bad value still warns
    validator: (value: string) => (alignSelfValues as readonly string[]).includes(value),
  },
};

export interface FrColPlacementProps {
  order?: string | number;
  orderSm?: string | number;
  orderMd?: string | number;
  orderLg?: string | number;
  orderXl?: string | number;
  orderXxl?: string | number;
  alignSelf?: FrColAlignSelf;
}

/**
 * Vuetify's utility class for each placement prop given: `order-2`, `order-md-first`,
 * `align-self-center`. VCol also rendered a stray `order--2` for the bare `order`, which no rule
 * matches; FrCol leaves it out
 */
export function placementClasses(props: FrColPlacementProps): string[] {
  return Object.entries(props).flatMap(([name, value]) => {
    if (value == null || value === '') return [];
    if (name === 'alignSelf') return [`align-self-${value}`];
    const breakpoint = name.slice('order'.length).toLowerCase();
    return [breakpoint ? `order-${breakpoint}-${value}` : `order-${value}`];
  });
}
