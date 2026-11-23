<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get FrPageTitle's
  props, with `title` required, and its actions slot. GlobalComponentsUsage.vue covers the global
  registration
-->
<script setup lang="ts">
import { FrPageTitle } from '../../src';
</script>

<template>
  <fr-page-title title="Manage Plants" tag="h2">
    <template #actions>Add</template>
  </fr-page-title>

  <!-- @vue-expect-error title is required -->
  <fr-page-title />
  <fr-page-title title="Plants">
    <!-- @vue-expect-error its only slot is actions -->
    <template #subtitle>Herbs</template>
  </fr-page-title>
</template>
