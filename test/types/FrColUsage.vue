<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VCol's types on
  an imported FrCol. GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { FrCol } from '../../src';
</script>

<template>
  <v-row>
    <fr-col cols="12" md="6" :lg="4" offset-md="1" align-self="center">Content</fr-col>
  </v-row>

  <!-- @vue-expect-error align-self is one of VCol's alignments -->
  <fr-col align-self="sideways" />
</template>
