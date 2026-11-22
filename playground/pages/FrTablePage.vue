<script setup lang="ts">
const harvest = [
  { plant: 'Tomato', kilos: 12 },
  { plant: 'Courgette', kilos: 9 },
  { plant: 'Beans', kilos: 4 },
  { plant: 'Basil', kilos: 0.5 },
];
const total = harvest.reduce((sum, row) => sum + row.kilos, 0);
const weeks = Array.from({ length: 20 }, (_, i) => ({ week: i + 1, kilos: (i * 7) % 11 }));
</script>

<template>
  <h2 class="text-h5 mb-4">FrTable</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VTable</code>. Default: <code>density="compact"</code>. Rows go in the default slot;
    <code>top</code>, <code>caption</code> and <code>bottom</code> are passed on only when given.
    Given <code>actions</code>, <code>top</code> and the actions share one header bar.
  </p>
  <fr-row>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">As the plant tabs use it: key and value</h3>
      <fr-table id="details" aria-label="Plant details">
        <tbody>
          <tr>
            <th>Family</th>
            <td>Nightshade</td>
          </tr>
          <tr>
            <th>Spacing</th>
            <td>45 cm</td>
          </tr>
          <tr>
            <th>Days to harvest</th>
            <td>70</td>
          </tr>
        </tbody>
      </fr-table>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">top, caption and bottom slots; hover, striped</h3>
      <fr-table id="harvest" hover striped="even">
        <template #top><p class="text-overline px-4 pt-2">This season</p></template>
        <template #caption>
          <caption class="text-caption text-medium-emphasis">
            Kilos harvested per plant
          </caption>
        </template>
        <thead>
          <tr>
            <th>Plant</th>
            <th class="text-end">Kilos</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in harvest" :key="row.plant">
            <td>{{ row.plant }}</td>
            <td class="text-end">{{ row.kilos }}</td>
          </tr>
        </tbody>
        <template #bottom>
          <p id="total" class="text-end px-4 py-2 font-weight-bold">{{ total }} kg in all</p>
        </template>
      </fr-table>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">As the plantings table uses it: height and fixed header</h3>
      <fr-table id="weeks" height="200" fixed-header>
        <thead>
          <tr>
            <th>Week</th>
            <th class="text-end">Kilos</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in weeks" :key="row.week">
            <td>{{ row.week }}</td>
            <td class="text-end">{{ row.kilos }}</td>
          </tr>
        </tbody>
      </fr-table>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">actions slot: top on the left, actions on the right</h3>
      <fr-table id="with-actions" class="px-4">
        <template #top><p class="text-overline">Plants</p></template>
        <template #actions>
          <fr-btn size="small">Export</fr-btn>
          <fr-btn size="small" color="primary">Add</fr-btn>
        </template>
        <thead>
          <tr>
            <th>Plant</th>
            <th class="text-end">Kilos</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in harvest" :key="row.plant">
            <td>{{ row.plant }}</td>
            <td class="text-end">{{ row.kilos }}</td>
          </tr>
        </tbody>
      </fr-table>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">actions without top</h3>
      <fr-table id="actions-only">
        <template #actions>
          <fr-btn size="small" color="primary" class="mx-4 my-2">Add</fr-btn>
        </template>
        <tbody>
          <tr>
            <td>Tomato</td>
            <td class="text-end">12</td>
          </tr>
        </tbody>
      </fr-table>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">Overridden: density="default", gridlines="all"</h3>
      <fr-table id="roomy" density="default" gridlines="all">
        <tbody>
          <tr>
            <td>Roles</td>
            <td>Admin, Gardener</td>
          </tr>
        </tbody>
      </fr-table>
    </fr-col>
  </fr-row>
</template>
