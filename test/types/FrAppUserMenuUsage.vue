<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get FrAppUserMenu's
  props, with `name` required, and its default slot. GlobalComponentsUsage.vue covers the global
  registration
-->
<script setup lang="ts">
import { FrAppUserMenu, FrListItem } from '../../src';
</script>

<template>
  <fr-app-user-menu id="account" name="Ada Lovelace" detail="Administrator">
    <fr-list-item title="Sign out" prepend-icon="mdi-logout" />
  </fr-app-user-menu>

  <!-- @vue-expect-error name is required -->
  <fr-app-user-menu detail="Administrator" />
  <!-- @vue-expect-error detail is a string -->
  <fr-app-user-menu name="Ada" :detail="3" />
  <fr-app-user-menu name="Ada">
    <!-- @vue-expect-error its only slot is the default one -->
    <template #header>Ada</template>
  </fr-app-user-menu>
</template>
