<script setup lang="ts">
import { VFileInput } from 'vuetify/components/VFileInput';
import { frFileFieldDefaults } from './defaults';

defineOptions({ name: 'FrFileField' });
</script>

<!--
  The caller's attributes (v-model, label, accept, multiple, chips, rules...) fall through onto
  VFileInput after the defaults, so the caller wins. The selection slot is passed on only when
  given: VFileInput shows its own file names (or chips) only without one
-->
<template>
  <v-file-input class="fr-file-field" v-bind="frFileFieldDefaults">
    <template v-if="$slots.selection" #selection="scope">
      <slot name="selection" v-bind="scope" />
    </template>
  </v-file-input>
</template>
