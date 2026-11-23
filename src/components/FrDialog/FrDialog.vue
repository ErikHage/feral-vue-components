<script setup lang="ts">
import { computed, type VNode } from 'vue';
import { useLocale } from 'vuetify';
import {
  VCard,
  VCardActions,
  VCardItem,
  VCardSubtitle,
  VCardText,
  VCardTitle,
} from 'vuetify/components/VCard';
import { VDefaultsProvider } from 'vuetify/components/VDefaultsProvider';
import { VDialog } from 'vuetify/components/VDialog';
import { VDivider } from 'vuetify/components/VDivider';
import { VSpacer } from 'vuetify/components/VGrid';
import { FrBtn } from '../FrBtn';
import { frCardActionsDefaults } from '../FrCard/defaults';
import { frDialogWidths, type FrDialogSize } from './size';

defineOptions({ name: 'FrDialog' });

const props = withDefaults(
  defineProps<{
    /** Shown in the card's header */
    title?: string;
    /** Shown under the title */
    subtitle?: string;
    /** Adds a close button to the header, which closes the dialog */
    closable?: boolean;
    /** Puts a divider under the header and above the actions */
    dividers?: boolean;
    /** How wide it may grow: small 500px, medium 600px, large 800px */
    size?: FrDialogSize;
    /** Overrides `size` */
    maxWidth?: string | number;
    /** Clicking outside or pressing Esc doesn't close it */
    persistent?: boolean;
    /** Keeps the header and actions in place while the body scrolls */
    scrollable?: boolean;
    /** Set on the card */
    id?: string;
    /**
     * Adds a Cancel button that closes the dialog and emits cancel. It is in the theme's error
     * colour, or neutral when the confirm button already is, so a dialog never has two red buttons
     */
    cancelText?: string;
    /** Adds a confirm button, last on the right, that emits confirm */
    confirmText?: string;
    /** The confirm button's colour: the theme's primary unless, say, it deletes (`error`) */
    confirmColor?: string;
    /** Disables the confirm button, until the form is valid, say */
    confirmDisabled?: boolean;
    /** Shows the confirm button loading, while it saves */
    confirmLoading?: boolean;
  }>(),
  {
    title: undefined,
    subtitle: undefined,
    size: 'small',
    maxWidth: undefined,
    id: undefined,
    cancelText: undefined,
    confirmText: undefined,
    confirmColor: 'primary',
  },
);

const emit = defineEmits<{
  /** The confirm button was pressed. The dialog stays open: close it once the work is done */
  confirm: [];
  /** The Cancel button was pressed, and the dialog closed */
  cancel: [];
}>();

// Open or closed. Without a v-model from the caller it is FrDialog's own, so the activator
// alone opens it and the close button still closes it
const model = defineModel<boolean>({ default: false });

const slots = defineSlots<{
  /** What opens the dialog: bind `props` onto it */
  activator?: (scope: { isActive: boolean; props: Record<string, unknown> }) => VNode[];
  /** The body, inside the card's text */
  default?: () => VNode[];
  /** Buttons along the bottom, pushed to the right: primary text buttons unless they say otherwise */
  actions?: () => VNode[];
}>();

const { t } = useLocale();

const width = computed(() => props.maxWidth ?? frDialogWidths[props.size]);
const hasHeader = computed(() => props.title != null || props.subtitle != null || props.closable);
const hasActions = computed(
  () => !!slots.actions || props.cancelText != null || props.confirmText != null,
);

function cancel() {
  model.value = false;
  emit('cancel');
}
</script>

<!--
  A VDialog laid out as a VCard: header, body, actions. The caller's other attributes
  (fullscreen, transition...) fall through onto VDialog. The close button is an FrBtn, and so are
  Cancel and the confirm button, after the actions slot's own buttons
-->
<template>
  <v-dialog
    v-model="model"
    class="fr-dialog"
    :max-width="width"
    :persistent="props.persistent"
    :scrollable="props.scrollable"
  >
    <template v-if="$slots.activator" #activator="scope">
      <slot name="activator" v-bind="scope" />
    </template>
    <v-card :id="props.id">
      <v-card-item v-if="hasHeader">
        <v-card-title v-if="props.title != null">{{ props.title }}</v-card-title>
        <v-card-subtitle v-if="props.subtitle != null">{{ props.subtitle }}</v-card-subtitle>
        <template v-if="props.closable" #append>
          <fr-btn
            class="fr-dialog__close"
            icon="$close"
            variant="text"
            size="small"
            :aria-label="t('$vuetify.close')"
            @click="model = false"
          />
        </template>
      </v-card-item>
      <v-divider v-if="props.dividers && hasHeader" />
      <v-card-text>
        <slot />
      </v-card-text>
      <template v-if="hasActions">
        <v-divider v-if="props.dividers" />
        <v-card-actions>
          <v-spacer />
          <v-defaults-provider :defaults="frCardActionsDefaults">
            <slot name="actions" />
            <fr-btn
              v-if="props.cancelText != null"
              class="fr-dialog__cancel"
              :color="props.confirmColor === 'error' ? 'default' : 'error'"
              :text="props.cancelText"
              @click="cancel"
            />
            <fr-btn
              v-if="props.confirmText != null"
              class="fr-dialog__confirm"
              :color="props.confirmColor"
              :text="props.confirmText"
              :disabled="props.confirmDisabled"
              :loading="props.confirmLoading"
              @click="emit('confirm')"
            />
          </v-defaults-provider>
        </v-card-actions>
      </template>
    </v-card>
  </v-dialog>
</template>
