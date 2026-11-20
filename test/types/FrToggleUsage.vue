<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VSwitch's props
  on an imported FrToggle, and its own slots. GlobalComponentsUsage.vue covers the global
  registration
-->
<script setup lang="ts">
import { ref } from 'vue';
import { FrIcon, FrToggle } from '../../src';

const enableEdit = ref(false);
</script>

<template>
  <fr-toggle v-model="enableEdit" color="success" base-color="error" inset hide-details>
    <template #label><fr-icon>mdi-lock</fr-icon></template>
    <template #thumb="{ icon }">{{ icon }}</template>
    <template #track-true="{ model }">{{ model.value ? 'On' : '' }}</template>
    <template #track-false>Off</template>
  </fr-toggle>

  <!-- @vue-expect-error not one of VSwitch's densities -->
  <fr-toggle density="tight" />
  <fr-toggle>
    <!-- @vue-expect-error FrToggle's slots are its own: VSwitch's loader slot is not one -->
    <template #loader>Loading</template>
  </fr-toggle>
</template>
