<script setup lang="ts">
import { ref } from 'vue';

const pressed = ref('nothing yet');
</script>

<template>
  <h2 class="text-headline-small mb-4">FrIconBtn</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VBtn</code> with <code>icon</code>. Defaults: <code>variant="text"</code>,
    <code>size="small"</code>, neutral. <code>icon</code> and <code>label</code> are required; the
    label names it for screen readers.
  </p>
  <fr-row>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">A table row's actions (pressed: {{ pressed }})</h3>
      <div class="d-flex align-center ga-1 pa-2 border rounded-lg">
        <span class="me-auto">Tomato</span>
        <fr-icon-btn id="edit" icon="mdi-pencil" label="Edit Tomato" @click="pressed = 'edit'" />
        <fr-icon-btn
          id="delete"
          icon="mdi-delete"
          label="Delete Tomato"
          @click="pressed = 'delete'"
        />
      </div>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">Overridden: color="error", size="default", disabled</h3>
      <div class="d-flex align-center ga-1 pa-2 border rounded-lg">
        <fr-icon-btn icon="mdi-delete" label="Delete" color="error" />
        <fr-icon-btn icon="mdi-sprout" label="Grow" size="default" />
        <fr-icon-btn icon="mdi-pencil" label="Edit" disabled />
      </div>
    </fr-col>
  </fr-row>
</template>
