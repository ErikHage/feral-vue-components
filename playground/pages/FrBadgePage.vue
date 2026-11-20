<template>
  <h2 class="text-h5 mb-4">FrBadge</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VBadge</code>. No defaults. Its slots are its own: what the badge sits on as the
    default slot, and <code>badge</code>, the badge's own content in place of its
    <code>content</code> or <code>icon</code>.
  </p>
  <div class="d-flex flex-wrap align-center ga-10">
    <div class="text-center">
      <fr-badge :content="3" color="error">
        <v-icon icon="mdi-bell" size="large" />
      </fr-badge>
      <div class="text-caption mt-2">content prop</div>
    </div>
    <div class="text-center">
      <fr-badge :content="120" :max="99" color="primary">
        <v-icon icon="mdi-email" size="large" />
      </fr-badge>
      <div class="text-caption mt-2">max 99</div>
    </div>
    <div class="text-center">
      <fr-badge color="success" icon="mdi-check">
        <v-icon icon="mdi-sprout" size="large" />
      </fr-badge>
      <div class="text-caption mt-2">icon prop</div>
    </div>
    <div class="text-center">
      <fr-badge color="warning" dot>
        <v-icon icon="mdi-bell" size="large" />
      </fr-badge>
      <div class="text-caption mt-2">dot</div>
    </div>
    <div class="text-center">
      <fr-badge color="info">
        <v-icon icon="mdi-tray" size="large" />
        <template #badge><strong>new</strong></template>
      </fr-badge>
      <div class="text-caption mt-2">badge slot</div>
    </div>
    <div class="text-center">
      <fr-badge :content="2" color="error" inline>Inbox</fr-badge>
      <div class="text-caption mt-2">inline, text in the default slot</div>
    </div>
  </div>
</template>
