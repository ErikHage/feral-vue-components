<script setup lang="ts">
import { ref } from 'vue';

const one = ref<File | null>(null);
const several = ref<File[]>([]);
</script>

<template>
  <h2 class="text-h5 mb-4">FrFileField</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VFileInput</code>. Defaults: <code>variant="solo"</code>,
    <code>density="compact"</code>, <code>rounded="lg"</code>, the feral field look. Its slot is its
    own: <code>selection</code>, how the chosen files show in the field.
  </p>
  <fr-row>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">One file (v-model: {{ one?.name ?? 'none' }})</h3>
      <fr-file-field v-model="one" label="Seed list" accept=".csv,.txt" clearable />
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">Several, selection slot ({{ several.length }} chosen)</h3>
      <fr-file-field v-model="several" label="Photos" accept="image/*" multiple>
        <template #selection="{ fileNames, totalBytesReadable }">
          <fr-chip size="small" color="primary" :text="`${fileNames.length} files`" class="mr-2" />
          <span class="text-medium-emphasis">{{ totalBytesReadable }}</span>
        </template>
      </fr-file-field>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">Overridden: outlined, comfortable, chips</h3>
      <fr-file-field label="Plans" variant="outlined" density="comfortable" multiple chips />
    </fr-col>
  </fr-row>
</template>
