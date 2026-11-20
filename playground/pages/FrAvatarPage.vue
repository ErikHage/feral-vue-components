<template>
  <h2 class="text-h5 mb-4">FrAvatar</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VAvatar</code>. No defaults: it stays Vuetify's circle. Its slots are its own: what
    it shows as the default slot, in place of <code>image</code>, <code>icon</code> or
    <code>text</code>, and <code>badge</code>, the content of the badge the <code>badge</code> prop
    adds.
  </p>
  <div class="d-flex flex-wrap align-center ga-6">
    <div class="text-center">
      <fr-avatar color="primary" text="EH" />
      <div class="text-caption mt-1">text prop</div>
    </div>
    <div class="text-center">
      <fr-avatar color="secondary" icon="mdi-sprout" />
      <div class="text-caption mt-1">icon prop</div>
    </div>
    <div class="text-center">
      <fr-avatar color="success">
        <strong>VH</strong>
      </fr-avatar>
      <div class="text-caption mt-1">default slot</div>
    </div>
    <div class="text-center">
      <fr-avatar color="primary" text="EH" badge />
      <div class="text-caption mt-1">badge (dot)</div>
    </div>
    <div class="text-center">
      <fr-avatar color="primary" text="EH" badge>
        <template #badge>3</template>
      </fr-avatar>
      <div class="text-caption mt-1">badge slot</div>
    </div>
    <div class="text-center">
      <fr-avatar color="info" text="XL" size="x-large" rounded="lg" />
      <div class="text-caption mt-1">size x-large, rounded lg</div>
    </div>
    <div class="text-center">
      <fr-avatar color="warning" size="8" />
      <div class="text-caption mt-1">8px dot, as in the harvest app</div>
    </div>
  </div>
</template>
