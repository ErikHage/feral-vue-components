<script setup lang="ts">
import { VAutocomplete } from 'vuetify/components/VAutocomplete';
import { VListItem } from 'vuetify/components/VList';
import { frAutocompleteDefaults } from './defaults';

defineOptions({ name: 'FrAutocomplete' });
</script>

<!--
  The caller's attributes (items, item-title, v-model, label...) fall through onto VAutocomplete
  after the defaults, so the caller wins. Slots are FrAutocomplete's own: each is passed on only
  when given, and its content goes inside a list item FrAutocomplete renders, so it never needs a
  Vuetify component around it
-->
<template>
  <v-autocomplete class="fr-autocomplete" v-bind="frAutocompleteDefaults">
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
  </v-autocomplete>
</template>
