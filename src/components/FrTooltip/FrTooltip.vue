<script setup lang="ts">
import { VTooltip } from 'vuetify/components/VTooltip';

defineOptions({ name: 'FrTooltip' });
</script>

<!--
  The caller's attributes (text, location, open-delay, disabled, v-model...) fall through onto
  VTooltip. Its slots are passed on only when given, as FrMenu's are: the activator, whose props
  go onto what the tooltip describes, and the default slot, the tooltip's content. VTooltip falls
  back to its text prop only when the default slot gives nothing at all, so an always-passed,
  empty slot would blank every tooltip that uses text
-->
<template>
  <v-tooltip class="fr-tooltip">
    <template v-if="$slots.activator" #activator="scope">
      <slot name="activator" v-bind="scope" />
    </template>
    <template v-if="$slots.default" #default="scope">
      <slot v-bind="scope" />
    </template>
  </v-tooltip>
</template>
