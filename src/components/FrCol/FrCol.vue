<script setup lang="ts">
import { computed } from 'vue';
import { VCol } from 'vuetify/components/VGrid';
import { frColPlacementProps, placementClasses } from './placement';

defineOptions({ name: 'FrCol' });

// The placement props are declared so they stop here: Vuetify 4 deprecates them on VCol, so FrCol
// renders their utility classes itself rather than relying on VCol to
const placement = defineProps(frColPlacementProps);

const classes = computed(() => ['fr-col', ...placementClasses(placement)]);
</script>

<!--
  The caller's other attributes (cols, sm, md, lg, offset...) fall through onto VCol. Its one slot
  is the column's content
-->
<template>
  <v-col :class="classes">
    <slot />
  </v-col>
</template>
