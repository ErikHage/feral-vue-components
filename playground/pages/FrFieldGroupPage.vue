<script setup lang="ts">
import { ref } from 'vue';

const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = [0, 15, 30, 45];
const hour = ref(7);
const minute = ref(30);
const name = ref('');
</script>

<template>
  <h2 class="text-headline-small mb-4">FrFieldGroup</h2>
  <p class="text-medium-emphasis mb-6">
    Custom: a label above a field, with an optional icon, required mark and description. Used
    directly only to label a group of fields.
  </p>
  <fr-row>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">
        An hour and minute picker, fields sharing the row (time:
        <span id="time">{{ hour }}:{{ String(minute).padStart(2, '0') }}</span
        >)
      </h3>
      <fr-field-group
        id="sowing"
        label="Sowing time"
        icon="mdi-clock-outline"
        description="24-hour clock"
        required
        box-id="sowing-box"
      >
        <div class="d-flex ga-2">
          <fr-select id="hour" v-model="hour" :items="hours" class="field-group--field" />
          <fr-select id="minute" v-model="minute" :items="minutes" class="field-group--field" />
        </div>
      </fr-field-group>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">One field, labelled through field-id; small</h3>
      <fr-field-group id="name-group" label="Plant name" field-id="plant-name" size="small">
        <input
          id="plant-name"
          v-model="name"
          class="border rounded pa-2 w-100"
          placeholder="Tomato"
        />
      </fr-field-group>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">Description slot, with a link</h3>
      <fr-field-group id="slot-group" label="Spacing">
        <template #description> See the <a href="#/fr-slider">slider</a> for finer steps </template>
        <fr-slider :model-value="30" />
      </fr-field-group>
    </fr-col>
  </fr-row>
</template>
