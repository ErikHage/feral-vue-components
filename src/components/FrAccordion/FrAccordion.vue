<script setup lang="ts">
import { VExpansionPanels } from 'vuetify/components/VExpansionPanel';
import { frAccordionDefaults } from './defaults';

defineOptions({ name: 'FrAccordion' });
</script>

<!--
  The caller's attributes fall through onto VExpansionPanels after the defaults, so the caller wins.
  Its one slot always passes { prev, next }, so the scope needs no fallback, unlike FrCard's
-->
<template>
  <v-expansion-panels v-bind="frAccordionDefaults">
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope" />
    </template>
  </v-expansion-panels>
</template>
