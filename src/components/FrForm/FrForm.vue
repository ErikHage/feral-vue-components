<script setup lang="ts">
import { useTemplateRef, type VNode } from 'vue';
import { VForm } from 'vuetify/components/VForm';
import type { FrFormSlotScope, FrFormValidationResult } from './types';

defineOptions({ name: 'FrForm' });

// Whether every field passes its rules: true, false, or null while some are still unchecked.
// Without a v-model from the caller it is FrForm's own: binding VForm's v-model to a value nobody
// updates would freeze VForm's validity, and with it the default slot's isValid
const model = defineModel<boolean | null>({ default: null });

const emit = defineEmits<{
  /** The form was submitted and validated. It fires whether or not it passed */
  submit: [result: FrFormValidationResult];
}>();

defineSlots<{
  /** The fields, given the form's state and its validate and reset functions */
  default?: (scope: FrFormSlotScope) => VNode[];
}>();

const form = useTemplateRef<InstanceType<typeof VForm>>('form');

// VForm hands the submit event over as a promise of its validation. Preventing it stops VForm
// submitting the page itself once the fields pass; FrForm reports the result instead
async function onSubmit(event: SubmitEvent & Promise<FrFormValidationResult>) {
  event.preventDefault();
  emit('submit', await event);
}

defineExpose({
  /** Checks every field against its rules, showing their errors */
  validate: (): Promise<FrFormValidationResult> => form.value!.validate(),
  /** Clears every field's value and errors */
  reset: (): void => form.value!.reset(),
  /** Clears every field's errors, keeping their values */
  resetValidation: (): void => form.value!.resetValidation(),
});
</script>

<!--
  The caller's other attributes (disabled, readonly, validate-on, fast-fail...) fall through onto
  VForm
-->
<template>
  <v-form ref="form" v-model="model" class="fr-form" @submit="onSubmit">
    <template #default="scope">
      <slot v-bind="scope" />
    </template>
  </v-form>
</template>
