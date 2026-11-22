<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VTable's props
  on an imported FrTable, and its own slots. GlobalComponentsUsage.vue covers the global
  registration
-->
<script setup lang="ts">
import { FrTable } from '../../src';
</script>

<template>
  <fr-table hover striped="odd" height="50vh" fixed-header aria-label="Harvest">
    <template #top><h3>This week</h3></template>
    <template #actions><button>Add</button></template>
    <template #caption
      ><caption>
        Harvest
      </caption></template
    >
    <thead>
      <tr>
        <th>Plant</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Tomato</td>
      </tr>
    </tbody>
    <template #bottom><p>1 in all</p></template>
  </fr-table>

  <!-- @vue-expect-error striped is 'even' or 'odd' -->
  <fr-table striped="all" />
  <fr-table>
    <!-- @vue-expect-error FrTable's slots are its own: VTable's wrapper slot is not one -->
    <template #wrapper>Wrapper</template>
  </fr-table>
</template>
