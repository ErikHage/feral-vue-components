<template>
  <h2 class="text-h5 mb-4">FrDivider</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VDivider</code>. No defaults. With something in its default slot, the line splits
    around it.
  </p>
  <h3 class="text-subtitle-1">Plain, with margin classes as the apps use it</h3>
  <fr-divider class="my-4" />
  <h3 class="text-subtitle-1">Default slot</h3>
  <fr-divider class="my-4">or</fr-divider>
  <fr-divider class="my-4"><fr-chip size="small" color="primary" text="2026" /></fr-divider>
  <h3 class="text-subtitle-1">thickness 3, dashed, color primary</h3>
  <fr-divider class="my-4" :thickness="3" variant="dashed" color="primary" />
  <h3 class="text-subtitle-1 mb-2">Vertical, between buttons</h3>
  <div class="d-flex align-center ga-2" style="height: 36px">
    <fr-btn variant="text" text="Edit" />
    <fr-divider vertical />
    <fr-btn variant="text" text="Delete" />
  </div>
</template>
