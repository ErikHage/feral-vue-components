import FrCommandPaletteComponent from './FrCommandPalette.vue';
import type { FrCommandPaletteItem, FrCommandPaletteSource } from './types';

export type {
  FrCommandPaletteItem,
  FrCommandPaletteResult,
  FrCommandPaletteSource,
  FrCommandPaletteSourceItem,
} from './types';

export interface FrCommandPaletteProps {
  /** Shown */
  open?: boolean;
  /** What it searches: views, actions... */
  items?: FrCommandPaletteItem[];
  /** Where it asks for more results as the user types, such as a server's records */
  sources?: FrCommandPaletteSource[];
  'onUpdate:open'?: (value: boolean) => void;
  /** An item or a source's result was picked; the palette closes */
  onSelect?: (item: FrCommandPaletteItem) => void;
}

/**
 * A search over `items` and `sources` in a dialog at the top of the page, bound with
 * `v-model:open`. Every word typed must match an item's title, description or section, best
 * matches first, grouped by section. Up and Down move the highlight, Enter picks, Escape closes; a
 * pick is reported through `select`. A source's results come back as FrCommandPaletteSourceItems
 */
export const FrCommandPalette = FrCommandPaletteComponent as unknown as new () => {
  $props: FrCommandPaletteProps;
  $slots: Record<never, never>;
};
