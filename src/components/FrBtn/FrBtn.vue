<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { VBtn } from 'vuetify/components/VBtn';
import { frBtnDefaults } from './defaults';

defineOptions({ name: 'FrBtn' });

const attrs = useAttrs();

// An icon button keeps Vuetify's circle, so it skips the rounded default. `icon` isn't declared,
// so a bare `<fr-btn icon>` arrives as '' and counts, as it does for VBtn
const defaults = computed(() => ('icon' in attrs && attrs.icon !== false ? {} : frBtnDefaults));
</script>

<!--
  The caller's attributes (text, color, size, icon, to, loading, @click...) fall through onto
  VBtn after the defaults, so the caller wins. Each slot is passed on only when given: VBtn shows
  its text or icon only without a default slot, and its prepend or append icon only without
  that slot
-->
<template>
  <v-btn class="fr-btn" v-bind="defaults">
    <template v-if="$slots.default" #default>
      <slot />
    </template>
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>
    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>
  </v-btn>
</template>
