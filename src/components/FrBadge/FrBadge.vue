<script setup lang="ts">
import { VBadge } from 'vuetify/components/VBadge';

defineOptions({ name: 'FrBadge' });
</script>

<!--
  The caller's attributes (content, color, dot, max, location...) fall through onto VBadge. The
  badge slot is passed on only when given: VBadge shows its content or icon only without one
-->
<template>
  <v-badge class="fr-badge">
    <slot />
    <template v-if="$slots.badge" #badge>
      <slot name="badge" />
    </template>
  </v-badge>
</template>
