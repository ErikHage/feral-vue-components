<script setup lang="ts">
import { VAvatar } from 'vuetify/components/VAvatar';

defineOptions({ name: 'FrAvatar' });
</script>

<!--
  The caller's attributes (image, icon, text, size, color, badge...) fall through onto VAvatar.
  Each slot is passed on only when given: VAvatar shows its image, icon or text only without a
  default slot, and draws its badge as a dot only without a badge slot
-->
<template>
  <v-avatar class="fr-avatar">
    <template v-if="$slots.default" #default>
      <slot />
    </template>
    <template v-if="$slots.badge" #badge>
      <slot name="badge" />
    </template>
  </v-avatar>
</template>
