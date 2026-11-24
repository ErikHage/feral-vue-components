<script setup lang="ts">
import { computed, mergeProps, type VNode } from 'vue';
import { VAvatar } from 'vuetify/components/VAvatar';
import { VBtn } from 'vuetify/components/VBtn';
import { VCard } from 'vuetify/components/VCard';
import { VDivider } from 'vuetify/components/VDivider';
import { VList } from 'vuetify/components/VList';
import { VMenu } from 'vuetify/components/VMenu';

defineOptions({ name: 'FrAppUserMenu', inheritAttrs: false });

const props = defineProps({
  /** The signed-in user's name: `Ada Lovelace` */
  name: { type: String, required: true },
  /** A line under their name, such as their role */
  detail: { type: String, default: '' },
});

defineSlots<{
  /** The menu's rows under the user's name, usually FrListItems: Profile, Sign out */
  default?: () => VNode[];
}>();

/** The first letter of the name's first two words, capitalized: `Ada Lovelace` is `AL` */
const initials = computed(() =>
  props.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join(''),
);
</script>

<!--
  The signed-in user, as an initials avatar in the toolbar. It opens below, headed by their name
  and detail over the host's rows. The caller's attributes (an id, say) land on the avatar button,
  merged with the props that open the menu
-->
<template>
  <v-menu location="bottom end" :offset="8">
    <template #activator="{ props: menuProps }">
      <v-btn
        v-bind="mergeProps(menuProps, $attrs)"
        icon
        variant="text"
        :size="48"
        :aria-label="`Account: ${props.name}`"
      >
        <v-avatar color="primary" :size="40" class="text-body-2 font-weight-bold">
          {{ initials }}
        </v-avatar>
      </v-btn>
    </template>
    <v-card min-width="260" max-width="320" elevation="8" rounded="lg" class="fr-app-user-menu">
      <div class="fr-app-user-menu__header">
        <v-avatar
          color="primary"
          :size="40"
          class="text-body-2 font-weight-bold flex-shrink-0"
          aria-hidden="true"
        >
          {{ initials }}
        </v-avatar>
        <div class="fr-app-user-menu__identity">
          <div class="fr-app-user-menu__name text-body-2 font-weight-bold text-truncate">
            {{ props.name }}
          </div>
          <div
            v-if="props.detail"
            class="fr-app-user-menu__detail text-caption text-medium-emphasis text-truncate"
          >
            {{ props.detail }}
          </div>
        </div>
      </div>
      <v-divider />
      <v-list density="compact" nav slim class="pa-2">
        <slot />
      </v-list>
    </v-card>
  </v-menu>
</template>

<style>
.fr-app-user-menu__header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
}

/* Lets a long name or detail truncate instead of widening the card */
.fr-app-user-menu__identity {
  min-width: 0;
}
</style>
