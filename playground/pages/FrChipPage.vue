<script setup lang="ts">
import { ref } from 'vue';

const shown = ref(true);
const picked = ref('basil');
</script>

<template>
  <h2 class="text-headline-small mb-4">FrChip</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VChip</code>. No defaults: it stays Vuetify's pill. Its slots are its own: the label
    as the default slot, in place of <code>text</code>, which gets the chip's selection state in a
    group, and <code>prepend</code> and <code>append</code>.
  </p>
  <div class="d-flex flex-wrap align-center ga-3 mb-6">
    <fr-chip text="Default" />
    <fr-chip color="primary" text="Primary" />
    <fr-chip color="success" size="small" text="Small" />
    <fr-chip color="primary" variant="outlined" text="Outlined" />
    <fr-chip color="warning" variant="flat" text="Flat" />
    <fr-chip color="primary" prepend-icon="mdi-sprout" text="Prepend icon" />
    <fr-chip color="primary" text="Prepend slot">
      <template #prepend><span class="mr-1">🌱</span></template>
    </fr-chip>
    <fr-chip color="primary">Default slot: <strong class="ml-1">bold</strong></fr-chip>
    <fr-chip v-if="shown" v-model="shown" color="error" text="Closable" closable />
    <fr-btn v-else size="small" text="Bring the closable chip back" @click="shown = true" />
  </div>
  <h3 class="text-body-large mb-2">
    In a chip group, the default slot gets the selection ({{ picked }})
  </h3>
  <fr-chip-group v-model="picked" mandatory>
    <fr-chip v-for="plant in ['tomato', 'basil', 'squash']" :key="plant" :value="plant" filter>
      <template #default="{ isSelected }">
        {{ plant }}{{ isSelected ? ' (picked)' : '' }}
      </template>
    </fr-chip>
  </fr-chip-group>
</template>
