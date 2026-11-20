<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get FrFieldGroup's
  props and slots. GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { FrFieldGroup, FrSelect } from '../../src';
</script>

<template>
  <fr-field-group
    label="Sowing time"
    icon="mdi-clock-outline"
    size="small"
    required
    box-id="sowing-time"
  >
    <template #description>24-hour clock</template>
    <fr-select :items="[6, 7, 8]" class="field-group--field" />
    <fr-select :items="[0, 30]" class="field-group--field" />
  </fr-field-group>
  <fr-field-group label="Hour" field-id="hour" description="The hour to sow">
    <input id="hour" />
  </fr-field-group>

  <!-- @vue-expect-error size is 'default' or 'small' -->
  <fr-field-group size="large" />
  <!-- @vue-expect-error required is a boolean -->
  <fr-field-group :required="'yes'" />
</template>
