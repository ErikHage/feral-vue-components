<script setup lang="ts">
import { ref } from 'vue';

const spacing = ref<'default' | 'none'>('default');
const justify = ref<'start' | 'center' | 'end' | 'space-between' | 'space-around'>('start');
</script>

<template>
  <h2 class="text-h5 mb-4">FrRow</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VRow</code>; its default slot holds the columns. It takes <code>align</code>,
    <code>justify</code> and <code>align-content</code>, each also at a breakpoint
    (<code>align-md</code>...), rendered as Vuetify's utility classes, and <code>spacing</code>:
    <code>'none'</code> removes the gutters and the <code>fr-row</code> class; the default keeps
    both.
  </p>
  <fr-row class="mb-2" align="center">
    <fr-col cols="auto">
      <fr-chip-group v-model="spacing" mandatory color="primary">
        <fr-chip value="default" text="spacing: default" />
        <fr-chip value="none" text="spacing: none" />
      </fr-chip-group>
    </fr-col>
    <fr-col cols="auto">
      <fr-chip-group v-model="justify" mandatory color="primary">
        <fr-chip
          v-for="j in ['start', 'center', 'end', 'space-between', 'space-around']"
          :key="j"
          :value="j"
          :text="j"
        />
      </fr-chip-group>
    </fr-col>
  </fr-row>
  <fr-row :spacing="spacing" :justify="justify" class="mb-6">
    <fr-col v-for="n in 3" :key="n" cols="3">
      <fr-code-block class="ma-0">col {{ n }}</fr-code-block>
    </fr-col>
  </fr-row>
  <h3 class="text-subtitle-1 mb-2">align="end", columns of different heights</h3>
  <fr-row align="end" style="min-height: 160px">
    <fr-col><fr-code-block class="ma-0">short</fr-code-block></fr-col>
    <fr-col
      ><fr-code-block class="ma-0">{{ 'taller\n'.repeat(4) }}</fr-code-block></fr-col
    >
    <fr-col><fr-code-block class="ma-0">short</fr-code-block></fr-col>
  </fr-row>
</template>
