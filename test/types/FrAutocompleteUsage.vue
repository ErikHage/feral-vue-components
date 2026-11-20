<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VAutocomplete's
  props on an imported FrAutocomplete, and its own slots, with the item slot typed by the items.
  GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { ref } from 'vue';
import { FrAutocomplete } from '../../src';

const plants = [
  { plantId: 1, friendlyName: 'Tomato' },
  { plantId: 2, friendlyName: 'Basil' },
];
const plantId = ref<number | null>(null);
</script>

<template>
  <fr-autocomplete
    v-model="plantId"
    :items="plants"
    item-title="friendlyName"
    item-value="plantId"
    label="Plant"
    clearable
  >
    <template #item="{ item, index }">{{ index }}: {{ item.friendlyName }}</template>
    <template #no-data>No plants</template>
  </fr-autocomplete>

  <!-- @vue-expect-error not one of VAutocomplete's variants -->
  <fr-autocomplete variant="not-a-variant" />
  <fr-autocomplete :items="plants">
    <template #item="{ item }">
      <!-- @vue-expect-error the item slot is typed by the items, which have no 'colour' -->
      {{ item.colour }}
    </template>
  </fr-autocomplete>
  <fr-autocomplete>
    <!-- @vue-expect-error FrAutocomplete's slots are its own: VAutocomplete's chip slot is not one -->
    <template #chip>Chip</template>
  </fr-autocomplete>
</template>
