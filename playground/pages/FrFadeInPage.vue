<script setup lang="ts">
import { ref } from 'vue';

const shown = ref(true);
const key = ref(0);
</script>

<template>
  <h2 class="text-h5 mb-4">FrFadeIn</h2>
  <p class="text-medium-emphasis mb-6">
    Vuetify's <code>VFadeTransition</code> with <code>appear</code>: its content fades in when it
    first renders, as well as when it toggles.
  </p>
  <div class="d-flex ga-2 mb-4">
    <fr-btn :text="shown ? 'Hide' : 'Show'" @click="shown = !shown" />
    <fr-btn variant="tonal" text="Remount (fades in on render)" @click="key++" />
  </div>
  <div style="min-height: 140px">
    <fr-fade-in :key="key">
      <fr-card v-if="shown" title="Harvest" subtitle="Fades in and out">
        <p class="px-4 pb-4">Remounting shows the first-render fade that `appear` adds.</p>
      </fr-card>
    </fr-fade-in>
  </div>
</template>
