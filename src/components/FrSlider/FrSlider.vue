<script setup lang="ts">
import { VSlider } from 'vuetify/components/VSlider';
import { frSliderDefaults } from './defaults';

defineOptions({ name: 'FrSlider' });

/** The slots FrSlider passes on: content only, each passed on only when given */
const slotNames = ['label', 'prepend', 'append', 'thumb-label', 'tick-label'];

function forwarded(slots: Record<string, unknown>): string[] {
  return slotNames.filter((name) => name in slots);
}
</script>

<!--
  The caller's attributes (v-model, min, max, step, show-ticks, thumb-label, color...) fall
  through onto VSlider after the defaults, so the caller wins. Each slot is passed on only when
  given: VSlider draws a label area for any label or prepend slot, and an empty thumb-label or
  tick-label slot would blank the value it otherwise shows
-->
<template>
  <v-slider class="fr-slider" v-bind="frSliderDefaults">
    <template v-for="name in forwarded($slots)" #[name]="scope">
      <slot :name="name" v-bind="scope" />
    </template>
  </v-slider>
</template>
