<script setup lang="ts">
import { VBtn } from 'vuetify/components/VBtn';
import { frIconBtnDefaults } from './defaults';

defineOptions({ name: 'FrIconBtn' });

const props = defineProps({
  /** The icon shown, e.g. `mdi-pencil` */
  icon: { type: String, required: true },
  /** What the button does, read out in place of the icon: `Edit Tomato` */
  label: { type: String, required: true },
});
</script>

<!--
  A VBtn showing only an icon, named for screen readers by `label`. Unlike a clickable FrIcon it is
  a real button: Enter and Space press it. The caller's attributes (color, size, variant, disabled,
  to, @click...) fall through onto VBtn after the defaults, so the caller wins
-->
<template>
  <v-btn
    class="fr-icon-btn"
    v-bind="frIconBtnDefaults"
    :icon="props.icon"
    :aria-label="props.label"
  />
</template>
