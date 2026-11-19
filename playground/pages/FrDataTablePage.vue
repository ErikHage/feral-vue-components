<script setup lang="ts">
import { ref } from 'vue';

const headers = [
  { title: 'Username', key: 'username' },
  { title: 'Role', key: 'role' },
  { title: 'Plantings', key: 'plantings', align: 'end' as const },
  { title: '', key: 'actions', sortable: false, align: 'end' as const },
];
const users = ref([
  { userId: 1, username: 'erik', role: 'admin', plantings: 42 },
  { userId: 2, username: 'robin', role: 'grower', plantings: 17 },
  { userId: 3, username: 'sam', role: 'grower', plantings: 8 },
  { userId: 4, username: 'alex', role: 'viewer', plantings: 0 },
]);
const loading = ref(false);
const last = ref('nothing yet');

function reload() {
  loading.value = true;
  const kept = users.value;
  users.value = [];
  setTimeout(() => {
    users.value = kept;
    loading.value = false;
  }, 1500);
}
</script>

<template>
  <h2 class="text-h5 mb-4">FrDataTable</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VDataTable</code>. Defaults: <code>density="compact"</code>, <code>hover</code>. It
    passes on the slots that fill a cell or header (<code>item.&lt;key&gt;</code>,
    <code>header.&lt;key&gt;</code>), and <code>no-data</code> and <code>loading</code>.
  </p>
  <h3 class="text-subtitle-1 mb-2">
    As in the admin pages, with an actions column (last: {{ last }})
  </h3>
  <fr-data-table
    :headers="headers"
    :items="users"
    item-value="userId"
    :loading="loading"
    class="elevation-1 mb-2"
  >
    <template #item.role="{ value }">
      <fr-chip size="small" :color="value === 'admin' ? 'primary' : undefined" :text="value" />
    </template>
    <template #header.plantings="{ column }">🌱 {{ column.title }}</template>
    <template #item.actions="{ item }">
      <fr-btn
        icon="mdi-pencil"
        variant="text"
        size="small"
        :aria-label="`Edit ${item.username}`"
        @click="last = `edit ${item.username}`"
      />
      <fr-btn
        icon="mdi-delete"
        variant="text"
        size="small"
        :aria-label="`Delete ${item.username}`"
        @click="last = `delete ${item.username}`"
      />
    </template>
    <template #loading>Fetching users…</template>
  </fr-data-table>
  <fr-btn class="mb-6" size="small" text="Reload (shows the loading slot)" @click="reload" />
  <h3 class="text-subtitle-1 mb-2">No items: the no-data slot</h3>
  <fr-data-table :headers="headers" :items="[]">
    <template #no-data>No users yet. Invite one first.</template>
  </fr-data-table>
</template>
