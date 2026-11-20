<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get FrDialog's props,
  v-model and slots on an imported FrDialog. GlobalComponentsUsage.vue covers the global
  registration
-->
<script setup lang="ts">
import { ref } from 'vue';
import { FrBtn, FrDialog } from '../../src';

const open = ref(false);
</script>

<template>
  <fr-dialog
    id="edit-planting"
    v-model="open"
    title="Edit planting"
    subtitle="Tomato"
    closable
    dividers
    size="large"
    max-width="50vw"
    persistent
    scrollable
  >
    <template #activator="{ props, isActive }">
      <fr-btn v-bind="props" :text="isActive ? 'Open' : 'Edit'" />
    </template>
    Body
    <template #actions><fr-btn text="Save" @click="open = false" /></template>
  </fr-dialog>

  <!-- @vue-expect-error size is small, medium or large -->
  <fr-dialog size="huge" />
  <!-- @vue-expect-error closable is a boolean -->
  <fr-dialog :closable="'yes'" />
</template>
