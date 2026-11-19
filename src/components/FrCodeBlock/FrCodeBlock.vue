<script setup lang="ts">
import type { VNode } from 'vue';

defineOptions({ name: 'FrCodeBlock' });

defineSlots<{
  /** The code, shown as written: whitespace and line breaks are kept */
  default?: () => VNode[];
}>();
</script>

<!--
  A plain <pre>: no Vuetify component. Its look is an inline style, so the library still ships no
  CSS of its own: the background is the theme's text colour at low opacity, which suits dark and
  light alike. A caller changes it with `style`, which merges in after this one and wins. Not with
  a Vuetify utility class: Vuetify 4's classes sit in CSS layers without !important, and an
  inline style beats any layered rule (as classes, pa-4 would still beat a caller's pa-2, which
  comes earlier in Vuetify's stylesheet). Classes that don't clash (mb-4...) work as usual.
  The caller's attributes fall through onto the <pre>. Nothing goes between the tags and the
  slot, so no whitespace is added to the code
-->
<template>
  <pre
    class="fr-code-block"
    style="
      padding: 16px;
      border-radius: 8px;
      overflow-x: auto;
      background: rgba(var(--v-theme-on-surface), 0.06);
    "
  ><slot /></pre>
</template>
