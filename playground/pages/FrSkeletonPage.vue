<script setup lang="ts">
import { ref } from 'vue';

const loading = ref(true);
</script>

<template>
  <h2 class="text-h5 mb-4">FrSkeleton</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VSkeletonLoader</code>. No defaults. Given a default slot, it shows that content
    once <code>loading</code> is false.
  </p>
  <fr-row>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">As the recipe page uses it</h3>
      <fr-skeleton
        id="recipe"
        type="heading, paragraph, paragraph"
        elevation="2"
        class="mx-auto"
        max-width="600"
      />
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">
        Wrapping content (loading: <span id="loading">{{ loading }}</span>)
        <fr-btn
          size="small"
          variant="text"
          :text="loading ? 'Finish loading' : 'Load again'"
          @click="loading = !loading"
        />
      </h3>
      <fr-skeleton id="wrapped" :loading="loading" type="card">
        <fr-card id="loaded" title="Tomato soup" subtitle="Serves 4">
          <p class="px-4 pb-4">Roast the tomatoes, then blend with stock.</p>
        </fr-card>
      </fr-skeleton>
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">A table, and a list item with avatar</h3>
      <fr-skeleton id="table" type="table-heading, table-thead, table-row@2" />
      <fr-skeleton id="list" type="list-item-avatar-two-line" class="mt-4" />
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-subtitle-1 mb-2">boilerplate: still, and not announced</h3>
      <fr-skeleton id="boilerplate" type="article" boilerplate />
    </fr-col>
  </fr-row>
</template>
