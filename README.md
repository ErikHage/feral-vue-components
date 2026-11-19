# @feral-auth/vue-components

`Fr*` wrappers around [Vuetify](https://vuetifyjs.com) 4 components, sharing one design and theme
across the feral apps.

## Install

```sh
npm install @feral-auth/vue-components vue vuetify @mdi/font
```

`vue` (^3.5) and `vuetify` (^4.3) are peer dependencies: the app owns its single copy of each.
`@mdi/font` is optional, and needed only for the mdi icons the theme is set up to use.

## Set up

```ts
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import { createFeralVuetifyOptions, FeralComponents } from '@feral-auth/vue-components';

createApp(App)
  .use(createVuetify(createFeralVuetifyOptions()))
  .use(FeralComponents) // optional: registers every Fr* component globally
  .mount('#app');
```

Vuetify registers none of its own components by default. Register them in the app as usual,
with `vite-plugin-vuetify`'s auto-import or by passing them in:
`createFeralVuetifyOptions({ components, directives })`. The `Fr*` components import the Vuetify
parts they use themselves, so they work either way.

`createFeralVuetifyOptions(overrides?)` returns Vuetify options holding:

- two themes, `feralDark` (the default) and `feralLight`. Their colours are Vuetify's own dark and
  light colours until the feral palette is designed;
- the mdi icon set.

Overrides are merged in deeply, so an app changes only what it names, e.g.
`createFeralVuetifyOptions({ theme: { defaultTheme: 'feralLight' } })`.

## Components

Each `Fr*` component wraps one Vuetify component (or, for `FrCodeBlock`, a plain element). Its props, attributes and events reach the
Vuetify component, and it's typed with that component's props. Where a component has slots of its
own, they're laid out for you, so content never needs a Vuetify component around it. Each one's
root carries a class named after it (`fr-card`, `fr-accordion-panel`...) to style or select by.
The wrapper's defaults are structural (how it looks, never how it behaves), and anything the
caller passes wins.

| Component          | Wraps               | Slots                                              | Defaults                                              |
| ------------------ | ------------------- | -------------------------------------------------- | ----------------------------------------------------- |
| `FrAccordion`      | `VExpansionPanels`  | default, holding the panels                        | `variant="default"`, `elevation="2"`, `rounded="lg"`  |
| `FrAccordionPanel` | `VExpansionPanel`   | `title`, `actions`, default                        | none: it takes its look from `FrAccordion`            |
| `FrAlert`          | `VAlert`            | `title`, default, `append`                         | `variant="tonal"`, `rounded="lg"`                     |
| `FrAutocomplete`   | `VAutocomplete`     | `item`, `no-data`                                  | `variant="solo"`, `density="compact"`, `rounded="lg"` |
| `FrAvatar`         | `VAvatar`           | default, `badge`                                   | none: it stays Vuetify's circle                       |
| `FrBadge`          | `VBadge`            | default, `badge`                                   | none                                                  |
| `FrBreadcrumbs`    | `VBreadcrumbs`      | `divider`                                          | dividers are chevrons, not `/`                        |
| `FrBtn`            | `VBtn`              | default, `prepend`, `append`                       | `rounded="lg"`, except icon buttons, which stay round |
| `FrCard`           | `VCard`             | `title`, default, `actions`                        | `variant="elevated"`, `elevation="2"`, `rounded="lg"` |
| `FrCheckbox`       | `VCheckbox`         | `label`                                            | `density="compact"`                                   |
| `FrChip`           | `VChip`             | default, `prepend`, `append`                       | none: it stays Vuetify's pill                         |
| `FrChipGroup`      | `VChipGroup`        | default, holding the chips                         | none                                                  |
| `FrCodeBlock`      | a `<pre>`           | default, the code                                  | padded, rounded, faint theme background               |
| `FrCol`            | `VCol`              | default, the content                               | none                                                  |
| `FrContainer`      | `VContainer`        | default, the content                               | none                                                  |
| `FrDataTable`      | `VDataTable`        | `item.<key>`, `header.<key>`, `no-data`, `loading` | `density="compact"`, `hover`                          |
| `FrDialog`         | `VDialog` + `VCard` | `activator`, default, `actions`                    | `size="small"` (500px)                                |
| `FrDivider`        | `VDivider`          | default, in the middle of the line                 | none                                                  |
| `FrRow`            | `VRow`              | default, the columns                               | `spacing="default"`: gutters, and the `fr-row` class  |

Use them by name, or everywhere once `FeralComponents` is installed:

```vue
<script setup lang="ts">
import { FrCard } from '@feral-auth/vue-components';
</script>

<template>
  <fr-card title="Harvest" subtitle="Tomatoes">
    <p class="px-4">Three kilos this week.</p>
    <template #actions><fr-btn text="Save" /></template>
  </fr-card>
</template>
```

The defaults are exported too (`frCardDefaults`, `frAccordionDefaults`, `frAlertDefaults`,
`frAutocompleteDefaults`, `frBtnDefaults`, `frCheckboxDefaults`, `frDataTableDefaults`), for anything that needs to match them.

- **`FrCard`**: the `title` slot replaces the title and subtitle, which otherwise come from their
  props. The body is the default slot, rendered as is with no padding of its own, so its spacing is
  the caller's (`<p class="px-4 pb-4">`). `actions` lines its content up on the right. VCard's
  own slots (`loader`, `image`, `prepend`...) are not forwarded.
- **`FrAlert`**: `title` falls back to the `title` prop, the message is the default slot, falling
  back to `text`, and `append` sits beside it on the right, before the close button. VAlert's
  `prepend` and `close` slots are not forwarded; its props (`type`, `icon`, `closable`,
  `v-model`...) all work.
- **`FrAutocomplete`**: `item` fills one row of the list, and gets your own item (typed from
  `items`) and its index; FrAutocomplete renders the row around it, so selecting still works.
  `no-data` replaces `no-data-text` when nothing matches. VAutocomplete's other slots (`chip`,
  `selection`, `prepend-item`...) are not forwarded; its props all work.

  ```vue
  <fr-autocomplete v-model="plantId" :items="plants" item-title="friendlyName" item-value="plantId">
    <template #item="{ item }">{{ item.friendlyName }} ({{ item.family }})</template>
  </fr-autocomplete>
  ```

