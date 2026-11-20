<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VListItem's
  types and slots on an imported FrListItem. GlobalComponentsUsage.vue covers the global
  registration
-->
<script setup lang="ts">
import { FrList, FrListItem } from '../../src';

function remove() {}
</script>

<template>
  <fr-list>
    <fr-list-item title="Basil" subtitle="Herb" prepend-icon="mdi-leaf" rounded="lg" to="/plants" />
    <fr-list-item value="tomato" @click="remove">
      <template #prepend="{ isActive }">{{ isActive }}</template>
      <template #title="{ title }">{{ title }}</template>
      <template #subtitle="{ subtitle }">{{ subtitle }}</template>
      <template #default="{ isSelected }">{{ isSelected }}</template>
      <template #append="{ select }"><button @click="select(true)" /></template>
    </fr-list-item>
  </fr-list>

  <!-- @vue-expect-error not one of VListItem's variants -->
  <fr-list-item variant="wavy" />
</template>
