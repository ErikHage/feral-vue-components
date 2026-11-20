<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VBreadcrumbs'
  props on an imported FrBreadcrumbs, and its divider slot typed by the items.
  GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { FrBreadcrumbs } from '../../src';

const crumbs = [
  { title: 'Home', href: '/' },
  { title: 'Tomato', href: '/plants/tomato' },
];
</script>

<template>
  <fr-breadcrumbs :items="crumbs" density="compact" divider=">" />
  <fr-breadcrumbs :items="crumbs">
    <template #divider="{ item, index }">{{ index }} after {{ item.title }}</template>
  </fr-breadcrumbs>

  <!-- @vue-expect-error density is one of VBreadcrumbs' densities -->
  <fr-breadcrumbs density="not-a-density" />
  <fr-breadcrumbs :items="crumbs">
    <template #divider="{ item }">
      <!-- @vue-expect-error the divider slot is typed by the items, which have no 'colour' -->
      {{ item.colour }}
    </template>
  </fr-breadcrumbs>
  <fr-breadcrumbs>
    <!-- @vue-expect-error FrBreadcrumbs' slots are its own: VBreadcrumbs' item slot is not one -->
    <template #item>Nope</template>
  </fr-breadcrumbs>
</template>
