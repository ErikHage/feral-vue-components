<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get
  VSnackbarQueue's types on an imported FrSnackbarQueue. GlobalComponentsUsage.vue covers the
  global registration
-->
<script setup lang="ts">
import { ref } from 'vue';
import { FrSnackbarQueue, useToast, type FrToastOptions } from '../../src';

const messages = ref<{ text: string; color?: string }[]>([]);
const queue = ref<InstanceType<typeof FrSnackbarQueue>>();

const toast = useToast();
const undo: FrToastOptions = { action: { label: 'Undo', onClick: () => {} }, timeout: 8000 };

function save() {
  toast.show('Saved', { color: 'teal' });
  toast.danger('Deleted', undo);
  // @ts-expect-error a toned toast takes its colour from its name
  toast.success('Saved', { color: 'red' });
  // @ts-expect-error an action needs its label
  toast.info('Moved', { action: { onClick: () => {} } });
  messages.value.push({ text: 'Saved', color: 'success' });
  queue.value?.clear();
}
</script>

<template>
  <fr-snackbar-queue
    ref="queue"
    v-model="messages"
    timeout="2000"
    location="top"
    content-class="mb-4"
    :total-visible="3"
  >
    <template #text="{ item }">{{ item.text }}</template>
    <template #actions="{ props }">
      <button v-bind="props" @click="save">Undo</button>
    </template>
  </fr-snackbar-queue>

  <!-- Without v-model: the app's toasts -->
  <fr-snackbar-queue location="top" />

  <!-- @vue-expect-error displayStrategy is 'hold' or 'overflow' -->
  <fr-snackbar-queue display-strategy="stack" />
</template>
