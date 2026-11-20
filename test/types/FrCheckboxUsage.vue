<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VCheckbox's
  props on an imported FrCheckbox, v-model included, and its own label slot.
  GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { ref } from 'vue';
import { FrCheckbox } from '../../src';

const climbing = ref(false);
const picked = ref<number[]>([]);
</script>

<template>
  <fr-checkbox v-model="climbing" label="Climbing" :disabled="false" />
  <fr-checkbox v-model="picked" :value="3" color="primary">
    <template #label>Planting <strong>3</strong></template>
  </fr-checkbox>

  <!-- @vue-expect-error density is one of VCheckbox's densities -->
  <fr-checkbox density="not-a-density" />
  <fr-checkbox>
    <!-- @vue-expect-error FrCheckbox's slots are its own: VCheckbox's input slot is not one -->
    <template #input>Nope</template>
  </fr-checkbox>
</template>
