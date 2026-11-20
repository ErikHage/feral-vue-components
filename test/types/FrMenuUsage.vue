<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VMenu's types
  and slots on an imported FrMenu. GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { ref } from 'vue';
import { FrBtn, FrList, FrListItem, FrMenu } from '../../src';

const open = ref(false);
</script>

<template>
  <fr-menu v-model="open" location="end" :close-on-content-click="false" open-on-hover>
    <template #activator="{ props, isActive }">
      <fr-btn v-bind="props" :text="isActive ? 'Close' : 'Actions'" />
    </template>
    <template #default="{ isActive }">
      <fr-list>
        <fr-list-item title="Done" @click="isActive.value = false" />
      </fr-list>
    </template>
  </fr-menu>

  <!-- @vue-expect-error open-on-hover is a boolean -->
  <fr-menu :open-on-hover="'yes'" />
</template>
