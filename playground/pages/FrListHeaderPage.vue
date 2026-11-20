<script setup lang="ts">
const herbs = ['Basil', 'Coriander', 'Dill', 'Mint', 'Parsley', 'Sage', 'Thyme'];
const fruit = ['Squash', 'Strawberry', 'Tomato'];
</script>

<template>
  <h2 class="text-h5 mb-4">FrListHeader</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VListSubheader</code>. No defaults. Its text is its default slot or its
    <code>title</code>.
  </p>
  <fr-row>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">Default slot and title, as the nav drawer uses it</h3>
      <fr-list id="plain">
        <fr-list-header>Garden</fr-list-header>
        <fr-list-item prepend-icon="mdi-sprout" title="Plantings" />
        <fr-list-header title="Admin" />
        <fr-list-item prepend-icon="mdi-cog" title="Schedules" />
      </fr-list>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">color="primary", inset</h3>
      <fr-list id="styled">
        <fr-list-header color="primary" inset>Herbs</fr-list-header>
        <fr-list-item prepend-icon="mdi-leaf" title="Basil" />
      </fr-list>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">sticky, in a list that scrolls</h3>
      <fr-list id="sticky" max-height="200" class="overflow-y-auto">
        <fr-list-header sticky>Herbs</fr-list-header>
        <fr-list-item v-for="name in herbs" :key="name" :title="name" />
        <fr-list-header sticky>Fruit</fr-list-header>
        <fr-list-item v-for="name in fruit" :key="name" :title="name" />
      </fr-list>
    </fr-col>
  </fr-row>
</template>
