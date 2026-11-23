<script setup lang="ts">
import { computed, useId, type VNode } from 'vue';
import { VIcon } from 'vuetify/components/VIcon';
import type { FrFieldGroupSize } from './types';

defineOptions({ name: 'FrFieldGroup' });

const props = withDefaults(
  defineProps<{
    /** The label above the field */
    label?: string;
    /** An icon before the label, as an mdi name */
    icon?: string;
    /** Marks the label with an asterisk, hidden from assistive technology */
    required?: boolean;
    /** A line of help under the label; the description slot replaces it */
    description?: string;
    /** 'small' for a smaller label with less space under it */
    size?: FrFieldGroupSize;
    /** The id of the one field the label is for, so clicking the label focuses it */
    fieldId?: string;
    /** Given, the content is wrapped in a div with this id */
    boxId?: string;
  }>(),
  {
    label: undefined,
    icon: undefined,
    description: undefined,
    size: 'default',
    fieldId: undefined,
    boxId: undefined,
  },
);

const slots = defineSlots<{
  /** The help under the label, in place of the description prop */
  description?: () => VNode[];
  /** The field, or the fields of a group */
  default?: () => VNode[];
}>();

// Ids for the label and description, unique on the page, so a field can point at them with
// aria-labelledby or aria-describedby
const id = useId();
const labelId = `${id}-label`;
const descriptionId = `${id}-description`;

const hasDescription = computed(() => !!props.description || !!slots.description);
</script>

<!--
  A label above a field, with an optional icon, required mark and description under it. Use it
  directly only to label a group of fields, such as an hour and a minute picker; single fields
  (FrTextField, FrTextArea...) build it in. The caller's attributes fall through onto the root div
-->
<template>
  <div class="field-group">
    <label
      v-if="label"
      :id="labelId"
      :for="fieldId"
      class="d-flex align-center text-high-emphasis"
      :class="[
        size === 'small'
          ? 'text-body-small font-weight-medium'
          : 'text-body-medium font-weight-semibold',
        size === 'small' || hasDescription ? 'mb-1' : 'mb-2',
      ]"
    >
      <v-icon v-if="icon" :icon="icon" size="small" class="mr-2" />
      {{ label }}<span v-if="required" aria-hidden="true">&nbsp;*</span>
    </label>
    <p v-if="hasDescription" :id="descriptionId" class="text-body-small text-medium-emphasis mb-2">
      <slot name="description">{{ description }}</slot>
    </p>
    <div v-if="boxId" :id="boxId">
      <slot />
    </div>
    <slot v-else />
  </div>
</template>

<!--
  Not scoped: field-group--field goes on the fields placed in the default slot by the components
  that build on FrFieldGroup, and scoped styles would not reach them
-->
<style>
.field-group--field {
  flex: 1 1 auto;
  min-width: 0;
}
</style>
