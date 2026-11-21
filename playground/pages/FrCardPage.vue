<template>
  <h2 class="text-h5 mb-4">FrCard</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VCard</code>. Defaults: <code>variant="elevated"</code>, <code>elevation="2"</code>,
    <code>rounded="lg"</code>. Its slots are its own: <code>title</code>, <code>prepend</code> and
    <code>append</code> beside it, the body as the default slot, and <code>actions</code>, pushed to
    the right. None of them needs a Vuetify component inside. The body is rendered as is, so its
    spacing is the caller's (here, <code>px-4 pb-4</code> on a plain <code>&lt;p&gt;</code>).
  </p>
  <v-row>
    <v-col cols="12" md="4">
      <fr-card title="Defaults" subtitle="elevated, elevation 2, rounded lg">
        <p class="px-4 pb-4">A card with nothing overridden.</p>
      </fr-card>
    </v-col>
    <v-col cols="12" md="4">
      <fr-card title="With actions" subtitle="body and actions slots" prepend-icon="mdi-sprout">
        <p class="px-4 pb-4">The body is the default slot.</p>
        <template #actions>
          <fr-btn text="Cancel" />
          <fr-btn color="primary" text="Save" />
        </template>
      </fr-card>
    </v-col>
    <v-col cols="12" md="4">
      <fr-card
        title="Overridden"
        subtitle="variant outlined, rounded 0"
        variant="outlined"
        rounded="0"
      >
        <p class="px-4 pb-4">The caller's props win over the defaults.</p>
      </fr-card>
    </v-col>
    <v-col cols="12" md="4">
      <fr-card>
        <template #title>
          <span class="text-primary">Title slot</span>, replacing title and subtitle
        </template>
        <p class="px-4 pb-4">Anything can go in the title.</p>
      </fr-card>
    </v-col>
    <v-col cols="12" md="4">
      <fr-card title="Icon slots" subtitle="prepend and append">
        <template #prepend>
          <fr-icon color="primary" icon="mdi-star" />
        </template>
        <template #append>
          <fr-icon color="error" icon="mdi-close-circle" />
        </template>
        <p class="px-4 pb-4">Unlike <code>prepend-icon</code>, a slot's icon can take a colour.</p>
      </fr-card>
    </v-col>
  </v-row>
</template>
