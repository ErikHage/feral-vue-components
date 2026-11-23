<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get FrPage's title,
  VContainer's props and its slots. GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { FrPage } from '../../src';
</script>

<template>
  <fr-page title="Manage Plants" :max-width="1200">
    <template #actions>Add</template>
    Content
  </fr-page>

  <!-- @vue-expect-error fluid is a boolean -->
  <fr-page :fluid="'yes'" />
  <!-- @vue-expect-error title is a string -->
  <fr-page :title="3" />
</template>
