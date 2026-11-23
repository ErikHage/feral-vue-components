<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VTextField's
  props and events on an imported FrTextField. GlobalComponentsUsage.vue covers the global
  registration
-->
<script setup lang="ts">
import { ref } from 'vue';
import { FrTextField } from '../../src';

const name = ref('');
const shown = ref(false);
</script>

<template>
  <fr-text-field
    v-model="name"
    label="Name"
    :type="shown ? 'text' : 'password'"
    :append-icon="shown ? 'mdi-eye' : 'mdi-eye-off'"
    counter
    clearable
    @click:append="shown = !shown"
  />

  <!-- @vue-expect-error not one of VTextField's variants -->
  <fr-text-field variant="not-a-variant" />
  <fr-text-field>
    <!-- @vue-expect-error VTextField's slots are not passed on -->
    <template #append-inner>!</template>
  </fr-text-field>
</template>
