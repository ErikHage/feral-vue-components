<script setup lang="ts">
import type { VNode } from 'vue';

defineOptions({ name: 'FrPageTitle' });

const props = defineProps({
  /** The page's title */
  title: { type: String, required: true },
  /** The title's element: an h1 unless the page has one already */
  tag: { type: String, default: 'h1' },
});

defineSlots<{
  /** Buttons beside the title, on the right; they wrap below it when there isn't room */
  actions?: () => VNode[];
}>();
</script>

<!--
  A page's title, with its actions on the right, as vigilant-harvest-app's PageTitle lays them
  out. The caller's attributes land on the outer div
-->
<template>
  <div class="fr-page-title d-flex align-center flex-wrap ga-3">
    <component :is="props.tag" class="fr-page-title__title">{{ props.title }}</component>
    <div v-if="$slots.actions" class="fr-page-title__actions d-flex flex-wrap ga-3 ms-auto">
      <slot name="actions" />
    </div>
  </div>
</template>

<style>
/* Bold, and scaled with the window: never too small to read on a phone or too big on a wide
   screen. The margin is reset because Vuetify 4 no longer resets a heading's */
.fr-page-title__title {
  margin: 0;
  font-size: clamp(1.25rem, 2vw, 2rem);
  font-weight: bold;
  line-height: 1.2;
}
</style>
