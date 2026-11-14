<script setup lang="ts">
import { VCard } from 'vuetify/components/VCard';
import { frCardDefaults } from './defaults';

defineOptions({ name: 'FrCard' });
</script>

<!-- The caller's attributes fall through onto VCard after the defaults, so the caller wins -->
<template>
  <VCard v-bind="frCardDefaults">
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope ?? {}" />
    </template>
  </VCard>
</template>
