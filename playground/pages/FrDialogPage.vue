<script setup lang="ts">
import { ref } from 'vue';

const editing = ref(false);
const plantId = ref<number | null>(1);
const saved = ref('nothing yet');
const plants = [
  { plantId: 1, friendlyName: 'Tomato' },
  { plantId: 2, friendlyName: 'Basil' },
];

function save() {
  saved.value = plants.find((p) => p.plantId === plantId.value)?.friendlyName ?? 'none';
  editing.value = false;
}
</script>

<template>
  <h2 class="text-headline-small mb-4">FrDialog</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VDialog</code>, laid out as a card: <code>title</code>, <code>subtitle</code> and a
    <code>closable</code> button in the header, the default slot as the body,
    <code>actions</code> at the bottom. <code>size</code> is small (500px), medium (600px) or large
    (800px).
  </p>
  <div class="d-flex flex-wrap ga-4">
    <fr-dialog
      v-model="editing"
      title="Edit planting"
      subtitle="Bed 3"
      closable
      persistent
      dividers
      cancel-text="Cancel"
      confirm-text="Save"
      @confirm="save"
    >
      <template #activator="{ props }">
        <fr-btn v-bind="props" color="primary" :text="`Edit planting (saved: ${saved})`" />
      </template>
      <fr-autocomplete
        v-model="plantId"
        :items="plants"
        item-title="friendlyName"
        item-value="plantId"
        label="Plant"
      />
    </fr-dialog>

    <fr-dialog title="No v-model" closable>
      <template #activator="{ props }"><fr-btn v-bind="props" text="Activator only" /></template>
      Opened by its activator, closed by its close button or by clicking outside.
    </fr-dialog>

    <fr-dialog
      v-for="size in ['small', 'medium', 'large'] as const"
      :key="size"
      :size="size"
      :title="`size=&quot;${size}&quot;`"
      closable
    >
      <template #activator="{ props }"
        ><fr-btn v-bind="props" variant="tonal" :text="size"
      /></template>
      A {{ size }} dialog.
    </fr-dialog>

    <fr-dialog
      title="Scrollable"
      subtitle="The header and actions stay put"
      scrollable
      dividers
      closable
    >
      <template #activator="{ props }"
        ><fr-btn v-bind="props" variant="tonal" text="Scrollable"
      /></template>
      <p v-for="n in 40" :key="n">Line {{ n }} of a long body.</p>
      <template #actions><fr-btn text="Done" /></template>
    </fr-dialog>
  </div>
</template>
