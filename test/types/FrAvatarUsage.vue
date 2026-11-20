<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VAvatar's props
  on an imported FrAvatar, and its own slots. GlobalComponentsUsage.vue covers the global
  registration
-->
<script setup lang="ts">
import { FrAvatar } from '../../src';
</script>

<template>
  <fr-avatar image="/plot.png" size="large" color="primary" badge>
    EH
    <template #badge>3</template>
  </fr-avatar>

  <!-- @vue-expect-error not one of VAvatar's variants -->
  <fr-avatar variant="not-a-variant" />
  <fr-avatar>
    <!-- @vue-expect-error FrAvatar's slots are its own: there is no title slot -->
    <template #title>Nope</template>
  </fr-avatar>
</template>
