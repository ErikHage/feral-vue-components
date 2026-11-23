<script setup lang="ts">
import { ref } from 'vue';

const harvested = ref(12);
const target = 48;
const loading = ref(true);
</script>

<template>
  <h2 class="text-headline-small mb-4">FrProgressBar</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VProgressLinear</code>. No defaults. Its default slot sits over the bar, given the
    <code>value</code> and <code>buffer</code> as percentages.
  </p>
  <fr-row>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">Plain, value 40</h3>
      <fr-progress-bar id="plain" :model-value="40" />
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">
        Indeterminate, while loading
        <fr-btn
          size="small"
          variant="text"
          :text="loading ? 'Stop' : 'Start'"
          @click="loading = !loading"
        />
      </h3>
      <fr-progress-bar id="loading" :indeterminate="loading" :active="loading" color="primary" />
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">
        Out of a max, with the slot, clickable (harvested:
        <span id="harvested">{{ Math.round(harvested) }}</span> of {{ target }})
      </h3>
      <fr-progress-bar
        id="harvest"
        v-model="harvested"
        :max="target"
        color="success"
        height="24"
        rounded
        clickable
      >
        <template #default="{ value }">
          <strong>{{ Math.round(value) }}%</strong>
        </template>
      </fr-progress-bar>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">Buffer and striped</h3>
      <fr-progress-bar
        id="buffer"
        :model-value="30"
        :buffer-value="60"
        color="warning"
        height="10"
        striped
      />
    </fr-col>
  </fr-row>
</template>
