<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get
  VProgressLinear's types and slot on an imported FrProgressBar. GlobalComponentsUsage.vue covers
  the global registration
-->
<script setup lang="ts">
import { ref } from 'vue';
import { FrProgressBar } from '../../src';

const harvested = ref(12);
</script>

<template>
  <fr-progress-bar v-model="harvested" :max="48" color="success" height="20" rounded clickable>
    <template #default="{ value, buffer }">{{ Math.round(value) }}% ({{ buffer }})</template>
  </fr-progress-bar>
  <fr-progress-bar indeterminate color="primary" />

  <!-- @vue-expect-error indeterminate is a boolean -->
  <fr-progress-bar :indeterminate="'yes'" />
</template>
