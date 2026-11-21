<script setup lang="ts">
import type { PropType } from 'vue';
import {
  VCard,
  VCardActions,
  VCardItem,
  VCardSubtitle,
  VCardTitle,
} from 'vuetify/components/VCard';
import { VSpacer } from 'vuetify/components/VGrid';
import { frCardDefaults } from './defaults';

type VCardItemProps = InstanceType<typeof VCardItem>['$props'];

defineOptions({ name: 'FrCard' });

// Declared so they stop here: falling through, any of them makes VCard render a second item of
// its own. Runtime declarations, so the types can be VCardItem's without the compiler resolving them
const props = defineProps({
  title: { type: [String, Number] as PropType<string | number>, default: undefined },
  subtitle: { type: [String, Number] as PropType<string | number>, default: undefined },
  prependIcon: {
    type: [String, Array, Object, Function] as PropType<VCardItemProps['prependIcon']>,
    default: undefined,
  },
  appendIcon: {
    type: [String, Array, Object, Function] as PropType<VCardItemProps['appendIcon']>,
    default: undefined,
  },
  prependAvatar: { type: String, default: undefined },
  appendAvatar: { type: String, default: undefined },
});
</script>

<!--
  The caller's other attributes fall through onto VCard after the defaults, so the caller wins.
  Slots are FrCard's own, so content never needs a Vuetify component around it. prepend and append
  are passed on only when given: VCardItem draws that side for any slot it is handed, and the slot
  replaces the side's icon and avatar props
-->
<template>
  <v-card class="fr-card" v-bind="frCardDefaults">
    <v-card-item
      v-if="
        $slots.title ||
        $slots.prepend ||
        $slots.append ||
        props.title != null ||
        props.subtitle != null ||
        props.prependIcon ||
        props.appendIcon ||
        props.prependAvatar ||
        props.appendAvatar
      "
      :prepend-icon="props.prependIcon"
      :append-icon="props.appendIcon"
      :prepend-avatar="props.prependAvatar"
      :append-avatar="props.appendAvatar"
    >
      <template v-if="$slots.prepend" #prepend>
        <slot name="prepend" />
      </template>
      <template v-if="$slots.append" #append>
        <slot name="append" />
      </template>
      <slot name="title">
        <v-card-title v-if="props.title != null">{{ props.title }}</v-card-title>
        <v-card-subtitle v-if="props.subtitle != null">{{ props.subtitle }}</v-card-subtitle>
      </slot>
    </v-card-item>
    <slot />
    <v-card-actions v-if="$slots.actions">
      <v-spacer />
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>
