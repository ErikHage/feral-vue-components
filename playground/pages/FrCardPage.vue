<template>
  <h2 class="text-h5 mb-4">FrCard</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VCard</code>. Defaults: <code>variant="elevated"</code>, <code>elevation="2"</code>,
    <code>rounded="lg"</code>.
  </p>
  <v-row>
    <v-col cols="12" md="4">
      <fr-card title="Defaults" subtitle="elevated, elevation 2, rounded lg">
        <v-card-text>A card with nothing overridden.</v-card-text>
      </fr-card>
    </v-col>
    <v-col cols="12" md="4">
      <fr-card
        title="With actions"
        subtitle="title, subtitle and actions slots"
        prepend-icon="mdi-sprout"
      >
        <v-card-text>Slots pass straight through to VCard.</v-card-text>
        <template #actions>
          <v-spacer />
          <v-btn text="Cancel" />
          <v-btn color="primary" text="Save" />
        </template>
      </fr-card>
    </v-col>
    <v-col cols="12" md="4">
      <fr-card
        title="Overridden"
        subtitle="variant outlined, rounded 0"
        variant="outlined"
        rounded="0"
        text="The caller's props win over the defaults."
      />
    </v-col>
  </v-row>
</template>
