<script setup lang="ts">
import type { VNode } from 'vue';
import { FrContainer } from '../FrContainer';
import { FrPageTitle } from '../FrPageTitle';

defineOptions({ name: 'FrPage' });

const props = defineProps({
  /** Shown above the content in an FrPageTitle */
  title: { type: String, default: undefined },
});

defineSlots<{
  /** Buttons beside the title, on the right */
  actions?: () => VNode[];
  /** The page's content, across the full width */
  default?: () => VNode[];
}>();
</script>

<!--
  A page: an FrContainer (fluid), then an FrPageTitle given a title, then the content. The caller's
  attributes (max-width, :fluid="false", class...) fall through onto the container
-->
<template>
  <fr-container class="fr-page">
    <fr-page-title v-if="props.title != null" :title="props.title" class="mb-6">
      <template v-if="$slots.actions" #actions>
        <slot name="actions" />
      </template>
    </fr-page-title>
    <slot />
  </fr-container>
</template>
