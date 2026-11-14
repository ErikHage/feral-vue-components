<script setup lang="ts">
import { useTheme } from 'vuetify';

const theme = useTheme();

function toggleTheme() {
  theme.change(theme.name.value === 'feralDark' ? 'feralLight' : 'feralDark');
}
</script>

<template>
  <v-app>
    <v-app-bar title="Feral components">
      <template #append>
        <v-btn icon="mdi-theme-light-dark" aria-label="Toggle theme" @click="toggleTheme" />
      </template>
    </v-app-bar>
    <v-main>
      <v-container>
        <p>Theme: {{ theme.name.value }}</p>
      </v-container>
    </v-main>
  </v-app>
</template>
