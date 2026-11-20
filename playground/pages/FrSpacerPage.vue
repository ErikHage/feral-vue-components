<template>
  <h2 class="text-h5 mb-4">FrSpacer</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VSpacer</code>. No defaults. It grows to fill the free space in a flex row, pushing
    what follows it to the far end.
  </p>
  <fr-row>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">Between a form's buttons</h3>
      <div id="bar" class="d-flex pa-2 border rounded-lg">
        <fr-btn id="back" variant="text" text="Back" />
        <fr-spacer id="bar-spacer" />
        <fr-btn id="save" color="primary" text="Save" />
      </div>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">Two spacers centre the middle item</h3>
      <div id="centred" class="d-flex align-center pa-2 border rounded-lg">
        <fr-icon>mdi-leaf</fr-icon>
        <fr-spacer />
        <span id="middle">Basil</span>
        <fr-spacer />
        <fr-chip size="small">Herb</fr-chip>
      </div>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">Overridden: tag="span", hidden on phones</h3>
      <div class="d-flex pa-2 border rounded-lg">
        <span>Start</span>
        <fr-spacer id="span-spacer" tag="span" class="d-none d-sm-block" />
        <span>End</span>
      </div>
    </fr-col>
  </fr-row>
</template>
