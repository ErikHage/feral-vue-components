<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get FrGrid's props.
  GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { FrCard, FrGrid } from '../../src';
</script>

<template>
  <fr-grid :min-item-width="200" :max-columns="3" gap="small" align="center" uniform-rows>
    <fr-card title="North bed" />
    <fr-card title="Greenhouse" />
  </fr-grid>
  <fr-grid :weights="[2, 1]" :min-row-height="120" :stretch="false" />

  <!-- @vue-expect-error gap is 'small' or unset -->
  <fr-grid gap="large" />
  <!-- @vue-expect-error not one of the alignments -->
  <fr-grid align="middle" />
  <!-- @vue-expect-error weights are numbers -->
  <fr-grid :weights="['2', '1']" />
</template>
