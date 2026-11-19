<template>
  <h2 class="text-h5 mb-4">FrCol</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VCol</code>; its default slot is the column's content. No defaults: every grid prop
    (<code>cols</code>, <code>sm</code>, <code>md</code>, <code>offset</code>,
    <code>order</code>...) passes through. Resize the window to see the breakpoints.
  </p>
  <h3 class="text-subtitle-1 mb-2">cols="12" md="6" lg="3"</h3>
  <v-row class="mb-6">
    <fr-col v-for="n in 4" :key="n" cols="12" md="6" lg="3">
      <fr-card :title="`Column ${n}`"><p class="px-4 pb-4">FrCards in FrCols.</p></fr-card>
    </fr-col>
  </v-row>
  <h3 class="text-subtitle-1 mb-2">Auto widths, an offset and an order</h3>
  <v-row>
    <fr-col><fr-code-block class="ma-0">fr-col</fr-code-block></fr-col>
    <fr-col cols="4" offset="1" order="first">
      <fr-code-block class="ma-0">cols 4, offset 1, order first</fr-code-block>
    </fr-col>
    <fr-col><fr-code-block class="ma-0">fr-col</fr-code-block></fr-col>
  </v-row>
</template>
