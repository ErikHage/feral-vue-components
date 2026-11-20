<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import { FrForm, type FrFormValidationResult } from '../../src';

const required = (value: unknown) => !!value || 'Required';

const watered = ref(false);
const valid = ref<boolean | null>(null);
const lastSubmit = ref<FrFormValidationResult | null>(null);
const form = useTemplateRef<InstanceType<typeof FrForm>>('form');
</script>

<template>
  <h2 class="text-h5 mb-4">FrForm</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VForm</code>. It never submits the page: submitting validates the fields and emits
    <code>submit</code> with <code>{ valid, errors }</code>. <code>v-model</code> is whether every
    field passes, and its ref exposes <code>validate</code>, <code>reset</code> and
    <code>resetValidation</code>.
  </p>
  <fr-row>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">
        Submit and v-model (valid: <span id="valid">{{ String(valid) }}</span>)
      </h3>
      <fr-form ref="form" v-model="valid" @submit="(result) => (lastSubmit = result)">
        <fr-checkbox v-model="watered" label="The bed is watered" :rules="[required]" />
        <fr-btn type="submit" color="primary" text="Save" class="mr-2" />
        <fr-btn variant="text" text="Validate" class="mr-2" @click="form?.validate()" />
        <fr-btn variant="text" text="Reset" class="mr-2" @click="form?.reset()" />
        <fr-btn variant="text" text="Clear errors" @click="form?.resetValidation()" />
      </fr-form>
      <p class="mt-4">
        Last submit: <code id="last-submit">{{ lastSubmit ?? 'none' }}</code>
      </p>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">Default slot scope, validate-on="submit"</h3>
      <fr-form validate-on="submit">
        <template #default="{ isValid, errors }">
          <fr-autocomplete :items="['Bed 1', 'Bed 2']" label="Plot" :rules="[required]" />
          <fr-btn type="submit" text="Check" />
          <p class="mt-2 text-medium-emphasis">
            isValid: {{ String(isValid) }}, {{ errors.length }} errors
          </p>
        </template>
      </fr-form>
    </fr-col>
  </fr-row>
</template>
