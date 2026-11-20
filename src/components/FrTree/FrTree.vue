<script setup lang="ts">
import { VTreeview } from 'vuetify/components/VTreeview';
import { frTreeDefaults } from './defaults';

defineOptions({ name: 'FrTree' });

/**
 * The slots FrTree passes on, each only when given: the parts of each row, the rows themselves,
 * and what shows when there are none. Not default, which VTreeview's types leave out: given one,
 * it renders that in place of the rows built from items
 */
const slotNames = [
  'prepend',
  'title',
  'subtitle',
  'append',
  'toggle',
  'header',
  'footer',
  'item',
  'divider',
  'subheader',
  'no-data',
];

function forwarded(slots: Record<string, unknown>): string[] {
  return slotNames.filter((name) => name in slots);
}
</script>

<!--
  The caller's attributes (items, item-title, item-value, v-model:opened, v-model:activated,
  selectable, open-on-click...) fall through onto VTreeview after the defaults, so the caller
  wins. Each slot is passed on only when given: VTreeview draws its own title, toggle, divider and
  no-data row for any it isn't handed, and renders an item slot in place of the whole row
-->
<template>
  <v-treeview class="fr-tree" v-bind="frTreeDefaults">
    <template v-for="name in forwarded($slots)" #[name]="scope">
      <slot :name="name" v-bind="scope" />
    </template>
  </v-treeview>
</template>
