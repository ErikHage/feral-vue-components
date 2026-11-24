<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue';
import { useTheme } from 'vuetify';
import type { FrThemeMenuValue } from '../../src';

const theme = useTheme();
const picked = ref<FrThemeMenuValue>(theme.current.value.dark ? 'dark' : 'light');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

/** What a host does with the pick: System follows the device, and keeps following it */
function apply() {
  const dark = picked.value === 'system' ? prefersDark.matches : picked.value === 'dark';
  theme.change(dark ? 'feralDark' : 'feralLight');
}

watch(picked, apply);
prefersDark.addEventListener('change', apply);
onBeforeUnmount(() => prefersDark.removeEventListener('change', apply));
</script>

<template>
  <h2 class="text-headline-small mb-4">FrThemeMenu</h2>
  <p class="text-medium-emphasis mb-6">
    A toolbar button showing the picked theme's icon, opening a menu of Light, Dark and System. It
    only reports the pick through <code>v-model</code>; this page applies it to the playground,
    System following the device.
  </p>
  <div class="d-flex align-center ga-2">
    <span>Toolbar:</span>
    <fr-theme-menu id="theme" v-model="picked" />
    <span class="text-medium-emphasis">
      picked <span id="picked">{{ picked }}</span>, showing {{ theme.name.value }}
    </span>
  </div>
</template>
