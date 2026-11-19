<script setup lang="ts">
import { VBreadcrumbs } from 'vuetify/components/VBreadcrumbs';
import { VIcon } from 'vuetify/components/VIcon';

defineOptions({ name: 'FrBreadcrumbs' });

// Declared so FrBreadcrumbs decides what a divider shows: VBreadcrumbs' own default is '/'
const props = defineProps<{ divider?: string }>();
</script>

<!--
  The caller's other attributes (items, color, density...) fall through onto VBreadcrumbs. Every
  divider is FrBreadcrumbs' own: the divider slot, else the divider prop as text, else a chevron
  ($next, chevron-right in the mdi set createFeralVuetifyOptions configures)
-->
<template>
  <v-breadcrumbs class="fr-breadcrumbs">
    <template #divider="scope">
      <slot name="divider" v-bind="scope">
        <template v-if="props.divider != null">{{ props.divider }}</template>
        <v-icon v-else icon="$next" />
      </slot>
    </template>
  </v-breadcrumbs>
</template>
