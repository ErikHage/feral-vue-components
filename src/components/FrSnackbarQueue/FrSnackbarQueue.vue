<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { VSnackbarQueue } from 'vuetify/components/VSnackbarQueue';
import { frSnackbarQueueDefaults } from './defaults';

defineOptions({ name: 'FrSnackbarQueue' });

/** The slots FrSnackbarQueue passes on, each only when given */
const slotNames = ['item', 'header', 'text', 'actions'];

function forwarded(slots: Record<string, unknown>): string[] {
  return slotNames.filter((name) => name in slots);
}

const queue = useTemplateRef<InstanceType<typeof VSnackbarQueue>>('queue');

defineExpose({
  /** Dismisses every snackbar, shown and waiting */
  clear: (): void => queue.value!.clear(),
});
</script>

<!--
  The caller's attributes (v-model, the queue of messages; timeout, location, color...) fall
  through onto VSnackbarQueue after the defaults, so the caller wins, and a message's own
  settings win over both. VSnackbarQueue renders no element of its own, and passes other
  attributes on to each snackbar but not class or style, so it carries no fr-* class: style the
  snackbars with content-class, or a message's own class. Each slot is passed on only when given:
  an item slot replaces the whole snackbar, header and text replace its parts, and an actions
  slot replaces the dismiss button
-->
<template>
  <v-snackbar-queue ref="queue" v-bind="frSnackbarQueueDefaults">
    <template v-for="name in forwarded($slots)" #[name]="scope">
      <slot :name="name" v-bind="scope" />
    </template>
  </v-snackbar-queue>
</template>
