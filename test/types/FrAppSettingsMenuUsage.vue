<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get
  FrAppSettingsMenu's default slot and no other. GlobalComponentsUsage.vue covers the global
  registration
-->
<script setup lang="ts">
import { FrAppSettingsMenu, FrListItem } from '../../src';
</script>

<template>
  <fr-app-settings-menu id="settings">
    <fr-list-item title="Compact rows" prepend-icon="mdi-table-row" />
  </fr-app-settings-menu>

  <fr-app-settings-menu>
    <!-- @vue-expect-error its only slot is the default one -->
    <template #activator>Cog</template>
  </fr-app-settings-menu>
</template>
