/** One of the app's own actions in FrAppShell's command palette, reported through `command` */
export interface FrAppShellCommand {
  /** Names it: what `command` reports */
  value: string;
  /** Its text, searched first */
  title: string;
  /** A second line under the title, searched too */
  description?: string;
  /** Its icon: `mdi-leaf` */
  icon?: string;
  /** The heading it is grouped under: ACTIONS unless given */
  section?: string;
}
