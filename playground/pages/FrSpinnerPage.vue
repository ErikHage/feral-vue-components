<script setup lang="ts">
import { ref } from 'vue';

const progress = ref(40);
const uploaded = ref<number>();

function startUpload() {
  uploaded.value = undefined;
  setTimeout(() => (uploaded.value = 75), 1500);
}
</script>

<template>
  <h2 class="text-headline-small mb-4">FrSpinner</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VProgressCircular</code>. It spins unless given a value, which it shows as a ring
    instead; the caller's <code>indeterminate</code> always wins. Its default slot sits in the
    middle, given the value.
  </p>
  <fr-row>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">As the plant pages use it: no value, so it spins</h3>
      <fr-spinner id="plain" size="100" width="10" color="green" />
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">
        v-model, with the default slot (progress: <span id="progress">{{ progress }}</span>)
        <fr-btn
          id="more"
          size="small"
          variant="text"
          text="+10"
          @click="progress = Math.min(100, progress + 10)"
        />
      </h3>
      <fr-spinner id="ring" v-model="progress" size="64" color="primary">
        <template #default="{ value }">{{ value }}%</template>
      </fr-spinner>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">
        model-value, undefined until it arrives (uploaded:
        <span id="uploaded">{{ uploaded }}</span>)
        <fr-btn id="upload" size="small" variant="text" text="Upload" @click="startUpload" />
      </h3>
      <fr-spinner id="late" :model-value="uploaded" size="64" color="success" />
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">Overridden: :indeterminate="false", and disable-shrink</h3>
      <fr-spinner id="still" :indeterminate="false" class="mr-4" />
      <fr-spinner id="steady" :model-value="30" indeterminate="disable-shrink" color="warning" />
    </fr-col>
  </fr-row>
</template>
