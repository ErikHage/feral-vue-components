<template>
  <h2 class="text-h5 mb-4">FrSheet</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VSheet</code>. Defaults: <code>rounded="lg"</code> and
    <code>padding="default"</code> (16px). <code>padding</code> is <code>'default'</code>,
    <code>'small'</code> (8px) or <code>'none'</code>.
  </p>
  <fr-row>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">As the plants page uses it: defaults only</h3>
      <fr-sheet id="plain">
        <p id="plain-text">Tomatoes, basil and beans.</p>
      </fr-sheet>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">As the plant edit page uses it: small, elevated, 30vh</h3>
      <fr-sheet id="small" padding="small" elevation="2" height="30vh">
        <fr-list :items="['Sow', 'Water', 'Harvest']" />
      </fr-sheet>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">padding="none", bordered, content to the edge</h3>
      <fr-sheet id="none" padding="none" border class="overflow-hidden">
        <div id="none-content" class="bg-success" style="height: 80px"></div>
      </fr-sheet>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">Overridden: :rounded="0", color="surface-variant"</h3>
      <fr-sheet id="square" :rounded="0" color="surface-variant">Square corners</fr-sheet>
    </fr-col>
  </fr-row>
</template>
