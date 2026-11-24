<script setup lang="ts">
import { ref } from 'vue';

const compact = ref(false);
const about = ref(false);
</script>

<template>
  <h2 class="text-headline-small mb-4">FrAppSettingsMenu</h2>
  <p class="text-medium-emphasis mb-6">
    The toolbar's settings menu: a cog that opens the host's list items. It stays open when an item
    is clicked, so an item can toggle a setting in place or open a dialog.
  </p>
  <div class="d-flex align-center ga-2 mb-2">
    <span>Toolbar:</span>
    <fr-app-settings-menu id="settings">
      <fr-list-item
        id="compact"
        prepend-icon="mdi-table-row"
        title="Compact rows"
        :subtitle="compact ? 'On' : 'Off'"
        @click="compact = !compact"
      />
      <fr-list-item
        id="about"
        prepend-icon="mdi-information-outline"
        title="About"
        @click="about = true"
      />
    </fr-app-settings-menu>
  </div>
  <p class="text-medium-emphasis">
    Compact rows: <span id="compact-state">{{ compact }}</span>
  </p>
  <fr-dialog v-model="about" title="About" closable size="small">
    Feral components playground.
  </fr-dialog>
</template>
