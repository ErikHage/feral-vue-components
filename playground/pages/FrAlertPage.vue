<script setup lang="ts">
import { ref } from 'vue';

const shown = ref(true);
</script>

<template>
  <h2 class="text-h5 mb-4">FrAlert</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VAlert</code>. Defaults: <code>variant="tonal"</code>, <code>rounded="lg"</code>.
    Its slots are its own: <code>title</code>, falling back to the <code>title</code> prop, and the
    message as the default slot, falling back to <code>text</code>, and <code>append</code>, beside
    it on the right.
  </p>
  <div class="d-flex flex-column ga-4">
    <fr-alert title="Defaults" text="An alert with nothing overridden." />
    <fr-alert
      v-for="type in ['success', 'info', 'warning', 'error'] as const"
      :key="type"
      :type="type"
      :title="type"
      :text="`type=&quot;${type}&quot;`"
    />
    <fr-alert type="warning">
      <template #title>Title slot: <em class="ml-1">frost tonight</em></template>
      The message is the default slot, so anything can go here.
    </fr-alert>
    <fr-alert type="success" title="Append slot" text="Beside the message, on the right." closable>
      <template #append>
        <fr-btn variant="text" text="Undo" />
      </template>
    </fr-alert>
    <fr-alert
      v-model="shown"
      type="info"
      title="Closable, with v-model"
      text="Close it, then bring it back with the button below."
      closable
    />
    <div>
      <fr-btn :disabled="shown" text="Show the closable alert again" @click="shown = true" />
    </div>
    <fr-alert
      title="Overridden"
      text="variant outlined, rounded 0: the caller's props win over the defaults."
      variant="outlined"
      rounded="0"
    />
  </div>
</template>
