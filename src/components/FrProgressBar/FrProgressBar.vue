<script setup lang="ts">
import { VProgressLinear } from 'vuetify/components/VProgressLinear';

defineOptions({ name: 'FrProgressBar' });
</script>

<!--
  The caller's attributes (v-model, indeterminate, color, height, buffer-value, striped...) fall
  through onto VProgressLinear. The slot is passed on only when given: VProgressLinear draws a
  content layer over the bar for any slot it is handed
-->
<template>
  <v-progress-linear class="fr-progress-bar">
    <template v-if="$slots.default" #default="scope">
      <slot v-bind="scope" />
    </template>
  </v-progress-linear>
</template>
