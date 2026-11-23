<template>
  <h2 class="text-headline-small mb-4">FrPageTitle</h2>
  <p class="text-medium-emphasis mb-6">
    A page's title, bold and scaled with the window, as an <code>h1</code>; the
    <code>actions</code> slot sits on the right and wraps below it when there isn't room. Narrow the
    window to see both.
  </p>
  <h3 class="text-body-large mb-2">With actions</h3>
  <fr-page-title id="with-actions" title="Manage Plants" tag="h2" class="mb-6">
    <template #actions>
      <fr-btn text="Add" />
      <fr-btn text="Refresh" color="default" />
    </template>
  </fr-page-title>
  <h3 class="text-body-large mb-2">Title only</h3>
  <fr-page-title title="Harvests" tag="h2" class="mb-6" />
  <h3 class="text-body-large mb-2">FrPage: a fluid container, its title, then the content</h3>
  <fr-page title="Activity Schedules" class="border rounded-lg">
    <template #actions><fr-btn text="Create" /></template>
    <fr-card title="A card in the page">The content runs the full width.</fr-card>
  </fr-page>
</template>
