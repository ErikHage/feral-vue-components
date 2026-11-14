<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VCard's types
  on FrCard, both imported and as the globally registered <fr-card>
-->
<script setup lang="ts">
import { FrCard } from '../../src';
</script>

<template>
  <FrCard title="Imported" variant="outlined" :elevation="4" @click="() => {}">
    <template #actions>Save</template>
  </FrCard>
  <fr-card title="Global" rounded="xl" />

  <!-- @vue-expect-error not one of VCard's variants -->
  <FrCard variant="not-a-variant" />
  <!-- @vue-expect-error not one of VCard's variants, on the global registration -->
  <fr-card variant="not-a-variant" />
</template>
