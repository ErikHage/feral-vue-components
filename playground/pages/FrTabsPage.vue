<script setup lang="ts">
import { ref } from 'vue';
import type { FrTabsOption, FrTabsValue } from '../../src';

const planning = ref<FrTabsValue>('planning');
const planningOptions: FrTabsOption[] = [
  { title: 'To Start', value: 'planning' },
  { title: 'To Plant', value: 'propagation' },
];
const plantTab = ref<FrTabsValue>();
const stepOptions: FrTabsOption[] = [
  { title: 'Sow', value: 1, prependIcon: 'mdi-seed' },
  { title: 'Grow', value: 2, prependIcon: 'mdi-sprout' },
  { title: 'Harvest', value: 3, prependIcon: 'mdi-basket', disabled: true },
];
</script>

<template>
  <h2 class="text-headline-small mb-4">FrTabs</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VTabs</code>, building a tab per entry in <code>options</code>. Defaults:
    <code>color="primary"</code>, <code>fixed-tabs</code>. The default slot sits below the tabs,
    given the selected tab.
  </p>
  <fr-row>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">
        As the planning page uses it: { title, value } (tab:
        <span id="planning">{{ planning }}</span>)
      </h3>
      <fr-card>
        <fr-tabs id="planning-tabs" v-model="planning" :options="planningOptions">
          <template #default="{ tab }">
            <p id="planning-content" class="pa-4">
              {{ tab === 'planning' ? 'Seeds to sow this week' : 'Seedlings to plant out' }}
            </p>
          </template>
        </fr-tabs>
      </fr-card>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">
        Strings, v-model starts empty, first tab selected (tab:
        <span id="plant">{{ plantTab }}</span>)
      </h3>
      <fr-card>
        <fr-tabs
          id="plant-tabs"
          v-model="plantTab"
          :options="['Details', 'Taxonomy', 'Sowing']"
          align-tabs="center"
        >
          <template #default="{ tab }">
            <p id="plant-content" class="pa-4">{{ tab }} for Tomato</p>
          </template>
        </fr-tabs>
      </fr-card>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">Number values, icons, a disabled tab, no slot</h3>
      <fr-tabs id="steps" :options="stepOptions" />
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">
        Overridden: color="success", :fixed-tabs="false", grow, bg-color; class on the div
      </h3>
      <fr-tabs
        id="custom"
        :options="['One', 'Two']"
        color="success"
        :fixed-tabs="false"
        grow
        bg-color="surface-light"
        class="rounded-lg overflow-hidden"
      />
    </fr-col>
  </fr-row>
</template>
