<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from 'vuetify';

defineOptions({ name: 'FrAppLogo' });

const props = defineProps({
  /** Its width and height, in pixels */
  size: { type: Number, default: 18 },
});

const theme = useTheme();

/** Near-black on a light theme, white on a dark one, so the logo always shows */
const strokeColor = computed(() => (theme.current.value.dark ? '#FFFFFF' : '#050606'));
</script>

<!--
  The Feral logo. Until the real one is drawn this is a placeholder: a rooster's silhouette in
  strokeColor. It is decorative (aria-hidden), since it sits beside the app's title or inside a
  button that names itself; the caller's attributes land on the svg
-->
<template>
  <svg
    class="fr-app-logo"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :width="props.size"
    :height="props.size"
    :fill="strokeColor"
    :stroke="strokeColor"
    aria-hidden="true"
    focusable="false"
  >
    <g stroke="none">
      <!-- Comb, head, beak and wattle -->
      <path d="M15.6 4.4c0-1 .7-1.8 1.4-1.7.3-.9 1.3-1.2 1.8-.6.6-.4 1.4 0 1.3.8.5.3.4 1-.1 1.3z" />
      <circle cx="17.3" cy="6" r="2.1" />
      <path d="M19.2 5.1l2.6 1.1-2.6 1z" />
      <path d="M18.2 7.6c.6.4.8 1.3.4 2-.5-.2-.8-.9-.8-1.6z" />
      <!-- Neck, back, tail feathers, belly and breast -->
      <path
        d="M15.4 6.8C14.8 9 14.6 10 13.5 10.5 11 11.5 9 11 7.5 9.5 6.5 7 5.5 4.5 3.5 3 3 5.5 3.5 8 4.5 10 3.2 9.5 2.2 9.8 2 10.5c1 1 1.8 2.5 3 4 1.5 2.3 4 3.1 7 3.1 3.5 0 6-2.1 6.6-5.1.4-1.9.1-3.6-.2-4.5z"
      />
    </g>
    <!-- Legs -->
    <path d="M11 17.4V21m-1.5 0h3M14 17.2V21m-1.2 0h3" fill="none" stroke-width="1" />
  </svg>
</template>
