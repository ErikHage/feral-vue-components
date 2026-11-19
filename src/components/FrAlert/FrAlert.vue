<script setup lang="ts">
import { VAlert, VAlertTitle } from 'vuetify/components/VAlert';
import { frAlertDefaults } from './defaults';

defineOptions({ name: 'FrAlert' });

// Declared so they stop here: falling through, VAlert would render a second title and text
const props = defineProps<{ title?: string; text?: string }>();
</script>

<!--
  The caller's other attributes (type, closable, icon, v-model...) fall through onto VAlert after
  the defaults, so the caller wins. Slots are FrAlert's own, so content never needs a Vuetify
  component around it
-->
<template>
  <v-alert class="fr-alert" v-bind="frAlertDefaults">
    <v-alert-title v-if="$slots.title || props.title != null">
      <slot name="title">{{ props.title }}</slot>
    </v-alert-title>
    <slot>{{ props.text }}</slot>
  </v-alert>
</template>
