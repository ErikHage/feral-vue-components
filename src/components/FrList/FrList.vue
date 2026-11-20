<script setup lang="ts">
import { VList } from 'vuetify/components/VList';
import { frListDefaults } from './defaults';

defineOptions({ name: 'FrList' });

/**
 * The slots that customise the rows VList builds from `items`. Each is passed on only when
 * given: VList draws its own title, divider, subheader... for any it isn't handed
 */
const itemSlots = ['title', 'subtitle', 'prepend', 'append', 'header', 'subheader', 'divider'];

function forwarded(slots: Record<string, unknown>): string[] {
  return itemSlots.filter((name) => name in slots);
}
</script>

<!--
  The caller's attributes (items, lines, nav, v-model:selected...) fall through onto VList after
  the defaults, so the caller wins. The default slot is passed on only when given: VList renders
  `items` only without one, so an always-present slot would empty every list built from items
-->
<template>
  <v-list class="fr-list" v-bind="frListDefaults">
    <template v-if="$slots.default" #default>
      <slot />
    </template>
    <template v-for="name in forwarded($slots)" #[name]="scope">
      <slot :name="name" v-bind="scope" />
    </template>
  </v-list>
</template>
