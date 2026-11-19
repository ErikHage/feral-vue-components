<script setup lang="ts">
import { VContainer } from 'vuetify/components/VGrid';

defineOptions({ name: 'FrContainer' });
</script>

<!--
  The caller's attributes (fluid, max-width, tag...) fall through onto VContainer. Its one slot is
  the container's content
-->
<template>
  <v-container class="fr-container">
    <slot />
  </v-container>
</template>
