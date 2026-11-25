<script setup lang="ts">
import { ref } from 'vue';
import { FrSnackbarQueue, useToast } from '../../src';

type Message = string | { text: string; color?: string; timeout?: number; onDismiss?: () => void };

const toast = useToast();
const messages = ref<Message[]>([]);
const undoMessages = ref<Message[]>([]);
const log = ref<string[]>([]);
const queue = ref<InstanceType<typeof FrSnackbarQueue>>();
let count = 0;

function deleteBasil() {
  toast.show('Deleted the basil', {
    action: { label: 'Undo', onClick: () => log.value.push('undo: basil') },
  });
}

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
  <h2 class="text-headline-small mb-4">FrSnackbarQueue</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VSnackbarQueue</code>. Defaults: <code>rounded="lg"</code>, <code>closable</code>.
    Without a <code>v-model</code> it shows the app's toasts from <code>useToast()</code>; with one,
    the messages pushed onto it.
  </p>
  <fr-row>
    <fr-col cols="12">
      <h3 class="text-body-large mb-2">
        The app's toasts, useToast(), shown by the shell's queue (log:
        <span id="log">{{ log.join(', ') }}</span>)
      </h3>
      <fr-btn
        id="toast-success"
        class="mr-2 mb-2"
        color="success"
        text="Success"
        @click="toast.success('Saved the seed order')"
      />
      <fr-btn
        id="toast-info"
        class="mr-2 mb-2"
        color="info"
        text="Info"
        @click="toast.info('3 seedlings ready to plant')"
      />
      <fr-btn
        id="toast-warning"
        class="mr-2 mb-2"
        color="warning"
        text="Warning"
        @click="toast.warning('Frost tonight')"
      />
      <fr-btn
        id="toast-danger"
        class="mr-2 mb-2"
        color="error"
        text="Danger"
        @click="toast.danger('Could not save the plot')"
      />
      <fr-btn
        id="toast-plain"
        class="mr-2 mb-2"
        text="Plain"
        @click="toast.show('Watered the beds')"
      />
      <fr-btn id="toast-action" class="mb-2" text="With Undo" @click="deleteBasil" />
      <!-- No queue here: the playground's FrAppShell holds the app's one unbound queue -->
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">
        v-model: strings and objects, 2s timeout, at the top (waiting:
        <span id="waiting">{{ messages.length }}</span>)
      </h3>
      <fr-btn id="save" class="mr-2 mb-2" text="Save" @click="save" />
      <fr-btn id="warn" class="mr-2 mb-2" color="warning" text="Warn" @click="warn" />
      <fr-btn id="clear" class="mb-2" variant="text" text="Clear all" @click="queue?.clear()" />
      <fr-snackbar-queue ref="queue" v-model="messages" timeout="2000" location="top" />
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">
        v-model with an actions slot in place of Dismiss, top end
      </h3>
      <fr-btn id="delete" color="error" text="Delete" @click="remove" />
      <fr-snackbar-queue v-model="undoMessages" location="top end" :rounded="0">
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
