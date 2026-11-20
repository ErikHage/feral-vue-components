/** A record's date: a date string, a timestamp or a Date */
export type FrTimelineDate = string | number | Date;

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
const DAY_MS = 24 * 60 * 60 * 1000;

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

/**
 * The local day a date falls on, as YYYY-MM-DD, or undefined for a date that can't be read. A
 * date-only string is that day as it stands: `new Date('2026-05-01')` would read it as UTC
 * midnight, which is the day before anywhere west of Greenwich
 */
export function dayOf(date: FrTimelineDate): string | undefined {
  if (typeof date === 'string' && DATE_ONLY.test(date)) return date;
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return undefined;
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/**
 * Days from one YYYY-MM-DD day to a later one. Both parse as UTC midnight, which has no summer
 * time, so the answer is always whole
 */
export function daysApart(earlier: string, later: string): number {
  return (Date.parse(later) - Date.parse(earlier)) / DAY_MS;
}
