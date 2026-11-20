import FrTimelineComponent from './FrTimeline.vue';

export type { FrTimelineDate } from './days';
export type { FrTimelineDayScope } from './types';

/**
 * A timeline of the days that have records, newest first, beside the shown day's records. Give
 * it `records` and `dateOf`, which reads a record's date (a date string, timestamp or Date) as the
 * local day it falls on. `v-model` holds the shown day, as YYYY-MM-DD; when it names no day with
 * records, the newest is shown and v-model told. Days more than one apart have a gap marked
 * between them. Slots: `day`, the shown day's content, and `actions`, beside its heading, are
 * both given the `day` and its `records`; `empty` shows when there are none. Generic over the
 * records' type, so the slots' records are typed as given
 */
export const FrTimeline = FrTimelineComponent;
