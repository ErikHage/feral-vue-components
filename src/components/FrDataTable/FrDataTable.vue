<script setup lang="ts">
import { VDataTable } from 'vuetify/components/VDataTable';
import { frDataTableDefaults } from './defaults';

defineOptions({ name: 'FrDataTable' });

/**
 * The slots FrDataTable passes on: content that goes inside a cell or header Vuetify renders, so
 * it never needs a Vuetify component. Row and body slots, which do, are not passed on. top goes
 * on as it is only without actions: with them, it goes into the header bar
 */
function isForwarded(name: string, slots: Record<string, unknown>): boolean {
  return (
    name.startsWith('item.') ||
    name.startsWith('header.') ||
    name === 'no-data' ||
    name === 'loading' ||
    (name === 'top' && !('actions' in slots))
  );
}

function forwarded(slots: Record<string, unknown>): string[] {
  return Object.keys(slots).filter((name) => isForwarded(name, slots));
}
</script>

<!--
  The caller's attributes (headers, items, item-value, loading, v-model...) fall through onto
  VDataTable after the defaults, so the caller wins. Only the slots the caller gives are passed on.
  Given actions, FrDataTable builds VDataTable's top itself: a bar with the top content on the left
  and the actions on the right. top is given no scope either way
-->
<template>
  <v-data-table class="fr-data-table" v-bind="frDataTableDefaults">
    <template v-if="$slots.actions" #top>
      <div class="fr-data-table__header d-flex align-center justify-start">
        <slot name="top" />
        <div class="fr-data-table__actions d-flex align-center ga-2 ms-auto">
          <slot name="actions" />
        </div>
      </div>
    </template>
    <template v-for="name in forwarded($slots)" #[name]="scope">
      <slot v-if="name === 'top'" name="top" />
      <slot v-else :name="name" v-bind="scope ?? {}" />
    </template>
  </v-data-table>
</template>
