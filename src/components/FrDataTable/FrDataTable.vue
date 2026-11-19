<script setup lang="ts">
import { VDataTable } from 'vuetify/components/VDataTable';
import { frDataTableDefaults } from './defaults';

defineOptions({ name: 'FrDataTable' });

/**
 * The slots FrDataTable passes on: content that goes inside a cell or header Vuetify renders, so
 * it never needs a Vuetify component. Row and body slots, which do, are not passed on
 */
function isForwarded(name: string): boolean {
  return (
    name.startsWith('item.') ||
    name.startsWith('header.') ||
    name === 'no-data' ||
    name === 'loading'
  );
}

function forwarded(slots: Record<string, unknown>): string[] {
  return Object.keys(slots).filter(isForwarded);
}
</script>

<!--
  The caller's attributes (headers, items, item-value, loading, v-model...) fall through onto
  VDataTable after the defaults, so the caller wins. Only the slots the caller gives are passed on
-->
<template>
  <v-data-table class="fr-data-table" v-bind="frDataTableDefaults">
    <template v-for="name in forwarded($slots)" #[name]="scope">
      <slot :name="name" v-bind="scope ?? {}" />
    </template>
  </v-data-table>
</template>
