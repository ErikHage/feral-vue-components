<script setup lang="ts">
import { VTextField } from 'vuetify/components/VTextField';
import { frTextFieldDefaults } from './defaults';

defineOptions({ name: 'FrTextField' });
</script>

<!--
  The caller's attributes (v-model, label, type, rules, clearable, counter, @click:append...) fall through onto
  VTextField after the defaults, so the caller wins. Its icons come from props
  (prepend-inner-icon, append-inner-icon...): VTextField's slots are not passed on
-->
<template>
  <v-text-field class="fr-text-field" v-bind="frTextFieldDefaults" />
</template>
