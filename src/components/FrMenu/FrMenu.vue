<script setup lang="ts">
import { VMenu } from 'vuetify/components/VMenu';

defineOptions({ name: 'FrMenu' });
</script>

<!--
  The caller's attributes (v-model, location, open-on-hover, close-on-content-click, offset...)
  fall through onto VMenu. Its slots are passed on only when given, as FrDialog's are: the
  activator, whose props go onto what opens the menu, and the default slot, the menu's content,
  given whether it is open
-->
<template>
  <v-menu class="fr-menu">
    <template v-if="$slots.activator" #activator="scope">
      <slot name="activator" v-bind="scope" />
    </template>
    <template v-if="$slots.default" #default="scope">
      <slot v-bind="scope" />
    </template>
  </v-menu>
</template>
