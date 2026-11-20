<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get
  VFadeTransition's types on an imported FrFadeIn. GlobalComponentsUsage.vue covers the global
  registration
-->
<script setup lang="ts">
import { FrFadeIn } from '../../src';
</script>

<template>
  <fr-fade-in mode="out-in" hide-on-leave><p>Content</p></fr-fade-in>

  <!-- @vue-expect-error group is a boolean -->
  <fr-fade-in :group="'yes'" />
</template>
