<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VTextarea's
  props on an imported FrTextarea. GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { ref } from 'vue';
import { FrTextarea } from '../../src';

const notes = ref('');
</script>

<template>
  <fr-textarea v-model="notes" label="Notes" :rows="4" auto-grow counter />

  <!-- @vue-expect-error rows is a number or a numeric string, not a boolean -->
  <fr-textarea :rows="true" />
  <fr-textarea>
    <!-- @vue-expect-error VTextarea's slots are not passed on -->
    <template #counter>!</template>
  </fr-textarea>
</template>
