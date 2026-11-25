import { reactive } from 'vue';

/**
 * The options of the FrAppShell the playground runs in (App.vue), which FrAppShell's page
 * changes, so the shell around every page is the one being demonstrated
 */
export const shellOptions = reactive({
  /** Bound to the shell's `search`, or left out (undefined) for the Search... button */
  searchBox: false,
  search: '',
  pinnedFooter: false,
  railLocked: false,
  fixedDrawer: false,
  /** What the shell's `command` event last reported */
  lastCommand: '',
});
