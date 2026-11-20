<script setup lang="ts">
import { VImg } from 'vuetify/components/VImg';

defineOptions({ name: 'FrImage' });
</script>

<!--
  The caller's attributes (src, alt, max-width, cover, aspect-ratio, @click...) fall through onto
  VImg. Each slot is passed on only when given, because VImg changes what it renders for any it
  is handed: a sources slot wraps the image in a <picture>, a placeholder is drawn while loading,
  and an error slot replaces the placeholder when loading fails
-->
<template>
  <v-img class="fr-image">
    <template v-if="$slots.default" #default>
      <slot />
    </template>
    <template v-if="$slots.placeholder" #placeholder>
      <slot name="placeholder" />
    </template>
    <template v-if="$slots.error" #error>
      <slot name="error" />
    </template>
    <template v-if="$slots.sources" #sources>
      <slot name="sources" />
    </template>
  </v-img>
</template>
