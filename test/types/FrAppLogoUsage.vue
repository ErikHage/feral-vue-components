<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get FrAppLogo's one
  prop. GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { FrAppLogo } from '../../src';
</script>

<template>
  <fr-app-logo />
  <fr-app-logo :size="22" />

  <!-- @vue-expect-error size is a number of pixels -->
  <fr-app-logo size="large" />
  <fr-app-logo>
    <!-- @vue-expect-error it has no slots -->
    <template #default>Feral</template>
  </fr-app-logo>
</template>
