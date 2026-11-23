<script setup lang="ts">
import { ref } from 'vue';

const plants = [
  { plantId: 1, friendlyName: 'Tomato', family: 'Nightshade' },
  { plantId: 2, friendlyName: 'Basil', family: 'Mint' },
  { plantId: 3, friendlyName: 'Pepper', family: 'Nightshade' },
  { plantId: 4, friendlyName: 'Squash', family: 'Gourd' },
];
const plantId = ref<number | null>(null);
const slotted = ref<number | null>(null);
const several = ref<number[]>([1, 2]);
</script>

<template>
  <h2 class="text-headline-small mb-4">FrSelect</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VSelect</code>. Defaults: <code>variant="solo"</code>,
    <code>density="compact"</code>, <code>rounded="lg"</code>. Its slots are its own:
    <code>item</code>, whose content goes in a list row it renders and which gets your own item, and
    <code>no-data</code>.
  </p>
  <fr-row>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">Props only (selected: {{ plantId ?? 'none' }})</h3>
      <fr-select
        v-model="plantId"
        :items="plants"
        item-title="friendlyName"
        item-value="plantId"
        label="Select Plant"
        clearable
      />
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">Item slot (selected: {{ slotted ?? 'none' }})</h3>
      <fr-select
        v-model="slotted"
        :items="plants"
        item-title="friendlyName"
        item-value="plantId"
        label="Select Plant"
      >
        <template #item="{ item }">
          <strong>{{ item.friendlyName }}</strong>
          <span class="text-medium-emphasis ml-2">{{ item.family }}</span>
        </template>
      </fr-select>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">No-data slot (open it)</h3>
      <fr-select :items="[]" label="Nothing to find">
        <template #no-data>
          <span class="text-medium-emphasis">No plants yet. Add one first.</span>
        </template>
      </fr-select>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">Overridden: outlined, comfortable, multiple chips</h3>
      <fr-select
        v-model="several"
        :items="plants"
        item-title="friendlyName"
        item-value="plantId"
        label="Plants"
        variant="outlined"
        density="comfortable"
        multiple
        chips
      />
    </fr-col>
  </fr-row>
</template>
