<script setup lang="ts">
import { ref } from 'vue';

const clicks = ref(0);
const loading = ref(false);

function load() {
  loading.value = true;
  setTimeout(() => (loading.value = false), 1500);
}
</script>

<template>
  <h2 class="text-headline-small mb-4">FrBtn</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VBtn</code>. Default: <code>rounded="lg"</code>; it stays Vuetify's elevated button.
    Its slots are its own: the label as the default slot, in place of <code>text</code>, and
    <code>prepend</code> and <code>append</code>, in place of their icons.
  </p>
  <div class="d-flex flex-wrap align-center ga-4 mb-6">
    <fr-btn text="Default" />
    <fr-btn color="primary" text="Primary" />
    <fr-btn color="error" text="Error" />
    <fr-btn color="primary" size="small" text="Small" />
    <fr-btn variant="text" text="Text variant" />
    <fr-btn variant="tonal" color="primary" text="Tonal" />
    <fr-btn color="primary" rounded="0" text="rounded 0" />
  </div>
  <div class="d-flex flex-wrap align-center ga-4">
    <fr-btn color="primary" prepend-icon="mdi-content-save" text="Prepend icon" />
    <fr-btn color="primary" append-icon="mdi-chevron-right" text="Append icon" />
    <fr-btn color="success" @click="clicks++">
      Default slot: <strong class="ml-1">{{ clicks }} clicks</strong>
    </fr-btn>
    <fr-btn color="secondary" text="Prepend slot">
      <template #prepend><span class="text-title-large">🌱</span></template>
    </fr-btn>
    <fr-btn icon="mdi-sprout" color="primary" aria-label="Sprout" />
    <fr-btn color="primary" :loading="loading" text="Loading" @click="load" />
  </div>
</template>
