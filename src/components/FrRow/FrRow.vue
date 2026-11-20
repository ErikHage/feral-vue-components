<script setup lang="ts">
import type { PropType } from 'vue';
import { VRow } from 'vuetify/components/VGrid';
import type { FrRowSpacing } from './spacing';

type VRowProps = InstanceType<typeof VRow>['$props'];

defineOptions({ name: 'FrRow' });

// Runtime declarations, so align and justify keep VRow's own types without the compiler
// resolving them; VRow checks their values itself
const props = defineProps({
  align: { type: String as PropType<VRowProps['align']>, default: undefined },
  justify: { type: String as PropType<VRowProps['justify']>, default: undefined },
  /** 'none' removes the gutters between columns; anything else keeps them and marks fr-row */
  spacing: { type: String as PropType<FrRowSpacing>, default: 'default' },
});
</script>

<!--
  The caller's other attributes (density, tag...) fall through onto VRow. Its one slot holds the
  columns
-->
<template>
  <v-row
    :align="props.align"
    :justify="props.justify"
    :no-gutters="props.spacing === 'none'"
    :class="{ 'fr-row': props.spacing !== 'none' }"
  >
    <slot />
  </v-row>
</template>
