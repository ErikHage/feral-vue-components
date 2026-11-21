<script setup lang="ts">
import { computed, type PropType } from 'vue';
import { VRow } from 'vuetify/components/VGrid';
import { alignmentClasses, frRowAlignmentProps } from './alignment';
import type { FrRowSpacing } from './spacing';

defineOptions({ name: 'FrRow' });

// The alignment props are declared so they stop here: Vuetify 4 deprecates them on VRow, so FrRow
// renders their utility classes itself rather than relying on VRow to
const { spacing, ...alignment } = defineProps({
  ...frRowAlignmentProps,
  /** 'none' removes the gutters between columns; anything else keeps them and marks fr-row */
  spacing: { type: String as PropType<FrRowSpacing>, default: 'default' },
});

const classes = computed(() => [...alignmentClasses(alignment), { 'fr-row': spacing !== 'none' }]);
</script>

<!--
  The caller's other attributes (density, tag...) fall through onto VRow. Its one slot holds the
  columns
-->
<template>
  <v-row :no-gutters="spacing === 'none'" :class="classes">
    <slot />
  </v-row>
</template>
