<script setup lang="ts">
import { VChipGroup } from 'vuetify/components/VChipGroup';

defineOptions({ name: 'FrChipGroup' });
</script>

<!--
  The caller's attributes (v-model, multiple, column, color, filter...) fall through onto
  VChipGroup, which hands color, variant, filter and disabled down to its chips; FrChip sets no
  defaults, so they reach it. Its one slot holds the chips, and passes on VChipGroup's scope
-->
<template>
  <v-chip-group class="fr-chip-group">
    <template #default="scope">
      <slot v-bind="scope" />
    </template>
  </v-chip-group>
</template>