- **`FrAvatar`**: the default slot is what it shows (initials, say), in place of its `image`,
  `icon` or `text`, and `badge` fills the badge that the `badge` prop adds, which is a dot
  without it. It sets no defaults: `rounded="lg"`, as on the others, would square off the circle.

- **`FrBadge`**: the default slot is what the badge sits on (an icon, a button), and `badge` is
  the badge's own content, in place of its `content` or `icon`. It sets no defaults.

- **`FrBreadcrumbs`**: every divider is a chevron (`$next`, chevron-right in mdi) unless you
  pass `divider` (shown as text) or fill the `divider` slot, which gets the item before it (typed
  from `items`) and its index. VBreadcrumbs' `item`, `title` and `prepend` slots are not
  forwarded; `icon` still adds a leading icon.

- **`FrBtn`**: the label is the default slot, in place of `text` (or `icon`), and `prepend` and
  `append` replace `prepend-icon` and `append-icon`. Its only default is `rounded="lg"`: it stays
  Vuetify's elevated button, and an icon button (`icon` set) stays a circle. VBtn's `loader` slot is not forwarded; `loading` still works.

- **`FrCheckbox`**: the `label` slot is the label's content, in place of the `label` prop (a link,
  say); it still sits in the checkbox's own `<label>`, so clicking it still toggles. Its only
  default is `density="compact"`, the feral fields' density. VCheckbox's other slots (`input`,
  `prepend`, `append`, `details`...) are not forwarded.

- **`FrChip`**: the label is the default slot, in place of `text`, and gets the chip's selection
  state (`isSelected`, `toggle`...) inside a chip group; `prepend` and `append` replace their icon
  or avatar. It sets no defaults: `rounded="lg"` would square off the pill. VChip's `close` and
  `filter` slots are not forwarded; `closable` and `filter` still work.

- **`FrChipGroup`**: holds `FrChip`s, and hands its `color`, `variant`, `filter` and `disabled`
  down to them (FrChip sets no defaults, so nothing gets in the way). It sets no defaults itself:
  add `column` to wrap the chips instead of scrolling them in one row.

  ```vue
  <fr-chip-group v-model="tags" multiple column filter>
    <fr-chip v-for="tag in offeredTags" :key="tag" :value="tag" :text="tag" />
  </fr-chip-group>
  ```

- **`FrCodeBlock`**: a `<pre>` whose default slot is the code, shown exactly as written. It is
  padded (16px), rounded (8px), scrolls sideways when a line is too long, and sits on the theme's
  text colour at 6% opacity, so it suits dark and light. That look is an inline style, so the
  library still ships no CSS. Change it with `style`, which merges in after it and wins
  (`style="padding: 8px"`); a clashing Vuetify utility class (`pa-2`, `rounded-0`) can't, since
  Vuetify 4's classes are layered CSS and an inline style beats them. Classes that don't clash,
  such as margins, work as usual.

  ```vue
  <fr-code-block>npm install @feral-auth/vue-components</fr-code-block>
  ```

