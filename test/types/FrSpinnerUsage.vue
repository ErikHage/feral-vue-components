<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get
  VProgressCircular's types and slot on an imported FrSpinner. GlobalComponentsUsage.vue covers the
  global registration
-->
<script setup lang="ts">
import { ref } from 'vue';
import { FrSpinner } from '../../src';

const progress = ref(40);
</script>

<template>
  <fr-spinner size="100" width="10" color="green" />
  <fr-spinner v-model="progress" :size="64">
    <template #default="{ value }">{{ Math.round(value) }}%</template>
  </fr-spinner>
  <fr-spinner indeterminate="disable-shrink" />

  <!-- @vue-expect-error not one of VProgressCircular's shapes -->
  <fr-spinner shape="square" />
</template>
