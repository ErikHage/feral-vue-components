<script setup lang="ts">
import { VTextarea } from 'vuetify/components/VTextarea';
import { frTextareaDefaults } from './defaults';

defineOptions({ name: 'FrTextarea' });
</script>

<!--
  The caller's attributes (v-model, label, rows, auto-grow, counter, rules...) fall through onto
  VTextarea after the defaults, so the caller wins. Its icons come from props
  (prepend-inner-icon, append-inner-icon...): VTextarea's slots are not passed on
-->
<template>
  <v-textarea class="fr-textarea" v-bind="frTextareaDefaults" />
</template>
