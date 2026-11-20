<script setup lang="ts">
import { VSkeletonLoader } from 'vuetify/components/VSkeletonLoader';

defineOptions({ name: 'FrSkeleton' });
</script>

<!--
  The caller's attributes (type, loading, elevation, max-width...) fall through onto
  VSkeletonLoader. The slot is passed on only when given: with one, VSkeletonLoader shows it
  instead of the skeleton unless `loading`, so an always-present slot would hide every skeleton
  that has no content to wait for. Once loaded it renders the content alone, with no element of
  its own, so `fr-skeleton` marks only the skeleton
-->
<template>
  <v-skeleton-loader class="fr-skeleton">
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </v-skeleton-loader>
</template>
