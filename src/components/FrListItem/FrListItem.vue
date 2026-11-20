<script setup lang="ts">
import { VListItem } from 'vuetify/components/VList';

defineOptions({ name: 'FrListItem' });

/** VListItem's slots, each passed on only when given */
const slotNames = ['prepend', 'title', 'subtitle', 'default', 'append'];

function forwarded(slots: Record<string, unknown>): string[] {
  return slotNames.filter((name) => name in slots);
}
</script>

<!--
  The caller's attributes (title, subtitle, prepend-icon, to, value, rounded, @click...) fall
  through onto VListItem. Each slot is passed on only when given: VListItem draws a title,
  subtitle, prepend or append area for any slot it is handed, and an empty title or subtitle slot
  would blank the title and subtitle props
-->
<template>
  <v-list-item class="fr-list-item">
    <template v-for="name in forwarded($slots)" #[name]="scope">
      <slot :name="name" v-bind="scope" />
    </template>
  </v-list-item>
</template>
