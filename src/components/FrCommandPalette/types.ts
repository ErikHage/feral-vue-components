/** One thing FrCommandPalette can find. Other fields ride along, and come back with `select` */
export interface FrCommandPaletteItem {
  /** Names it: unique among the palette's items */
  value: string;
  /** Its text, searched first */
  title: string;
  /** A second line under the title, searched too */
  description?: string;
  /** Its icon: `mdi-leaf` */
  icon?: string;
  /** The heading it is grouped under, searched too. Items without one come ungrouped */
  section?: string;
  [field: string]: unknown;
}

/** One thing a source found */
export interface FrCommandPaletteResult {
  /** Names it: unique among its source's results */
  value: string;
  title: string;
  description?: string;
  icon?: string;
  /** An address the host may open for it */
  href?: string;
  [field: string]: unknown;
}

type Answer = FrCommandPaletteResult[] | null | undefined;

/**
 * Results the palette asks for as the user types, such as records from a server: shown under
 * `section`, ahead of the items while the search is empty and after them once something is typed
 */
export interface FrCommandPaletteSource {
  /** The heading its results are grouped under */
  section: string;
  /** What to show while nothing is typed: recent records, say */
  suggest?: (this: FrCommandPaletteSource, query: string) => Answer | Promise<Answer>;
  /** What matches the search, which is trimmed and never empty */
  search?: (this: FrCommandPaletteSource, query: string) => Answer | Promise<Answer>;
  /** What to do when one of its results is picked; left to the host's `select` handler */
  select?: (result: FrCommandPaletteResult) => void;
}

/** A source's result as the palette lists it, and as `select` reports it */
export interface FrCommandPaletteSourceItem extends FrCommandPaletteItem {
  /** `source-<index of the source>:<the result's value>` */
  value: string;
  section: string;
  type: 'result';
  source: FrCommandPaletteSource;
  result: FrCommandPaletteResult;
}
