<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VSpacer's types
  on an imported FrSpacer. GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { FrSpacer } from '../../src';
</script>

<template>
  <fr-spacer />
  <fr-spacer tag="span" class="d-none d-sm-block" />

  <!-- @vue-expect-error tag is an element's name -->
  <fr-spacer :tag="3" />
</template>
