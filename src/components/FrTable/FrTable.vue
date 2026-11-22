<script setup lang="ts">
import { VTable } from 'vuetify/components/VTable';
import { frTableDefaults } from './defaults';

defineOptions({ name: 'FrTable' });

/** The slots FrTable passes on, each only when given */
const slotNames = ['top', 'caption', 'default', 'bottom'];

function forwarded(slots: Record<string, unknown>): string[] {
  // With actions, top goes into the header bar instead of straight to VTable
  return slotNames.filter((name) => name in slots && !(name === 'top' && 'actions' in slots));
}
</script>

<!--
  The caller's attributes (density, hover, striped, height, fixed-header...) fall through onto
  VTable after the defaults, so the caller wins; VTable moves aria-label onto its inner <table>.
  Each slot is passed on only when given: VTable marks itself has-top or has-bottom for any top or
  bottom slot, and without a default slot it builds no <table> at all. Given actions, FrTable
  builds VTable's top itself: a bar with the top content on the left and the actions on the right
-->
<template>
  <v-table class="fr-table" v-bind="frTableDefaults">
    <template v-if="$slots.actions" #top>
      <div class="fr-table__header d-flex align-center justify-start">
        <slot name="top" />
        <div class="fr-table__actions d-flex align-center ga-2 ms-auto">
          <slot name="actions" />
        </div>
      </div>
    </template>
    <template v-for="name in forwarded($slots)" #[name]>
      <slot :name="name" />
    </template>
  </v-table>
</template>
