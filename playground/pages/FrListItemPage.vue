<script setup lang="ts">
import { ref } from 'vue';

const schedules = ref([
  { id: 1, name: 'Water tomatoes', description: 'Every 3 days', pendingRemove: false },
  { id: 2, name: 'Feed squash', description: 'Weekly, May to August', pendingRemove: false },
]);

const statuses = [
  { label: 'Planted', value: 12, color: 'success' },
  { label: 'Harvested', value: 4, color: 'warning' },
];

const selected = ref<string[]>([]);
</script>

<template>
  <h2 class="text-h5 mb-4">FrListItem</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VListItem</code>. No defaults. Its slots are VListItem's (<code>prepend</code>,
    <code>title</code>, <code>subtitle</code>, default, <code>append</code>), each passed on only
    when given.
  </p>
  <fr-row>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">Props only: title, subtitle, prepend-icon</h3>
      <fr-list id="props" lines="two">
        <fr-list-item title="Activity type" subtitle="Watering" prepend-icon="mdi-water" />
        <fr-list-item title="Recurrence" subtitle="Every 3 days" prepend-icon="mdi-repeat" />
      </fr-list>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">Title, subtitle and append slots (schedule dialog)</h3>
      <fr-list id="schedules" lines="two">
        <fr-list-item v-for="item in schedules" :key="item.id" rounded="lg">
          <template #title>
            <span :class="{ 'text-error text-decoration-line-through': item.pendingRemove }">
              {{ item.name }}
            </span>
          </template>
          <template #subtitle>{{ item.description }}</template>
          <template #append>
            <fr-btn
              :icon="item.pendingRemove ? 'mdi-close' : 'mdi-delete'"
              :color="item.pendingRemove ? undefined : 'error'"
              :aria-label="item.pendingRemove ? 'Keep' : 'Remove'"
              variant="text"
              size="small"
              @click="item.pendingRemove = !item.pendingRemove"
            />
          </template>
        </fr-list-item>
      </fr-list>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">Prepend and append slots (year details)</h3>
      <fr-list id="statuses">
        <fr-list-item v-for="status in statuses" :key="status.label" :title="status.label">
          <template #prepend>
            <fr-avatar :color="status.color" size="8" class="mr-4" />
          </template>
          <template #append>
            <span class="text-h5" :class="`text-${status.color}`">{{ status.value }}</span>
          </template>
        </fr-list-item>
      </fr-list>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">
        Selectable, the slot showing isSelected (selected:
        <span id="selected">{{ selected }}</span>)
      </h3>
      <fr-list id="selectable" v-model:selected="selected" select-strategy="leaf">
        <fr-list-item
          v-for="plant in ['Basil', 'Tomato']"
          :key="plant"
          :value="plant"
          :title="plant"
        >
          <template #append="{ isSelected }">
            <fr-icon :color="isSelected ? 'primary' : undefined">
              {{ isSelected ? 'mdi-check-circle' : 'mdi-circle-outline' }}
            </fr-icon>
          </template>
        </fr-list-item>
      </fr-list>
    </fr-col>
  </fr-row>
</template>
