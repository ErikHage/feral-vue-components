<script setup lang="ts">
import { ref } from 'vue';

const lastAction = ref('none');
</script>

<template>
  <h2 class="text-headline-small mb-4">FrAppUserMenu</h2>
  <p class="text-medium-emphasis mb-6">
    The signed-in user as an initials avatar in the toolbar. It opens a menu headed by their name
    and a detail line over the host's rows; attributes such as an id go on the avatar button.
  </p>
  <h3 class="text-body-large mb-2">
    Name and detail (last action: <span id="last-action">{{ lastAction }}</span>)
  </h3>
  <div class="d-flex justify-end border rounded-lg pa-2 mb-6">
    <fr-app-user-menu id="account" name="Ada Lovelace" detail="Administrator">
      <fr-list-item
        prepend-icon="mdi-account-outline"
        title="Profile"
        @click="lastAction = 'profile'"
      />
      <fr-list-item prepend-icon="mdi-logout" title="Sign out" @click="lastAction = 'sign out'" />
    </fr-app-user-menu>
  </div>
  <h3 class="text-body-large mb-2">One-word name, no detail; a long name truncates</h3>
  <div class="d-flex justify-end ga-2 border rounded-lg pa-2">
    <fr-app-user-menu id="one-word" name="grace">
      <fr-list-item prepend-icon="mdi-logout" title="Sign out" />
    </fr-app-user-menu>
    <fr-app-user-menu
      id="long"
      name="Maximiliana Wilhelmina Featherstonehaugh-Cholmondeley"
      detail="Head of Greenhouse Operations and Seasonal Planning"
    >
      <fr-list-item prepend-icon="mdi-logout" title="Sign out" />
    </fr-app-user-menu>
  </div>
</template>
