<script setup lang="ts">
import { VFadeTransition } from 'vuetify/components/transitions';

defineOptions({ name: 'FrFadeIn' });
</script>

<!--
  VFadeTransition with `appear`, so its content fades in when it first renders, and still fades
  in and out when it toggles. `appear` isn't one of VFadeTransition's props: it falls through to
  the Vue <Transition> it renders, which is where it belongs. The caller's attributes (mode,
  group, hide-on-leave, :appear="false"...) come after it, so the caller wins.
  A transition renders no element of its own, so there is no fr-fade-in class: it would land on
  the caller's element
-->
<template>
  <v-fade-transition appear>
    <slot />
  </v-fade-transition>
</template>
