<script setup lang="ts">
import { VCol } from 'vuetify/components/VGrid';

defineOptions({ name: 'FrCol' });
</script>

<!--
  The caller's attributes (cols, sm, md, lg, offset, order, align-self...) fall through onto
  VCol. Its one slot is the column's content
-->
<template>
  <v-col class="fr-col">
    <slot />
  </v-col>
</template>
