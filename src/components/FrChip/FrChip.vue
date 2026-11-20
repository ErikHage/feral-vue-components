<script setup lang="ts">
import { VChip } from 'vuetify/components/VChip';

defineOptions({ name: 'FrChip' });
</script>

<!--
  The caller's attributes (text, color, size, closable, value, @click...) fall through onto VChip.
  Each slot is passed on only when given: VChip shows its text only without a default slot, and
  its prepend or append icon or avatar only without that slot
-->
<template>
  <v-chip class="fr-chip">
    <template v-if="$slots.default" #default="scope">
      <slot v-bind="scope" />
    </template>
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>
    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>
  </v-chip>
</template>
