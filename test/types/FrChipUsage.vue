<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VChip's props on
  an imported FrChip, and its own slots. GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { FrChip } from '../../src';
</script>

<template>
  <fr-chip text="Tomato" color="primary" size="small" closable prepend-icon="mdi-sprout" />
  <fr-chip value="basil">
    <template #default="{ isSelected }">{{ isSelected ? 'Picked' : 'Basil' }}</template>
    <template #append>!</template>
  </fr-chip>

  <!-- @vue-expect-error not one of VChip's variants -->
  <fr-chip variant="not-a-variant" />
  <fr-chip>
    <!-- @vue-expect-error FrChip's slots are its own: VChip's close slot is not one of them -->
    <template #close>x</template>
  </fr-chip>
</template>
