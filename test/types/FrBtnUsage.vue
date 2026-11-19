<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VBtn's props on
  an imported FrBtn, and its own slots. GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { FrBtn } from '../../src';
</script>

<template>
  <fr-btn
    color="primary"
    size="small"
    prepend-icon="mdi-content-save"
    :loading="false"
    @click="() => {}"
  >
    Save
    <template #append>!</template>
  </fr-btn>

  <!-- @vue-expect-error not one of VBtn's variants -->
  <fr-btn variant="not-a-variant" />
  <fr-btn>
    <!-- @vue-expect-error FrBtn's slots are its own: VBtn's loader slot is not one of them -->
    <template #loader>Wait</template>
  </fr-btn>
</template>
