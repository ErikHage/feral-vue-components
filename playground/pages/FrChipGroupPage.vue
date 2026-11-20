<script setup lang="ts">
import { ref } from 'vue';

const tags = [
  'Tall',
  'Climbing',
  'Perennial',
  'Shade',
  'Edible',
  'Fragrant',
  'Pollinator',
  'Evergreen',
];
const picked = ref<string[]>(['Climbing', 'Edible']);
const one = ref('Shade');
</script>

<template>
  <h2 class="text-h5 mb-4">FrChipGroup</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VChipGroup</code>, holding <code>FrChip</code>s. No defaults. It hands its
    <code>color</code>, <code>variant</code>, <code>filter</code> and <code>disabled</code> down to
    its chips.
  </p>
  <h3 class="text-subtitle-1 mb-2">
    multiple, column, filter, color primary ({{ picked.join(', ') }})
  </h3>
  <fr-chip-group v-model="picked" multiple column filter color="primary">
    <fr-chip v-for="tag in tags" :key="tag" :value="tag" :text="tag" />
  </fr-chip-group>
  <h3 class="text-subtitle-1 mt-6 mb-2">No column: one row that scrolls ({{ one }})</h3>
  <div style="max-width: 360px">
    <fr-chip-group v-model="one" mandatory variant="outlined" color="success">
      <fr-chip v-for="tag in tags" :key="tag" :value="tag" :text="tag" />
    </fr-chip-group>
  </div>
  <h3 class="text-subtitle-1 mt-6 mb-2">disabled, column (as on the plant edit page)</h3>
  <fr-chip-group column disabled>
    <fr-chip v-for="tag in tags.slice(0, 3)" :key="tag" :text="tag" />
  </fr-chip-group>
</template>
