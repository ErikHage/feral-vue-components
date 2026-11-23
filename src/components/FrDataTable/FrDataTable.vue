<script setup lang="ts">
import { VDataTable } from 'vuetify/components/VDataTable';
import { frDataTableDefaults } from './defaults';

defineOptions({ name: 'FrDataTable' });

// Declared so it stops here: falling through, it would become the table's HTML title attribute
const props = defineProps({
  title: { type: String, default: undefined },
});

/**
 * The slots FrDataTable passes on: content that goes inside a cell or header Vuetify renders, so
 * it never needs a Vuetify component. Row and body slots, which do, are not passed on. top goes
 * into the header bar instead
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
  VDataTable after the defaults, so the caller wins. Only the slots the caller gives are passed on.
  Given a title, top or actions, FrDataTable builds VDataTable's top itself: a bar padded as a
  card's title is, with the title and the top content on the left and the actions on the right.
  top is given no scope
-->
<template>
  <v-data-table class="fr-data-table" v-bind="frDataTableDefaults">
    <template v-if="props.title != null || $slots.top || $slots.actions" #top>
      <div class="fr-data-table__header d-flex align-center justify-start">
        <div v-if="props.title != null" class="fr-data-table__title text-title-large">
          {{ props.title }}
        </div>
        <slot name="top" />
        <div v-if="$slots.actions" class="fr-data-table__actions d-flex align-center ga-2 ms-auto">
          <slot name="actions" />
        </div>
      </div>
    </template>
    <template v-for="name in forwarded($slots)" #[name]="scope">
      <slot :name="name" v-bind="scope ?? {}" />
    </template>
  </v-data-table>
</template>

<style>
/* VCardItem's padding, so a table's heading lines up with a card's title and with its own cells */
.fr-data-table__header {
  padding: 0.625rem 1rem;
  gap: 0.5rem;
}
</style>
