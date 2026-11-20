<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VFileInput's
  props on an imported FrFileField, and its own selection slot. GlobalComponentsUsage.vue covers
  the global registration
-->
<script setup lang="ts">
import { ref } from 'vue';
import { FrFileField } from '../../src';

const files = ref<File[]>([]);
</script>

<template>
  <fr-file-field v-model="files" label="Seed list" accept=".csv" multiple chips>
    <template #selection="{ fileNames, totalBytesReadable }">
      {{ fileNames.join(', ') }} ({{ totalBytesReadable }})
    </template>
  </fr-file-field>

  <!-- @vue-expect-error not one of VFileInput's variants -->
  <fr-file-field variant="not-a-variant" />
  <fr-file-field>
    <!-- @vue-expect-error FrFileField's slots are its own: VFileInput's counter slot is not one -->
    <template #counter>3</template>
  </fr-file-field>
</template>
