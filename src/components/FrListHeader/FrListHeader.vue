<script setup lang="ts">
import { VListSubheader } from 'vuetify/components/VList';

defineOptions({ name: 'FrListHeader' });
</script>

<!--
  The caller's attributes (title, color, inset, sticky...) fall through onto VListSubheader. The
  slot is passed on only when given: VListSubheader shows its title only without one, so an
  always-present slot would blank every header given a title
-->
<template>
  <v-list-subheader class="fr-list-header">
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </v-list-subheader>
</template>
