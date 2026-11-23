<template>
  <h2 class="text-h5 mb-4">FrContainer</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VContainer</code>; its default slot is its content. Default: <code>fluid</code>, so
    it fills the width. Every VContainer prop (<code>max-width</code>, <code>tag</code>...) passes
    through. The outlines show each container's width; the playground's own page sits in a container
    too.
  </p>
  <h3 class="text-subtitle-1 mb-2">Default: fluid, always the full width</h3>
  <fr-container class="mb-6" style="outline: 1px dashed rgb(var(--v-theme-primary))">
    <fr-row>
      <fr-col v-for="n in 3" :key="n"
        ><fr-code-block class="ma-0">col {{ n }}</fr-code-block></fr-col
      >
    </fr-row>
  </fr-container>
  <h3 class="text-subtitle-1 mb-2">max-width="400"</h3>
  <fr-container
    class="mb-6"
    :max-width="400"
    style="outline: 1px dashed rgb(var(--v-theme-primary))"
  >
    <fr-code-block class="ma-0">A narrow container</fr-code-block>
  </fr-container>
  <h3 class="text-subtitle-1 mb-2">:fluid="false": Vuetify's width for the breakpoint</h3>
  <fr-container :fluid="false" style="outline: 1px dashed rgb(var(--v-theme-primary))">
    <fr-code-block class="ma-0">Capped: 1000px at lg</fr-code-block>
  </fr-container>
</template>
