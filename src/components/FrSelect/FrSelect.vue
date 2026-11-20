<script setup lang="ts">
import { VSelect } from 'vuetify/components/VSelect';
import { VListItem } from 'vuetify/components/VList';
import { frSelectDefaults } from './defaults';

defineOptions({ name: 'FrSelect' });
</script>

<!--
  The caller's attributes (items, item-title, v-model, label...) fall through onto VSelect
  after the defaults, so the caller wins. Slots are FrSelect's own: each is passed on only
  when given, and its content goes inside a list item FrSelect renders, so it never needs a
  Vuetify component around it
-->
<template>
  <v-select class="fr-select" v-bind="frSelectDefaults">
    <template v-if="$slots.item" #item="{ item, index, props: itemProps }">
      <v-list-item v-bind="itemProps" role="option">
        <template #title>
          <slot name="item" :item="item" :index="index" />
        </template>
      </v-list-item>
    </template>
    <template v-if="$slots['no-data']" #no-data>
      <v-list-item>
        <template #title>
          <slot name="no-data" />
        </template>
      </v-list-item>
    </template>
  </v-select>
</template>
