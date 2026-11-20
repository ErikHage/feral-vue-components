<script setup lang="ts">
const crumbs = [
  { title: 'Home', href: '#/fr-breadcrumbs' },
  { title: 'Plantings', href: '#/fr-breadcrumbs' },
  { title: 'Tomato' },
];
</script>

<template>
  <h2 class="text-h5 mb-4">FrBreadcrumbs</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VBreadcrumbs</code>. Its dividers are chevrons unless you pass <code>divider</code>,
    shown as text, or fill the <code>divider</code> slot, which gets the item before it and its
    index. The last item is disabled, as in Vuetify.
  </p>
  <h3 class="text-subtitle-1">Default: chevrons</h3>
  <fr-breadcrumbs :items="crumbs" />
  <h3 class="text-subtitle-1 mt-4">divider="/"</h3>
  <fr-breadcrumbs :items="crumbs" divider="/" />
  <h3 class="text-subtitle-1 mt-4">Divider slot</h3>
  <fr-breadcrumbs :items="crumbs">
    <template #divider="{ index }">
      <span class="text-medium-emphasis text-caption">{{ index + 1 }} →</span>
    </template>
  </fr-breadcrumbs>
  <h3 class="text-subtitle-1 mt-4">VBreadcrumbs props: icon, color, density compact</h3>
  <fr-breadcrumbs :items="crumbs" icon="mdi-sprout" color="primary" density="compact" />
</template>
