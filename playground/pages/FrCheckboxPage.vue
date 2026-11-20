<script setup lang="ts">
import { ref } from 'vue';

const climbing = ref(true);
const agreed = ref(false);
const picked = ref<number[]>([1]);
</script>

<template>
  <h2 class="text-h5 mb-4">FrCheckbox</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VCheckbox</code>. Default: <code>density="compact"</code>, as the feral fields are.
    Its slot is its own: <code>label</code>, the label's content in place of the
    <code>label</code> prop.
  </p>
  <v-row>
    <v-col cols="12" md="6">
      <h3 class="text-subtitle-1">Label prop (v-model: {{ climbing }})</h3>
      <fr-checkbox v-model="climbing" label="Climbing" />
      <h3 class="text-subtitle-1 mt-4">Label slot (v-model: {{ agreed }})</h3>
      <fr-checkbox v-model="agreed" color="primary">
        <template #label>
          I agree to the&nbsp;<a href="#/fr-checkbox" @click.stop>terms</a>
        </template>
      </fr-checkbox>
      <h3 class="text-subtitle-1 mt-4">Disabled</h3>
      <fr-checkbox label="Can't touch this" disabled />
    </v-col>
    <v-col cols="12" md="6">
      <h3 class="text-subtitle-1">Array model (v-model: {{ picked }})</h3>
      <fr-checkbox
        v-for="id in [1, 2, 3]"
        :key="id"
        v-model="picked"
        :value="id"
        :label="`Planting ${id}`"
        hide-details
      />
      <h3 class="text-subtitle-1 mt-4">density="comfortable"</h3>
      <fr-checkbox label="Comfortable" density="comfortable" />
    </v-col>
  </v-row>
</template>
