<script setup lang="ts">
import { VSpacer } from 'vuetify/components/VGrid';

defineOptions({ name: 'FrSpacer' });
</script>

<!--
  The caller's attributes (tag, class, style...) fall through onto VSpacer, which grows to take
  the free space in a flex row, pushing what follows it to the far end. The slot is passed on only
  when given: an always-passed slot would leave an empty slot's placeholder nodes inside every
  spacer, which should be an empty element
-->
<template>
  <v-spacer class="fr-spacer">
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </v-spacer>
</template>
