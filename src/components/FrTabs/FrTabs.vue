<script setup lang="ts">
import { computed, type HTMLAttributes, type PropType, type StyleValue } from 'vue';
import { VTab, VTabs } from 'vuetify/components/VTabs';
import { frTabsDefaults } from './defaults';
import type { FrTabsOption, FrTabsValue } from './types';

defineOptions({ name: 'FrTabs', inheritAttrs: false });

const props = defineProps({
  /** The tabs, in order: strings, or { title, value } objects */
  options: { type: Array as PropType<readonly FrTabsOption[]>, default: () => [] },
});

const model = defineModel<FrTabsValue>();

const tabs = computed(() =>
  props.options.map((option) =>
    typeof option === 'string' ? { title: option, value: option } : option,
  ),
);

// class and style dress the wrapping div; every other attribute is meant for the tabs
function rootAttrs(attrs: Record<string, unknown>): Pick<HTMLAttributes, 'class' | 'style'> {
  return { class: attrs.class as HTMLAttributes['class'], style: attrs.style as StyleValue };
}

function tabsAttrs(attrs: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(attrs).filter(([name]) => name !== 'class' && name !== 'style'),
  );
}
</script>

<!--
  A div holds the tabs and, after them, the default slot's content, given the selected tab. The
  caller's attributes (align-tabs, grow, bg-color...) go onto VTabs after the defaults, so the
  caller wins; only class and style stay on the div. VTabs selects the first tab when v-model is
  empty, so the slot always has a tab once mounted. The content div is drawn only for a slot
-->
<template>
  <div class="fr-tabs" v-bind="rootAttrs($attrs)">
    <v-tabs v-model="model" v-bind="{ ...frTabsDefaults, ...tabsAttrs($attrs) }">
      <v-tab
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
        :text="tab.title"
        :prepend-icon="tab.prependIcon"
        :disabled="tab.disabled"
      />
    </v-tabs>
    <div v-if="$slots.default" class="fr-tabs__content">
      <slot :tab="model" />
    </div>
  </div>
</template>
