<script setup lang="ts">
import { ref } from 'vue';

const clicks = ref(0);
</script>

<template>
  <h2 class="text-h5 mb-4">FrIcon</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VIcon</code>. No defaults. Name the icon in its default slot, as the apps do, or
    with <code>icon</code>.
  </p>
  <h3 class="text-subtitle-1 mb-2">Default slot, and the icon prop</h3>
  <div class="d-flex align-center ga-4 mb-6">
    <fr-icon>mdi-sprout</fr-icon>
    <fr-icon icon="mdi-watering-can" />
    <fr-icon icon="$close" />
  </div>
  <h3 class="text-subtitle-1 mb-2">Sizes and colours</h3>
  <div class="d-flex align-center ga-4 mb-6">
    <fr-icon size="x-small">mdi-leaf</fr-icon>
    <fr-icon size="small" color="primary">mdi-leaf</fr-icon>
    <fr-icon color="success">mdi-leaf</fr-icon>
    <fr-icon size="large" color="warning">mdi-leaf</fr-icon>
    <fr-icon :size="48" color="error">mdi-leaf</fr-icon>
  </div>
  <h3 class="text-subtitle-1 mb-2">start, beside text</h3>
  <p class="mb-6"><fr-icon start>mdi-calendar</fr-icon>Planted 3 May</p>
  <h3 class="text-subtitle-1 mb-2">
    Clickable (clicked <span id="clicks">{{ clicks }}</span> times)
  </h3>
  <div class="d-flex align-center ga-4">
    <fr-icon size="small" aria-label="Edit" @click="clicks++">mdi-pencil</fr-icon>
    <fr-icon size="small" aria-label="Delete" disabled @click="clicks++">mdi-delete</fr-icon>
  </div>
</template>
