<script setup lang="ts">
import { computed, mergeProps, type PropType } from 'vue';
import { VBtn } from 'vuetify/components/VBtn';
import { VCard } from 'vuetify/components/VCard';
import { VList, VListItem } from 'vuetify/components/VList';
import { VMenu } from 'vuetify/components/VMenu';
import { frThemeMenuOptions, type FrThemeMenuValue } from './options';

defineOptions({ name: 'FrThemeMenu', inheritAttrs: false });

const props = defineProps({
  /** The theme picked: `light`, `dark`, or `system` to follow the device */
  modelValue: {
    type: String as PropType<FrThemeMenuValue>,
    required: true,
    validator: (value: string) => frThemeMenuOptions.some((option) => option.value === value),
  },
});

const emit = defineEmits<{
  /** A theme was picked */
  'update:modelValue': [value: FrThemeMenuValue];
}>();

/** The picked theme's icon, shown on the button; a neutral one if the value is none of them */
const selectedIcon = computed(
  () =>
    frThemeMenuOptions.find((option) => option.value === props.modelValue)?.icon ??
    'mdi-theme-light-dark',
);
</script>

<!--
  A button showing the picked theme's icon, opening a menu of Light, Dark and System. It only
  reports the pick through v-model: the host applies it (System meaning the device's preference).
  The caller's attributes (an id, say) land on the button, merged with the props that open the menu
-->
<template>
  <v-menu location="bottom end">
    <template #activator="{ props: menuProps }">
      <v-btn
        v-bind="mergeProps(menuProps, $attrs)"
        :icon="selectedIcon"
        variant="text"
        density="comfortable"
        aria-label="Theme"
      />
    </template>
    <v-card min-width="160" class="fr-theme-menu pa-2">
      <v-list density="compact" nav role="menu" aria-label="Theme">
        <v-list-item
          v-for="option in frThemeMenuOptions"
          :key="option.value"
          role="menuitemradio"
          :aria-checked="String(props.modelValue === option.value)"
          :prepend-icon="option.icon"
          :title="option.title"
          :active="props.modelValue === option.value"
          @click="emit('update:modelValue', option.value)"
        />
      </v-list>
    </v-card>
  </v-menu>
</template>
