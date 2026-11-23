<script setup lang="ts">
import { VTable } from 'vuetify/components/VTable';
import { frTableDefaults } from './defaults';

defineOptions({ name: 'FrTable' });

// Declared so it stops here: falling through, it would become the table's HTML title attribute
const props = defineProps({
  title: { type: String, default: undefined },
});

/** The slots FrTable passes on, each only when given. top goes into the header bar instead */
const slotNames = ['caption', 'default', 'bottom'];

function forwarded(slots: Record<string, unknown>): string[] {
  return slotNames.filter((name) => name in slots);
}
</script>

<!--
  The caller's attributes (density, hover, striped, height, fixed-header...) fall through onto
  VTable after the defaults, so the caller wins; VTable moves aria-label onto its inner <table>.
  Each slot is passed on only when given: VTable marks itself has-top or has-bottom for any top or
  bottom slot, and without a default slot it builds no <table> at all. Given a title, top or
  actions, FrTable builds VTable's top itself: a bar padded as a card's title is, with the title
  and the top content on the left and the actions on the right
-->
<template>
  <v-table class="fr-table" v-bind="frTableDefaults">
    <template v-if="props.title != null || $slots.top || $slots.actions" #top>
      <div class="fr-table__header d-flex align-center justify-start">
        <div v-if="props.title != null" class="fr-table__title text-title-large">
          {{ props.title }}
        </div>
        <slot name="top" />
        <div v-if="$slots.actions" class="fr-table__actions d-flex align-center ga-2 ms-auto">
          <slot name="actions" />
        </div>
      </div>
    </template>
    <template v-for="name in forwarded($slots)" #[name]>
      <slot :name="name" />
    </template>
  </v-table>
</template>

<style>
/* VCardItem's padding, so a table's heading lines up with a card's title and with its own cells */
.fr-table__header {
  padding: 0.625rem 1rem;
  gap: 0.5rem;
}
</style>
