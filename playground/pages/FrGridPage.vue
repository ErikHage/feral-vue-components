<script setup lang="ts">
const plots = ['North bed', 'Greenhouse', 'Herb spiral', 'Orchard', 'Cold frame'];
</script>

<template>
  <h2 class="text-h5 mb-4">FrGrid</h2>
  <p class="text-medium-emphasis mb-6">
    Custom: a CSS grid, each child a cell. Columns of at least <code>min-item-width</code> (240px)
    up to <code>max-columns</code>, or in the proportions of <code>weights</code>.
  </p>

  <h3 class="text-subtitle-1 mb-2">Defaults: as many 240px columns as fit, stretched</h3>
  <fr-grid id="plain" class="mb-6">
    <fr-card v-for="plot in plots" :key="plot" :title="plot" />
  </fr-grid>

  <h3 class="text-subtitle-1 mb-2">max-columns 3, gap small, uniform rows</h3>
  <fr-grid id="capped" :max-columns="3" gap="small" uniform-rows class="mb-6">
    <fr-card title="North bed" text="Tomatoes, basil and beans, sown in April and May." />
    <fr-card title="Greenhouse" />
    <fr-card title="Herb spiral" />
  </fr-grid>

  <h3 class="text-subtitle-1 mb-2">
    weights [2, 1]: stacks once the narrow column would be under 240px
  </h3>
  <fr-grid id="weighted" :weights="[2, 1]" :min-row-height="80" class="mb-6">
    <fr-sheet border>Plot map</fr-sheet>
    <fr-sheet border>Details</fr-sheet>
  </fr-grid>

  <h3 class="text-subtitle-1 mb-2">A long word in a narrow cell, kept inside its column</h3>
  <fr-grid id="long" :min-item-width="120" :stretch="false">
    <fr-sheet border padding="small">Pneumonoultramicroscopicsilicovolcanoconiosis</fr-sheet>
    <fr-sheet border padding="small">Short</fr-sheet>
  </fr-grid>
</template>
