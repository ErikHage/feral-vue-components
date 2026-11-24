<template>
  <h2 class="text-headline-small mb-4">FrAppLogo</h2>
  <p class="text-medium-emphasis mb-6">
    The Feral logo, white on a dark theme and near-black on a light one; toggle the theme to see
    both. A placeholder rooster until the real logo is drawn.
  </p>
  <h3 class="text-body-large mb-2">Sizes</h3>
  <div class="d-flex align-end ga-6 mb-6">
    <div v-for="size in [18, 22, 40, 96]" :key="size" class="d-flex flex-column align-center ga-2">
      <fr-app-logo :id="`logo-${size}`" :size="size" />
      <span class="text-caption text-medium-emphasis">{{ size }}px</span>
    </div>
  </div>
  <h3 class="text-body-large mb-2">Beside a title, as the navigation drawer shows it</h3>
  <div class="d-flex align-center ga-3">
    <fr-app-logo />
    <span class="text-body-medium font-weight-bold text-uppercase">Vigilant Harvest</span>
  </div>
</template>
