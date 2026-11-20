/** A tab's value: what v-model holds while it is selected */
export type FrTabsValue = string | number;

/**
 * One tab: a string is both its title and its value; an object gives them apart, and may add an
 * icon before the title or disable the tab
 */
export type FrTabsOption =
  | string
  | {
      title: string;
      value: FrTabsValue;
      prependIcon?: string;
      disabled?: boolean;
    };

/** What FrTabs' default slot is given */
export interface FrTabsSlotScope {
  /** The selected tab's value */
  tab: FrTabsValue | undefined;
}
