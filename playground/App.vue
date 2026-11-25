<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useTheme } from 'vuetify';
import { componentPages } from './pages';

const theme = useTheme();
const route = useRoute();
// null lets Vuetify decide: open beside the content on wide screens, closed on narrow ones
const drawer = ref<boolean | null>(null);

function toggleTheme() {
  theme.change(theme.name.value === 'feralDark' ? 'feralLight' : 'feralDark');
}
</script>

<template>
  <!-- A page with its own v-app, such as FrAppShell's, goes without the playground's frame -->
  <router-view v-if="route.meta.bare" />
  <v-app v-else>
    <v-app-bar title="Feral components">
      <template #prepend>
        <v-app-bar-nav-icon aria-label="Toggle menu" @click="drawer = !drawer" />
      </template>
      <template #append>
        <span class="text-medium-emphasis mr-2">{{ theme.name.value }}</span>
        <v-btn icon="mdi-theme-light-dark" aria-label="Toggle theme" @click="toggleTheme" />
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer">
      <v-list nav density="compact" aria-label="Components">
        <v-list-subheader>Components</v-list-subheader>
        <v-list-item
          v-for="page in componentPages"
          :key="page.path"
          :to="page.path"
          :title="page.name"
        />
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
