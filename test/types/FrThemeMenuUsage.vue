<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get FrThemeMenu's
  v-model, typed to its three themes. GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { ref } from 'vue';
import { FrThemeMenu, type FrThemeMenuValue } from '../../src';

const theme = ref<FrThemeMenuValue>('system');
const name = ref('dark');
</script>

<template>
  <fr-theme-menu id="theme" v-model="theme" />
  <fr-theme-menu model-value="light" @update:model-value="(value) => (theme = value)" />

  <!-- @vue-expect-error modelValue is required -->
  <fr-theme-menu />
  <!-- @vue-expect-error not one of the themes -->
  <fr-theme-menu model-value="sepia" />
  <!-- @vue-expect-error a plain string may be none of the themes -->
  <fr-theme-menu v-model="name" />
  <fr-theme-menu model-value="dark">
    <!-- @vue-expect-error it has no slots -->
    <template #default>Theme</template>
  </fr-theme-menu>
</template>
