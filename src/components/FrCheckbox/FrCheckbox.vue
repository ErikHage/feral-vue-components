<script setup lang="ts">
import { VCheckbox } from 'vuetify/components/VCheckbox';
import { frCheckboxDefaults } from './defaults';

defineOptions({ name: 'FrCheckbox' });
</script>

<!--
  The caller's attributes (v-model, label, value, rules, disabled...) fall through onto VCheckbox
  after the defaults, so the caller wins. The label slot is passed on only when given: VCheckbox
  shows its label prop only without one, and wraps the slot in its own <label> either way
-->
<template>
  <v-checkbox class="fr-checkbox" v-bind="frCheckboxDefaults">
    <template v-if="$slots.label" #label>
      <slot name="label" />
    </template>
  </v-checkbox>
</template>
