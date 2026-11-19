<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VDivider's types
  on an imported FrDivider. GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { FrDivider } from '../../src';
</script>

<template>
  <fr-divider class="my-4" :thickness="2" inset />
  <fr-divider>or</fr-divider>

  <!-- @vue-expect-error not one of VDivider's variants -->
  <fr-divider variant="wavy" />
</template>
