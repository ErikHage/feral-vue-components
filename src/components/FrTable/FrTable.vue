<script setup lang="ts">
import { VTable } from 'vuetify/components/VTable';
import { frTableDefaults } from './defaults';

defineOptions({ name: 'FrTable' });

/** The slots FrTable passes on, each only when given */
const slotNames = ['top', 'caption', 'default', 'bottom'];

function forwarded(slots: Record<string, unknown>): string[] {
  return slotNames.filter((name) => name in slots);
}
</script>

<!--
  The caller's attributes (density, hover, striped, height, fixed-header...) fall through onto
  VTable after the defaults, so the caller wins; VTable moves aria-label onto its inner <table>.
  Each slot is passed on only when given: VTable marks itself has-top or has-bottom for any top or
  bottom slot, and without a default slot it builds no <table> at all
-->
<template>
  <v-table class="fr-table" v-bind="frTableDefaults">
    <template v-for="name in forwarded($slots)" #[name]>
      <slot :name="name" />
    </template>
  </v-table>
</template>
