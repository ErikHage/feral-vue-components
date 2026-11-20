<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VTooltip's types
  on an imported FrTooltip. GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { FrBtn, FrTooltip } from '../../src';
</script>

<template>
  <fr-tooltip text="Copy the link" location="end" :open-delay="300">
    <template #activator="{ props }">
      <fr-btn v-bind="props" icon="mdi-content-copy" />
    </template>
  </fr-tooltip>
  <fr-tooltip>
    <template #activator="{ props, isActive }">
      <fr-btn v-bind="props" :text="isActive ? 'Open' : 'Shut'" />
    </template>
    <strong>Rich content</strong>
  </fr-tooltip>

  <!-- @vue-expect-error disabled is a boolean -->
  <fr-tooltip :disabled="'yes'" />
</template>
