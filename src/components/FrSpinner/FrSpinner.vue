<script setup lang="ts">
import { VProgressCircular } from 'vuetify/components/VProgressCircular';

defineOptions({ name: 'FrSpinner' });

// A value given through v-model or model-value. A null or undefined one counts as none, so a
// spinner bound to progress that has not arrived yet spins until it does
function hasValue(attrs: Record<string, unknown>): boolean {
  return attrs.modelValue != null || attrs['model-value'] != null;
}
</script>

<!--
  It spins (`indeterminate`) unless given a value, which it shows as a ring instead. The caller's
  attributes (v-model, size, width, color, indeterminate...) fall through onto VProgressCircular
  after that default, so a caller's own `indeterminate` wins either way. `$attrs` is read in the
  template, not a computed, because attrs are not reactive. The slot is passed on only when given:
  VProgressCircular draws a content layer in the ring for any slot it is handed
-->
<template>
  <v-progress-circular :indeterminate="!hasValue($attrs)" class="fr-spinner">
    <template v-if="$slots.default" #default="scope">
      <slot v-bind="scope" />
    </template>
  </v-progress-circular>
</template>
