<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VSheet's props
  and FrSheet's padding on an imported FrSheet. GlobalComponentsUsage.vue covers the global
  registration
-->
<script setup lang="ts">
import { FrSheet } from '../../src';
</script>

<template>
  <fr-sheet elevation="2" height="30vh" padding="small" color="surface-variant">Plants</fr-sheet>
  <fr-sheet padding="none" :rounded="0" border tag="section" />

  <!-- @vue-expect-error padding is 'default', 'small' or 'none' -->
  <fr-sheet padding="large" />
  <!-- @vue-expect-error not one of VSheet's positions -->
  <fr-sheet position="floating" />
</template>
