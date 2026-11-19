<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VContainer's
  types on an imported FrContainer. GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { FrContainer } from '../../src';
</script>

<template>
  <fr-container fluid :max-width="800" tag="main">Content</fr-container>

  <!-- @vue-expect-error fluid is a boolean -->
  <fr-container :fluid="'yes'" />
</template>
