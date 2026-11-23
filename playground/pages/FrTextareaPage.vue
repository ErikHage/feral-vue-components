<script setup lang="ts">
import { ref } from 'vue';

const notes = ref('Sowed two rows.\nWatered in.');
</script>

<template>
  <h2 class="text-headline-small mb-4">FrTextarea</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VTextarea</code>. Defaults: <code>variant="solo"</code>,
    <code>density="compact"</code>, <code>rounded="lg"</code>, as <code>FrTextField</code>.
  </p>
  <fr-row>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">rows="4", as the comment dialogs use it</h3>
      <fr-textarea v-model="notes" label="Comment (optional)" :rows="4" />
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">auto-grow, counter</h3>
      <fr-textarea label="Journal entry..." :rows="2" auto-grow counter />
    </fr-col>
  </fr-row>
</template>
