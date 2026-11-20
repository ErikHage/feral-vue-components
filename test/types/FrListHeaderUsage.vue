<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get
  VListSubheader's types on an imported FrListHeader. GlobalComponentsUsage.vue covers the global
  registration
-->
<script setup lang="ts">
import { FrList, FrListHeader } from '../../src';
</script>

<template>
  <fr-list-header>Herbs</fr-list-header>
  <fr-list-header title="Fruit" color="primary" inset sticky />
  <fr-list :items="[{ type: 'subheader', title: 'Herbs' }]">
    <template #subheader="{ props }"><fr-list-header v-bind="props" /></template>
  </fr-list>

  <!-- @vue-expect-error sticky is a boolean -->
  <fr-list-header :sticky="'yes'" />
</template>
