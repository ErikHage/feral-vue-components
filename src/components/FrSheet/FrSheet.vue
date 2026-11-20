<script setup lang="ts">
import type { PropType } from 'vue';
import { VSheet } from 'vuetify/components/VSheet';
import { frSheetDefaults } from './defaults';
import { type FrSheetPadding, frSheetPaddingClasses } from './padding';

defineOptions({ name: 'FrSheet' });

const props = defineProps({
  /** The space around the content: 'default' (16px), 'small' (8px) or 'none' */
  padding: { type: String as PropType<FrSheetPadding>, default: 'default' },
});
</script>

<!--
  Padding is a prop, not a default class: a caller's own pa-2 beside a default pa-4 would not win,
  since which of two utility classes applies is down to the stylesheet's order, not the caller's.
  The caller's other attributes (elevation, color, border, height...) fall through onto VSheet
  after the defaults, so the caller wins. The slot is passed on only when given, so an empty sheet
  holds nothing, not an empty slot's placeholder nodes
-->
<template>
  <v-sheet v-bind="frSheetDefaults" :class="['fr-sheet', frSheetPaddingClasses[props.padding]]">
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </v-sheet>
</template>
