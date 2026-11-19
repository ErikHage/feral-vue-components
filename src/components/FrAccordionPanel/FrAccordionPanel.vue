<script setup lang="ts">
import {
  VExpansionPanel,
  VExpansionPanelText,
  VExpansionPanelTitle,
} from 'vuetify/components/VExpansionPanel';

defineOptions({ name: 'FrAccordionPanel' });

// Declared so they stop here: falling through, VExpansionPanel would render a second title and text
defineProps<{ title?: string; text?: string }>();
</script>

<!--
  Every other attribute falls through onto VExpansionPanel, which hands the title's and text's
  own props (expandIcon, hideActions, eager...) down to the two children itself
-->
<template>
  <VExpansionPanel>
    <VExpansionPanelTitle>
      <template #default="scope">
        <slot name="title" v-bind="scope">{{ title }}</slot>
      </template>
      <!-- Only when given, so Vuetify's expand icon stays otherwise -->
      <template v-if="$slots.actions" #actions="scope">
        <slot name="actions" v-bind="scope" />
      </template>
    </VExpansionPanelTitle>
    <VExpansionPanelText>
      <slot>{{ text }}</slot>
    </VExpansionPanelText>
  </VExpansionPanel>
</template>
