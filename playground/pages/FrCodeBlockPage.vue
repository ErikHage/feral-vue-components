<script setup lang="ts">
const snippet = `<fr-card title="Harvest" subtitle="Tomatoes">
  <p class="px-4">Three kilos this week.</p>
  <template #actions><fr-btn text="Save" /></template>
</fr-card>`;
</script>

<template>
  <h2 class="text-headline-small mb-4">FrCodeBlock</h2>
  <p class="text-medium-emphasis mb-6">
    A plain <code>&lt;pre&gt;</code>, not a Vuetify component. Its default slot is the code, shown
    exactly as written. Padded, rounded, scrolls sideways, on a faint background from the theme.
  </p>
  <h3 class="text-body-large mb-2">Text in the slot</h3>
  <fr-code-block class="mb-6">npm install @feral-auth/vue-components</fr-code-block>
  <h3 class="text-body-large mb-2">Several lines, from a string</h3>
  <fr-code-block class="mb-6">{{ snippet }}</fr-code-block>
  <h3 class="text-body-large mb-2">A long line scrolls sideways</h3>
  <fr-code-block class="mb-6">{{
    'const veryLongLine = "' + 'tomato, '.repeat(40) + '";'
  }}</fr-code-block>
  <h3 class="text-body-large mb-2">Overridden with style: padding 8px, no corners, a border</h3>
  <fr-code-block
    style="padding: 8px; border-radius: 0; border: 1px solid rgb(var(--v-theme-primary))"
    >npm test</fr-code-block
  >
</template>
