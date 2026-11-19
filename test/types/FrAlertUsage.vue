<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VAlert's props on
  an imported FrAlert, and its own slots. GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { ref } from 'vue';
import { FrAlert } from '../../src';

const shown = ref(true);
</script>

<template>
  <fr-alert v-model="shown" title="Imported" type="warning" closable>
    <template #title>Slot title</template>
    Body
  </fr-alert>

  <!-- @vue-expect-error not one of VAlert's types -->
  <fr-alert type="not-a-type" />
  <fr-alert>
    <!-- @vue-expect-error FrAlert's slots are its own: VAlert's prepend slot is not one of them -->
    <template #prepend>Icon</template>
  </fr-alert>
</template>
