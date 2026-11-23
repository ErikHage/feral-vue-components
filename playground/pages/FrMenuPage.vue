<script setup lang="ts">
import { ref } from 'vue';

const lastAction = ref('none');
const open = ref(false);
const hovered = ref(false);
</script>

<template>
  <h2 class="text-headline-small mb-4">FrMenu</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VMenu</code>. No defaults. Bind the <code>activator</code> slot's
    <code>props</code> onto what opens it; the default slot is the menu.
  </p>
  <fr-row>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">
        Actions menu (last action: <span id="last-action">{{ lastAction }}</span>)
      </h3>
      <fr-menu id="actions">
        <template #activator="{ props }">
          <fr-btn v-bind="props" icon="mdi-dots-vertical" variant="text" aria-label="Actions" />
        </template>
        <fr-list>
          <fr-list-item prepend-icon="mdi-pencil" title="Edit" @click="lastAction = 'edit'" />
          <fr-list-item prepend-icon="mdi-delete" title="Delete" @click="lastAction = 'delete'" />
        </fr-list>
      </fr-menu>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">
        v-model, stays open on click, closes from inside (open: <span id="open">{{ open }}</span>)
      </h3>
      <fr-menu v-model="open" :close-on-content-click="false" location="end">
        <template #activator="{ props, isActive }">
          <fr-btn v-bind="props" :text="isActive ? 'Hide filters' : 'Filters'" />
        </template>
        <template #default="{ isActive }">
          <fr-card id="filters" title="Filters" min-width="250">
            <div class="px-4"><fr-checkbox label="Only this year" hide-details /></div>
            <template #actions>
              <fr-btn text="Done" @click="isActive.value = false" />
            </template>
          </fr-card>
        </template>
      </fr-menu>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">
        open-on-hover (open: <span id="hovered">{{ hovered }}</span>)
      </h3>
      <fr-menu v-model="hovered" open-on-hover>
        <template #activator="{ props }">
          <fr-chip v-bind="props" text="Hover me" />
        </template>
        <fr-card text="Planted 3 May, 2 beds" />
      </fr-menu>
    </fr-col>
  </fr-row>
</template>
