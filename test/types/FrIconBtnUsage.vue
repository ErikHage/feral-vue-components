<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VBtn's props on
  an imported FrIconBtn, with `icon` and `label` required. GlobalComponentsUsage.vue covers the
  global registration
-->
<script setup lang="ts">
import { FrIconBtn } from '../../src';
</script>

<template>
  <fr-icon-btn icon="mdi-pencil" label="Edit Tomato" color="primary" @click="() => {}" />

  <!-- @vue-expect-error label is required: it names the button for screen readers -->
  <fr-icon-btn icon="mdi-pencil" />
  <!-- @vue-expect-error icon is required -->
  <fr-icon-btn label="Edit" />
  <!-- @vue-expect-error not one of VBtn's variants -->
  <fr-icon-btn icon="mdi-pencil" label="Edit" variant="not-a-variant" />
  <fr-icon-btn icon="mdi-pencil" label="Edit">
    <!-- @vue-expect-error it shows only its icon, so it takes no slots -->
    <template #default>Edit</template>
  </fr-icon-btn>
</template>
