<script setup lang="ts">
import { ref } from 'vue';

const volume = ref(40);
const spacing = ref(30);
const sun = ref(1);
const sunTicks = { 0: 'Shade', 1: 'Part sun', 2: 'Full sun' };
</script>

<template>
  <h2 class="text-h5 mb-4">FrSlider</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VSlider</code>. Default: <code>density="compact"</code>. Its slots are passed on
    only when given: <code>label</code>, <code>prepend</code>, <code>append</code>,
    <code>thumb-label</code> and <code>tick-label</code>.
  </p>
  <fr-row>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">
        Label prop, step 1 (value: <span id="volume">{{ volume }}</span>)
      </h3>
      <fr-slider id="plain" v-model="volume" :step="1" label="Water" />
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">
        Prepend and append buttons, thumb-label slot (spacing:
        <span id="spacing">{{ spacing }}</span> cm)
      </h3>
      <fr-slider
        id="spacing-slider"
        v-model="spacing"
        :min="10"
        :max="90"
        :step="5"
        thumb-label="always"
        color="success"
      >
        <template #prepend>
          <fr-btn
            icon="mdi-minus"
            variant="text"
            size="small"
            aria-label="Less"
            @click="spacing = Math.max(10, spacing - 5)"
          />
        </template>
        <template #append>
          <fr-btn
            icon="mdi-plus"
            variant="text"
            size="small"
            aria-label="More"
            @click="spacing = Math.min(90, spacing + 5)"
          />
        </template>
        <template #thumb-label="{ modelValue }">{{ modelValue }} cm</template>
      </fr-slider>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">
        Ticks with the tick-label and label slots (sun: <span id="sun">{{ sun }}</span>)
      </h3>
      <fr-slider
        id="sun-slider"
        v-model="sun"
        :max="2"
        :step="1"
        :ticks="sunTicks"
        show-ticks="always"
        class="px-4"
      >
        <template #label><fr-icon start>mdi-weather-sunny</fr-icon>Sun</template>
        <template #tick-label="{ tick }">
          <span :class="{ 'text-warning font-weight-bold': tick.value === sun }">
            {{ tick.label }}
          </span>
        </template>
      </fr-slider>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">Overridden: density="default", disabled</h3>
      <fr-slider id="disabled" :model-value="60" density="default" label="Locked" disabled />
    </fr-col>
  </fr-row>
</template>
