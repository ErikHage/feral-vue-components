<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useTemplateRef, watch, type PropType } from 'vue';
import { VBtn } from 'vuetify/components/VBtn';
import { VSnackbarQueue } from 'vuetify/components/VSnackbarQueue';
import { toastAction, toastClears, toastQueue } from '../../utils/toast';
import { frSnackbarQueueDefaults } from './defaults';

defineOptions({ name: 'FrSnackbarQueue', inheritAttrs: false });

/** A message VSnackbarQueue takes: a string, or an object of a snackbar's props and its text */
type Message = NonNullable<InstanceType<typeof VSnackbarQueue>['$props']['modelValue']>[number];

const props = defineProps({
  /** The messages waiting to show. Left unbound, the queue shows the app's toasts (useToast) */
  modelValue: { type: Array as PropType<Message[]>, default: undefined },
});

const emit = defineEmits<{
  'update:modelValue': [value: Message[]];
}>();

/** The slots FrSnackbarQueue passes on, each only when given */
const slotNames = ['item', 'header', 'text', 'actions'];

function forwarded(slots: Record<string, unknown>): string[] {
  return slotNames.filter((name) => name in slots);
}

const queue = useTemplateRef<InstanceType<typeof VSnackbarQueue>>('queue');
const shared = toastQueue();
const bound = computed(() => props.modelValue !== undefined);

const messages = computed({
  get: () => props.modelValue ?? (shared.value as Message[]),
  set: (value: Message[]) => {
    if (bound.value) {
      emit('update:modelValue', value);
    } else {
      shared.value = value;
    }
  },
});

const alertText = ref('');

function isDanger(message: unknown) {
  return (message as { color?: string } | null)?.color === 'error';
}

function runAction(message: unknown, close: { onClick: () => void }) {
  toastAction(message)!.onClick();
  close.onClick();
}

/** The messages last seen waiting, to tell which the queue has since taken to show */
let waiting = [...messages.value];
let handingOver = false;

/**
 * A danger message is read out as an alert when the queue takes it off the array to show it: the
 * snackbar's own text is hidden from screen readers, which would only read it politely
 */
watch(
  messages,
  (now) => {
    if (handingOver) return;
    const taken = waiting.filter((message) => !now.includes(message));
    waiting = [...now];
    const danger = taken.filter(isDanger).at(-1) as { text: string } | undefined;
    if (danger) {
      alertText.value = '';
      void nextTick(() => (alertText.value = danger.text));
    }
  },
  { flush: 'sync' },
);

/**
 * VSnackbarQueue shows messages when the array's length changes, not those already there when it
 * mounts, so toasts put on the app's queue before then are handed over again
 */
onMounted(async () => {
  const pending = shared.value;
  if (bound.value || pending.length === 0) return;
  handingOver = true;
  shared.value = [];
  await nextTick();
  handingOver = false;
  shared.value = pending;
});

/** Dismisses every snackbar, shown and waiting */
function clear(): void {
  // What clear() takes off the array was never shown, so none of it is read out
  waiting = [];
  queue.value!.clear();
}

// The app's queue is cleared with useToast().clear(): at once, so a toast put on straight after
// isn't dismissed with the ones before it
if (!bound.value) {
  watch(toastClears(), clear, { flush: 'sync' });
}

defineExpose({
  /** Dismisses every snackbar, shown and waiting */
  clear,
});
</script>

<!--
  The caller's attributes (timeout, location, color...) go onto VSnackbarQueue after the
  defaults, so the caller wins, and a message's own settings win over both. VSnackbarQueue passes
  other attributes on to each snackbar but not class or style, so style the snackbars with
  content-class, or a message's own class. Each slot is passed on only when given: an item slot
  replaces the whole snackbar, header and text replace its parts, and an actions slot replaces
  the toast's action and dismiss buttons. Without an actions slot, a toast's action (useToast)
  shows as a button before the dismiss button (a bound queue with closable false gets no buttons,
  since only toasts carry actions). A danger message's text is announced through the
  alert region below instead of the snackbar's polite status
-->
<template>
  <v-snackbar-queue
    ref="queue"
    v-model="messages"
    v-bind="{ ...frSnackbarQueueDefaults, ...$attrs }"
  >
    <template v-for="name in forwarded($slots)" #[name]="scope">
      <slot :name="name" v-bind="scope" />
    </template>
    <template v-if="!$slots.text" #text="{ item }">
      <span :aria-hidden="isDanger(item) || undefined">{{ (item as { text?: string }).text }}</span>
    </template>
    <template
      v-if="!$slots.actions && ($attrs.closable !== false || !bound)"
      #actions="{ item, props: close }"
    >
      <v-btn
        v-if="toastAction(item)"
        class="fr-snackbar-queue__action"
        :text="toastAction(item)!.label"
        @click="runAction(item, close)"
      />
      <v-btn v-if="$attrs.closable !== false" class="fr-snackbar-queue__close" v-bind="close" />
    </template>
  </v-snackbar-queue>
  <div class="fr-snackbar-queue__alert d-sr-only" role="alert">{{ alertText }}</div>
</template>
