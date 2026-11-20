<script setup lang="ts">
import { ref } from 'vue';
import { FrSnackbarQueue } from '../../src';

type Message = string | { text: string; color?: string; timeout?: number; onDismiss?: () => void };

const messages = ref<Message[]>([]);
const undoMessages = ref<Message[]>([]);
const log = ref<string[]>([]);
const queue = ref<InstanceType<typeof FrSnackbarQueue>>();
let count = 0;

function save() {
  messages.value.push(`Saved planting ${++count}`);
}

function warn() {
  messages.value.push({ text: 'Frost tonight: cover the beans', color: 'warning', timeout: -1 });
}

function remove() {
  undoMessages.value.push({ text: 'Deleted the basil', timeout: -1 });
}
</script>

<template>
  <h2 class="text-h5 mb-4">FrSnackbarQueue</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VSnackbarQueue</code>. Defaults: <code>rounded="lg"</code>, <code>closable</code>.
    Push messages onto its <code>v-model</code>; they show one after another.
  </p>
  <fr-row>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">
        Strings and objects, 2s timeout (waiting: <span id="waiting">{{ messages.length }}</span>)
      </h3>
      <fr-btn id="save" class="mr-2 mb-2" text="Save" @click="save" />
      <fr-btn id="warn" class="mr-2 mb-2" color="warning" text="Warn" @click="warn" />
      <fr-btn id="clear" class="mb-2" variant="text" text="Clear all" @click="queue?.clear()" />
      <fr-snackbar-queue ref="queue" v-model="messages" timeout="2000" />
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">
        An actions slot in place of Dismiss, at the top (log:
        <span id="log">{{ log.join(', ') }}</span>)
      </h3>
      <fr-btn id="delete" color="error" text="Delete" @click="remove" />
      <fr-snackbar-queue v-model="undoMessages" location="top" :rounded="0">
        <template #actions="{ item, props }">
          <fr-btn
            id="undo"
            v-bind="props"
            text="Undo"
            @click="log.push(`undo: ${typeof item === 'string' ? item : item.text}`)"
          />
        </template>
      </fr-snackbar-queue>
    </fr-col>
  </fr-row>
</template>
