<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get
  VSkeletonLoader's types on an imported FrSkeleton. GlobalComponentsUsage.vue covers the global
  registration
-->
<script setup lang="ts">
import { ref } from 'vue';
import { FrSkeleton } from '../../src';

const loading = ref(true);
</script>

<template>
  <fr-skeleton type="heading, paragraph" elevation="2" max-width="600" class="mx-auto" />
  <fr-skeleton :loading="loading" :type="['card', 'actions']" boilerplate>
    <p>Loaded</p>
  </fr-skeleton>

  <!-- @vue-expect-error loading is a boolean -->
  <fr-skeleton :loading="'yes'" />
</template>
