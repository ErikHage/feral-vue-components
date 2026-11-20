<script setup lang="ts">
import { ref } from 'vue';

const confirmed = ref(false);
const enableEdit = ref(false);
const frost = ref(true);
</script>

<template>
  <h2 class="text-h5 mb-4">FrToggle</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VSwitch</code>. Default: <code>density="compact"</code>. Its slots are passed on
    only when given: <code>label</code>, <code>prepend</code>, <code>append</code>,
    <code>thumb</code>, <code>track-true</code> and <code>track-false</code>.
  </p>
  <fr-row>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">
        As the delete dialog uses it (confirmed: <span id="confirmed">{{ confirmed }}</span>)
      </h3>
      <fr-toggle
        id="confirm"
        v-model="confirmed"
        color="error"
        label="I want to delete this item"
        hide-details
      />
      <fr-btn color="error" text="Delete" :disabled="!confirmed" />
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">
        As the planting page uses it: label slot (edit: <span id="edit">{{ enableEdit }}</span>)
      </h3>
      <fr-toggle id="lock" v-model="enableEdit" color="#00C000" base-color="#C00000" hide-details>
        <template #label>
          <fr-icon id="lock-icon">{{ enableEdit ? 'mdi-lock-open' : 'mdi-lock' }}</fr-icon>
        </template>
      </fr-toggle>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">inset, with thumb and track slots</h3>
      <fr-toggle id="frost" v-model="frost" inset color="primary" label="Frost alerts">
        <template #thumb="{ model }">
          <fr-icon size="x-small">{{
            model.value ? 'mdi-snowflake' : 'mdi-sun-thermometer'
          }}</fr-icon>
        </template>
        <template #track-true><span class="text-caption px-1">On</span></template>
        <template #track-false><span class="text-caption px-1">Off</span></template>
      </fr-toggle>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">Overridden: density="default", disabled</h3>
      <fr-toggle id="locked" :model-value="true" density="default" label="Locked" disabled />
    </fr-col>
  </fr-row>
</template>
