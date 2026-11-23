<script setup lang="ts">
import { VContainer } from 'vuetify/components/VGrid';
import { frContainerDefaults } from './defaults';

defineOptions({ name: 'FrContainer' });
</script>

<!--
  The caller's attributes (fluid, max-width, tag...) fall through onto VContainer after the
  defaults, so the caller wins. Its one slot is the container's content
-->
<template>
  <v-container class="fr-container" v-bind="frContainerDefaults">
    <slot />
  </v-container>
</template>
