<script setup lang="ts">
import { mergeProps, type VNode } from 'vue';
import { VBtn } from 'vuetify/components/VBtn';
import { VCard } from 'vuetify/components/VCard';
import { VList } from 'vuetify/components/VList';
import { VMenu } from 'vuetify/components/VMenu';

defineOptions({ name: 'FrAppSettingsMenu', inheritAttrs: false });

defineSlots<{
  /** The menu's rows, usually FrListItems */
  default?: () => VNode[];
}>();
</script>

<!--
  The toolbar's settings menu: a cog that opens a list of the host's items. It stays open when an
  item is clicked, so an item can open a dialog or toggle a setting in place. The caller's
  attributes (an id, say) land on the cog button, merged with the props that open the menu
-->
<template>
  <v-menu class="fr-app-settings-menu" location="end" :close-on-content-click="false">
    <template #activator="{ props: menuProps }">
      <v-btn
        v-bind="mergeProps(menuProps, $attrs)"
        icon="mdi-cog-outline"
        variant="text"
        density="comfortable"
        aria-label="Settings"
      />
    </template>
    <v-card min-width="220" class="pa-2">
      <v-list density="compact" nav>
        <slot />
      </v-list>
    </v-card>
  </v-menu>
</template>
