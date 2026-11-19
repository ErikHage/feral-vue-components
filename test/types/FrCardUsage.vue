<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VCard's types
  on an imported FrCard. GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { FrCard } from '../../src';
</script>

<template>
  <fr-card title="Imported" variant="outlined" :elevation="4" @click="() => {}">
    <template #actions>Save</template>
  </fr-card>

  <!-- @vue-expect-error not one of VCard's variants -->
  <fr-card variant="not-a-variant" />
</template>
