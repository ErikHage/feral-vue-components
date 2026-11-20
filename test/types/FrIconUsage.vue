<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VIcon's types on
  an imported FrIcon. GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { FrIcon } from '../../src';

function edit() {}
</script>

<template>
  <fr-icon>mdi-sprout</fr-icon>
  <fr-icon icon="mdi-pencil" size="small" color="primary" start aria-label="Edit" @click="edit" />

  <!-- @vue-expect-error start is a boolean -->
  <fr-icon :start="'yes'" />
</template>
