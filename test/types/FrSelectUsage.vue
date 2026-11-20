<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VSelect's
  props on an imported FrSelect, and its own slots, with the item slot typed by the items.
  GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { ref } from 'vue';
import { FrSelect } from '../../src';

const plants = [
  { plantId: 1, friendlyName: 'Tomato' },
  { plantId: 2, friendlyName: 'Basil' },
];
const plantId = ref<number | null>(null);
</script>

<template>
  <fr-select
    v-model="plantId"
    :items="plants"
    item-title="friendlyName"
    item-value="plantId"
    label="Plant"
    clearable
  >
    <template #item="{ item, index }">{{ index }}: {{ item.friendlyName }}</template>
    <template #no-data>No plants</template>
  </fr-select>

  <!-- @vue-expect-error not one of VSelect's variants -->
  <fr-select variant="not-a-variant" />
  <fr-select :items="plants">
    <template #item="{ item }">
      <!-- @vue-expect-error the item slot is typed by the items, which have no 'colour' -->
      {{ item.colour }}
    </template>
  </fr-select>
  <fr-select>
    <!-- @vue-expect-error FrSelect's slots are its own: VSelect's chip slot is not one -->
    <template #chip>Chip</template>
  </fr-select>
</template>
