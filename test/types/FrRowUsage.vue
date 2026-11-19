<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VRow's props
  and FrRow's spacing on an imported FrRow. GlobalComponentsUsage.vue covers the global
  registration
-->
<script setup lang="ts">
import { FrRow } from '../../src';
</script>

<template>
  <fr-row align="center" justify="space-between" density="compact">
    <v-col>Content</v-col>
  </fr-row>
  <fr-row spacing="none"><v-col>Flush</v-col></fr-row>

  <!-- @vue-expect-error spacing is 'default' or 'none' -->
  <fr-row spacing="huge" />
  <!-- @vue-expect-error justify is one of VRow's justifications -->
  <fr-row justify="sideways" />
</template>
