<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VCol's types, and
  FrCol's own order and align-self, on an imported FrCol. GlobalComponentsUsage.vue covers the
  global registration
-->
<script setup lang="ts">
import { FrCol } from '../../src';
</script>

<template>
  <v-row>
    <fr-col cols="12" md="6" :lg="4" offset-md="1" align-self="center">Content</fr-col>
    <fr-col order="first" :order-md="2" order-xxl="last">Ordered</fr-col>
  </v-row>

  <!-- @vue-expect-error align-self is one of VCol's alignments -->
  <fr-col align-self="sideways" />
  <!-- @vue-expect-error order is a column position, not an object -->
  <fr-col :order="{}" />
</template>
