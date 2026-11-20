<script setup lang="ts">
import { ref } from 'vue';

const rail = ref(true);
</script>

<template>
  <h2 class="text-h5 mb-4">FrTooltip</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VTooltip</code>. No defaults. Its content is the <code>text</code> prop, or the
    default slot in its place.
  </p>
  <fr-row>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">
        As the nav drawer uses it: text, location end, disabled unless the rail is shown
      </h3>
      <fr-toggle v-model="rail" label="Rail shown" hide-details />
      <fr-tooltip text="Plantings" location="end" :disabled="!rail">
        <template #activator="{ props }">
          <fr-btn id="nav" v-bind="props" icon="mdi-sprout" aria-label="Plantings" />
        </template>
      </fr-tooltip>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">Default slot in place of text, on top</h3>
      <fr-tooltip location="top">
        <template #activator="{ props }">
          <fr-btn id="copy" v-bind="props" prepend-icon="mdi-content-copy" text="Copy link" />
        </template>
        <span id="rich">Copy to clipboard: <kbd>ctrl</kbd>+<kbd>c</kbd></span>
      </fr-tooltip>
    </fr-col>
  </fr-row>
</template>
