<script setup lang="ts">
import { VSwitch } from 'vuetify/components/VSwitch';
import { frToggleDefaults } from './defaults';

defineOptions({ name: 'FrToggle' });

/** The slots FrToggle passes on: content only, each passed on only when given */
const slotNames = ['label', 'prepend', 'append', 'thumb', 'track-true', 'track-false'];

function forwarded(slots: Record<string, unknown>): string[] {
  return slotNames.filter((name) => name in slots);
}
</script>

<!--
  The caller's attributes (v-model, label, color, base-color, inset, hide-details...) fall through
  onto VSwitch after the defaults, so the caller wins. Each slot is passed on only when given:
  VSwitch shows its label prop only without a label slot, draws the prepend and append areas for
  any slot it is handed, and replaces the thumb's icon with an empty thumb slot
-->
<template>
  <v-switch class="fr-toggle" v-bind="frToggleDefaults">
    <template v-for="name in forwarded($slots)" #[name]="scope">
      <slot :name="name" v-bind="scope" />
    </template>
  </v-switch>
</template>
