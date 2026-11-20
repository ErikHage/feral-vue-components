<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VSlider's props
  on an imported FrSlider, and its own slots. GlobalComponentsUsage.vue covers the global
  registration
-->
<script setup lang="ts">
import { ref } from 'vue';
import { FrIcon, FrSlider } from '../../src';

const spacing = ref(30);
</script>

<template>
  <fr-slider
    v-model="spacing"
    :min="10"
    :max="90"
    :step="5"
    :ticks="{ 10: 'Tight', 90: 'Wide' }"
    show-ticks="always"
    thumb-label
    color="success"
  >
    <template #label>Spacing</template>
    <template #prepend><fr-icon>mdi-minus</fr-icon></template>
    <template #append><fr-icon>mdi-plus</fr-icon></template>
    <template #thumb-label="{ modelValue }">{{ modelValue.toFixed(0) }} cm</template>
    <template #tick-label="{ tick, index }">{{ index }} {{ tick.label }}</template>
  </fr-slider>

  <!-- @vue-expect-error not one of VSlider's densities -->
  <fr-slider density="tight" />
  <fr-slider>
    <!-- @vue-expect-error FrSlider's slots are its own: VSlider's details slot is not one -->
    <template #details>Details</template>
  </fr-slider>
</template>
