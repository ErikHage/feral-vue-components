<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VImg's types and
  slots on an imported FrImage. GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { FrImage } from '../../src';

function open() {}
</script>

<template>
  <fr-image src="/logo.png" alt="Logo" max-width="500" class="mx-auto" @click="open" />
  <fr-image src="/plot.jpg" cover :aspect-ratio="16 / 9" rounded="lg">
    <template #placeholder>Loading</template>
    <template #error>No photo</template>
    <template #sources><source srcset="/plot.webp" type="image/webp" /></template>
    Bed 3
  </fr-image>

  <!-- @vue-expect-error cover is a boolean -->
  <fr-image :cover="'yes'" />
</template>
