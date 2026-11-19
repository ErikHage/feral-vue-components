<script setup lang="ts">
import { VDivider } from 'vuetify/components/VDivider';

defineOptions({ name: 'FrDivider' });
</script>

<!--
  The caller's attributes (vertical, inset, thickness, color, variant...) fall through onto
  VDivider. The slot is passed on only when given: with one, VDivider splits the line around its
  content, so an always-forwarded slot would turn every divider into an empty split one
-->
<template>
  <v-divider class="fr-divider">
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </v-divider>
</template>
