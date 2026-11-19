<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VChipGroup's
  types on an imported FrChipGroup. GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { ref } from 'vue';
import { FrChip, FrChipGroup } from '../../src';

const tags = ref<string[]>([]);
</script>

<template>
  <fr-chip-group v-model="tags" multiple column color="primary" filter>
    <template #default="{ isSelected }">
      <fr-chip value="tall" :text="isSelected('tall') ? 'Tall!' : 'Tall'" />
    </template>
  </fr-chip-group>

  <!-- @vue-expect-error not one of VChipGroup's variants -->
  <fr-chip-group variant="not-a-variant" />
</template>
