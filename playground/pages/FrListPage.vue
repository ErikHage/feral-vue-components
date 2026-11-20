<script setup lang="ts">
import { VListItem, VListSubheader } from 'vuetify/components';

// Until FrListItem and FrListHeader exist, the written rows use Vuetify's own
const plants = [
  { name: 'Tomato', plantId: 1, plantings: 3, icon: 'mdi-fruit-cherries' },
  { name: 'Basil', plantId: 2, plantings: 1, icon: 'mdi-leaf' },
  { name: 'Squash', plantId: 3, plantings: 2, icon: 'mdi-sprout' },
];

const grouped = [
  { type: 'subheader', title: 'Herbs' },
  {
    title: 'Basil',
    value: 'basil',
    children: [
      { title: 'Genovese', value: 'genovese' },
      { title: 'Thai', value: 'thai' },
    ],
  },
  { type: 'divider' },
  { type: 'subheader', title: 'Fruit' },
  { title: 'Tomato', value: 'tomato' },
];
</script>

<template>
  <h2 class="text-h5 mb-4">FrList</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VList</code>. Default: <code>density="compact"</code>. Rows are written in its
    default slot, or built from <code>items</code> and customised with the <code>title</code>,
    <code>subtitle</code>, <code>prepend</code> and <code>append</code> slots.
  </p>
  <fr-row>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">Written rows, lines="two" (as the apps use it)</h3>
      <fr-list id="written" lines="two">
        <v-list-item title="Activity type" subtitle="Watering" />
        <v-list-item title="Recurrence" subtitle="Every 3 days" />
        <v-list-item title="Date(s)" subtitle="1 May – 30 Sep" />
      </fr-list>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">From items, with prepend and append slots</h3>
      <fr-list id="from-items" :items="plants" item-title="name" item-value="plantId">
        <template #prepend="{ item }">
          <fr-icon :icon="item.icon" color="primary" start />
        </template>
        <template #append="{ item }">
          <fr-chip size="small" :text="`${item.plantings} planted`" />
        </template>
      </fr-list>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">Groups, subheaders, dividers: Vuetify's own</h3>
      <fr-list id="grouped-plain" :items="grouped" />
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">The same, with subheader and title slots</h3>
      <fr-list id="grouped-slots" :items="grouped">
        <template #subheader="{ props }">
          <v-list-subheader class="text-primary">{{ props.title }} ⟶</v-list-subheader>
        </template>
        <template #title="{ title }">
          <strong>{{ title }}</strong>
        </template>
      </fr-list>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">Overridden: density="default", nav</h3>
      <fr-list id="nav" density="default" nav>
        <v-list-item prepend-icon="mdi-sprout" title="Garden" />
        <v-list-item prepend-icon="mdi-calendar" title="Years" />
      </fr-list>
    </fr-col>
  </fr-row>
</template>
