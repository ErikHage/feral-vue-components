<script setup lang="ts">
import { VExpansionPanels } from 'vuetify/components/VExpansionPanel';
import { frAccordionDefaults } from './defaults';

defineOptions({ name: 'FrAccordion' });
</script>

<!--
  The caller's attributes fall through onto VExpansionPanels after the defaults, so the caller wins.
  Its one slot holds the panels, and passes on { prev, next } from VExpansionPanels
-->
<template>
  <v-expansion-panels class="fr-accordion" v-bind="frAccordionDefaults">
    <template #default="scope">
      <slot v-bind="scope" />
    </template>
  </v-expansion-panels>
</template>