- **`FrDataTable`**: passes on the slots that fill a cell or a header, `item.<key>` and
  `header.<key>` for the column whose `key` follows the dot, plus `no-data` and `loading`. A cell
  slot gets your own item (typed from `items`), the cell's `value`, its `index` and `column`. Row
  and body slots (`item`, `body`, `headers`, `top`...) are not passed on: they need Vuetify
  markup. Its defaults are `density="compact"` and `hover`; a shadow is yours to add, e.g.
  `class="elevation-1"`. Note Vuetify 3+ identifies rows with `item-value`, not Vuetify 2's
  `item-key`.

  ```vue
  <fr-data-table :headers="headers" :items="users" item-value="userId" :loading="loading">
    <template #item.actions="{ item }">
      <fr-btn icon="mdi-pencil" variant="text" size="small" @click="edit(item)" />
    </template>
  </fr-data-table>
  ```

- **`FrDialog`**: a `VDialog` laid out as a card. Its props:
  - `title` and `subtitle` fill the header; `closable` adds a close button there (an `FrBtn`).
  - `v-model` opens and closes it. Without one, the `activator` slot opens it on its own, and the
    close button still closes it.
  - `size` is `small` (500px, the default), `medium` (600px) or `large` (800px); `max-width`
    overrides it.
  - `dividers` puts a divider under the header and above the actions.
  - `persistent` and `scrollable` go to the dialog, both off by default; `id` goes on the card.

  Its slots: `activator` (bind its `props` onto your button), the body as the default slot,
  inside the card's text, and `actions`, pushed to the right. Other `VDialog` props
  (`fullscreen`, `transition`...) pass through.

  ```vue
  <fr-dialog v-model="open" title="Edit planting" closable persistent>
    <template #activator="{ props }"><fr-btn v-bind="props" text="Edit" /></template>
    <fr-autocomplete v-model="plantId" :items="plants" label="Plant" />
    <template #actions>
      <fr-btn variant="text" text="Cancel" @click="open = false" />
      <fr-btn color="primary" text="Save" @click="save" />
    </template>
  </fr-dialog>
  ```

- **`FrDivider`**: a plain line, or, with something in its default slot, a line split around it
  (`<fr-divider>or</fr-divider>`). It sets no defaults; `vertical`, `inset`, `thickness`,
  `variant` and the rest pass through.

- **`FrRow`**: holds `FrCol`s. It takes `align` and `justify`, passed on to VRow, and `spacing`:
  `'none'` removes the gutters between columns (`no-gutters`) and leaves off the `fr-row` class,
  while the default, `'default'`, keeps Vuetify's gutters and adds `fr-row`. Every other VRow
  prop (`density`, `tag`...) passes through.

  With `FrContainer` (a VContainer, no defaults) around them, they lay out a page:

  ```vue
  <fr-container>
    <fr-row align="center" justify="space-between">
      <fr-col cols="12" md="6">Left</fr-col>
      <fr-col cols="12" md="6">Right</fr-col>
    </fr-row>
  </fr-container>
  ```

- **`FrAccordionPanel`**: `title` falls back to the `title` prop, `actions` replaces the expand
  icon, and the body is the default slot, falling back to `text`. It carries no defaults because
  `FrAccordion` hands its own down to its panels.

```vue
<fr-accordion>
  <fr-accordion-panel title="Seeds">Sow in March.</fr-accordion-panel>
</fr-accordion>
```

## Development

| Script                  | Does                                                                     |
| ----------------------- | ------------------------------------------------------------------------ |
| `npm run dev`           | Runs the playground on http://localhost:5177, rendering the source live. |
| `npm run build`         | Builds the ESM bundle and type declarations into `dist/`.                |
| `npm test`              | Runs the unit specs (`test/unit/`).                                      |
| `npm run test:coverage` | The same, failing below 100% coverage of `src/`.                         |
| `npm run lint`          | ESLint, failing on any warning.                                          |
| `npm run typecheck`     | `vue-tsc` over source, specs and playground.                             |
| `npm run verify`        | Format check, lint, typecheck, coverage and build: what CI runs.         |

### The playground

Each component has its own page, listed in the playground's left-hand menu. A page is a file
named `playground/pages/<Component>Page.vue`, e.g. `FrCardPage.vue`. It is picked up
automatically and served at the component's name in kebab case (`#/fr-card`).
