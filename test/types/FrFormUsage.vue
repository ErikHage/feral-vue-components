<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get FrForm's
  v-model, submit result, slot scope and exposed functions on an imported FrForm.
  GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import { FrBtn, FrForm, type FrFormValidationResult } from '../../src';

const valid = ref<boolean | null>(null);
const form = useTemplateRef<InstanceType<typeof FrForm>>('form');

function save(result: FrFormValidationResult) {
  const passed: boolean = result.valid;
  return passed;
}

async function check() {
  const { valid: passed } = await form.value!.validate();
  form.value!.reset();
  form.value!.resetValidation();
  return passed;
}
</script>

<template>
  <fr-form ref="form" v-model="valid" validate-on="submit" fast-fail @submit="save">
    <template #default="{ isValid, errors, reset }">
      <fr-btn :disabled="isValid === false" :text="`${errors.length}`" @click="reset" />
      <fr-btn text="Check" @click="check" />
    </template>
  </fr-form>

  <!-- @vue-expect-error v-model is the form's validity: a boolean or null -->
  <fr-form :model-value="'yes'" />
  <!-- @vue-expect-error submit gives the validation result, not the DOM event -->
  <fr-form @submit="(event: SubmitEvent) => event" />
</template>
