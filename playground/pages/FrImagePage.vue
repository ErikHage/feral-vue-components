<script setup lang="ts">
import { ref } from 'vue';

// A drawn logo, so the page needs no image files or network
const logo =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200">' +
      '<rect width="400" height="200" fill="#2e7d32"/>' +
      '<circle cx="200" cy="100" r="70" fill="#a5d6a7"/>' +
      '<path d="M200 150 C200 110 170 90 150 80 C175 80 195 95 200 115 C205 85 230 65 260 65 ' +
      'C235 80 205 105 200 150Z" fill="#1b5e20"/></svg>',
  );

const clicks = ref(0);
</script>

<template>
  <h2 class="text-h5 mb-4">FrImage</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VImg</code>. No defaults: centre it with <code>class="mx-auto"</code>, as the apps
    do. Its slots are VImg's, passed on only when given.
  </p>
  <fr-row>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">A logo, as the apps use it</h3>
      <fr-image id="logo" :src="logo" alt="Logo" max-width="250" class="mx-auto" />
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">
        cover, 1:1, clickable (clicked <span id="clicks">{{ clicks }}</span> times)
      </h3>
      <fr-image
        id="cover"
        :src="logo"
        alt="Logo, cropped"
        cover
        :aspect-ratio="1"
        max-width="150"
        rounded="lg"
        @click="clicks++"
      />
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">Default slot over the image</h3>
      <fr-image id="overlay" :src="logo" alt="Logo" max-width="250">
        <div class="d-flex fill-height align-end pa-2">
          <fr-chip size="small" color="primary" text="Bed 3" />
        </div>
      </fr-image>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">A missing image: error slot</h3>
      <fr-image id="broken" src="/missing.png" alt="Missing" max-width="250" :aspect-ratio="2">
        <template #placeholder>
          <div class="d-flex fill-height align-center justify-center">Loading</div>
        </template>
        <template #error>
          <div class="d-flex fill-height align-center justify-center text-error">No photo</div>
        </template>
      </fr-image>
    </fr-col>
  </fr-row>
</template>
