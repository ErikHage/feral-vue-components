<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove an imported FrCodeBlock takes
  its slot and the <pre>'s attributes. It has no props, and vue-tsc doesn't reject an unknown
  slot on a component that declares its slots with defineSlots, so there is no expected error.
  GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { FrCodeBlock } from '../../src';
</script>

<template>
  <fr-code-block id="example" class="mb-4">npm install @feral-auth/vue-components</fr-code-block>
</template>
