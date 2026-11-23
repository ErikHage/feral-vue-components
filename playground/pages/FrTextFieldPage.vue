<script setup lang="ts">
import { ref } from 'vue';

const name = ref('Tomato');
const password = ref('');
const shown = ref(false);
</script>

<template>
  <h2 class="text-headline-small mb-4">FrTextField</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VTextField</code>. Defaults: <code>variant="solo"</code>,
    <code>density="compact"</code>, <code>rounded="lg"</code>, the feral field look. Icons come from
    props; VTextField's slots are not passed on.
  </p>
  <fr-row>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">Defaults (v-model: {{ name }})</h3>
      <fr-text-field id="name" v-model="name" label="Name" clearable />
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">A password, shown on demand</h3>
      <fr-text-field
        v-model="password"
        label="Password"
        :type="shown ? 'text' : 'password'"
        :append-inner-icon="shown ? 'mdi-eye' : 'mdi-eye-off'"
        counter
        @click:append-inner="shown = !shown"
      />
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">A search, as the plants page has</h3>
      <fr-text-field label="Search..." prepend-inner-icon="mdi-magnify" hide-details clearable />
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">Overridden: outlined, comfortable</h3>
      <fr-text-field label="Lot#" variant="outlined" density="comfortable" />
    </fr-col>
  </fr-row>
</template>
