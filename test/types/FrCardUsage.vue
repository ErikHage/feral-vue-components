<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VCard's props on
  an imported FrCard, and its own slots. GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { FrCard } from '../../src';
</script>

<template>
  <fr-card
    title="Imported"
    subtitle="Sub"
    prepend-icon="mdi-sprout"
    variant="outlined"
    :elevation="4"
    @click="() => {}"
  >
    <template #title>Slot title</template>
    <template #prepend>Star</template>
    <template #append>Menu</template>
    Body
    <template #actions>Save</template>
  </fr-card>

  <!-- @vue-expect-error not one of VCard's variants -->
  <fr-card variant="not-a-variant" />
  <fr-card>
    <!-- @vue-expect-error FrCard's slots are its own: VCard's loader slot is not one of them -->
    <template #loader>Loading</template>
  </fr-card>
</template>
