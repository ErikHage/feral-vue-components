import type { VListItem } from 'vuetify/components/VList';

type VListItemProps = InstanceType<typeof VListItem>['$props'];

/** One link in FrAppNavigationDrawer */
export interface FrAppNavigationItem {
  /** Names the item: matched against `activeView`, and its element's id is `nav-<value>` */
  value: string;
  /** Its text, and its tooltip on the rail */
  title: string;
  /** A second line under the title */
  subtitle?: string;
  /** Its icon, the only thing shown on the rail: `mdi-leaf` */
  icon?: string;
  /** A route to go to, as RouterLink's `to` */
  to?: VListItemProps['to'];
  /** An outside address, opened in a new tab */
  href?: string;
}

/** A group of FrAppNavigationDrawer's items, under a heading that collapses it */
export interface FrAppNavigationSection {
  /** Its heading. A section without one has no heading and can't be collapsed */
  label?: string;
  items: FrAppNavigationItem[];
}
