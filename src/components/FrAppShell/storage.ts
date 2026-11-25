import { frThemeMenuOptions, type FrThemeMenuValue } from '../FrThemeMenu/options';

/** What FrAppShell keeps in localStorage, each under the app's prefix */
export const storageKeys = (prefix: string) => ({
  drawerRail: `${prefix}.drawerRail`,
  collapsedSections: `${prefix}.collapsedSections`,
  slashShortcut: `${prefix}.slashShortcut`,
  theme: `${prefix}.theme`,
});

/** Whether the rail was collapsed, or `defaultRail` if never set */
export function readDrawerRail(prefix: string, defaultRail: boolean): boolean {
  const stored = localStorage.getItem(storageKeys(prefix).drawerRail);
  return stored === null ? defaultRail : stored === 'true';
}

/** The labels of the sections collapsed; none if never set, or if what is stored is not a list */
export function readCollapsedSections(prefix: string): string[] {
  try {
    const stored: unknown = JSON.parse(
      localStorage.getItem(storageKeys(prefix).collapsedSections) ?? '[]',
    );
    return Array.isArray(stored) ? stored.filter((label) => typeof label === 'string') : [];
  } catch {
    return [];
  }
}

/** Whether `/` focuses the search: on unless turned off */
export function readSlashShortcut(prefix: string): boolean {
  return localStorage.getItem(storageKeys(prefix).slashShortcut) !== 'false';
}

/** The theme the user picked, or null if they never did or what is stored is not a theme */
export function readThemePreference(prefix: string): FrThemeMenuValue | null {
  const stored = localStorage.getItem(storageKeys(prefix).theme);
  return frThemeMenuOptions.find((option) => option.value === stored)?.value ?? null;
}

/** Whether the event comes from somewhere the user types, where `/` is a character */
export function isTyping(target: EventTarget | null): boolean {
  const element = target as HTMLElement | null;
  return Boolean(
    element &&
    (element.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName)),
  );
}
