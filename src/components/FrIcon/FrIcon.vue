<script setup lang="ts">
import { VIcon } from 'vuetify/components/VIcon';

defineOptions({ name: 'FrIcon' });
</script>

<!--
  The caller's attributes (icon, size, color, start, end, @click...) fall through onto VIcon.
  VIcon reads the icon's name from the slot's text, ahead of the icon prop. The slot is passed on
  only when given, as FrDivider's is, so an icon named by its prop renders no empty slot
-->
<template>
  <v-icon class="fr-icon">
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </v-icon>
</template>
