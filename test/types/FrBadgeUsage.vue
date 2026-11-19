<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VBadge's props
  on an imported FrBadge, and its own slots. GlobalComponentsUsage.vue covers the global
  registration
-->
<script setup lang="ts">
import { FrBadge } from '../../src';
</script>

<template>
  <fr-badge :content="3" color="error" :max="99" location="bottom start">
    Inbox
    <template #badge>new</template>
  </fr-badge>

  <!-- @vue-expect-error content is a number or a string -->
  <fr-badge :content="{ count: 3 }" />
  <fr-badge>
    <!-- @vue-expect-error FrBadge's slots are its own: there is no title slot -->
    <template #title>Nope</template>
  </fr-badge>
</template>
