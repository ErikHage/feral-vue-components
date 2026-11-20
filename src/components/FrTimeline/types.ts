/** What the `day` and `actions` slots are given */
export interface FrTimelineDayScope<Item> {
  /** The day shown, as YYYY-MM-DD */
  day: string;
  /** That day's records, in the order given */
  records: Item[];
}
