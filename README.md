# @feral-auth/vue-components

`Fr*` wrappers around [Vuetify](https://vuetifyjs.com) 4 components, sharing one design and theme
across the feral apps.

## Install

```sh
npm install @feral-auth/vue-components vue vuetify @mdi/font
```

`vue` (^3.5) and `vuetify` (^4.3) are peer dependencies: the app owns its single copy of each.
`@mdi/font` is optional, and needed only for the mdi icons the theme is set up to use.

It is a private package of the `@feral-auth` npm org, so installing it needs an npm login that
belongs to the org. It is pre-1.0: a minor or patch release may change a component's props,
slots or defaults, so pin an exact version (`npm install --save-exact`).

## Set up

```ts
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import '@feral-auth/vue-components/styles.css';
import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import { createFeralVuetifyOptions, FeralComponents } from '@feral-auth/vue-components';

createApp(App)
  .use(createVuetify(createFeralVuetifyOptions()))
  .use(FeralComponents) // optional: registers every Fr* component globally
  .mount('#app');
```

`styles.css` holds the few rules the components can't get from Vuetify's classes (the build
gathers the components' `<style>` blocks into it). Import it once, after `vuetify/styles`.

Vuetify registers none of its own components by default. Register them in the app as usual,
with `vite-plugin-vuetify`'s auto-import or by passing them in:
`createFeralVuetifyOptions({ components, directives })`. The `Fr*` components import the Vuetify
parts they use themselves, so they work either way.

`createFeralVuetifyOptions(overrides?)` returns Vuetify options holding:

- two themes, `feralDark` (the default) and `feralLight`. Their colours are Vuetify 4.3's own dark
  and light colours, written out in the library so every app gets the same palette and a Vuetify
  upgrade can't change it;
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

| Component          | Wraps                         | Slots                                                                | Defaults                                                                                     |
| ------------------ | ----------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `FrAccordion`      | `VExpansionPanels`            | default, holding the panels                                          | `variant="default"`, `elevation="2"`, `rounded="lg"`                                         |
| `FrAccordionPanel` | `VExpansionPanel`             | `title`, `actions`, default                                          | none: it takes its look from `FrAccordion`                                                   |
| `FrAlert`          | `VAlert`                      | `title`, default, `append`                                           | `variant="tonal"`, `density="compact"`, `rounded="lg"`                                       |
| `FrAutocomplete`   | `VAutocomplete`               | `item`, `no-data`                                                    | `variant="solo"`, `density="compact"`, `rounded="lg"`                                        |
| `FrAvatar`         | `VAvatar`                     | default, `badge`                                                     | none: it stays Vuetify's circle                                                              |
| `FrBadge`          | `VBadge`                      | default, `badge`                                                     | none                                                                                         |
| `FrBreadcrumbs`    | `VBreadcrumbs`                | `divider`                                                            | dividers are chevrons, not `/`                                                               |
| `FrBtn`            | `VBtn`                        | default, `prepend`, `append`                                         | `color="primary"`, `rounded="lg"`, except icon buttons, which stay round and neutral         |
| `FrCard`           | `VCard`                       | `title`, `prepend`, `append`, default, `actions`                     | `variant="elevated"`, `elevation="2"`, `rounded="lg"`; a padded body; primary action buttons |
| `FrCheckbox`       | `VCheckbox`                   | `label`                                                              | `density="compact"`                                                                          |
| `FrChip`           | `VChip`                       | default, `prepend`, `append`                                         | none: it stays Vuetify's pill                                                                |
| `FrChipGroup`      | `VChipGroup`                  | default, holding the chips                                           | none                                                                                         |
| `FrCodeBlock`      | a `<pre>`                     | default, the code                                                    | padded, rounded, faint theme background                                                      |
| `FrCol`            | `VCol`                        | default, the content                                                 | none                                                                                         |
| `FrContainer`      | `VContainer`                  | default, the content                                                 | `fluid`                                                                                      |
| `FrDataTable`      | `VDataTable`                  | `top`, `actions`, `item.<key>`, `header.<key>`, `no-data`, `loading` | `density="compact"`, `hover`; a padded header bar                                            |
| `FrDialog`         | `VDialog` + `VCard`           | `activator`, default, `actions`                                      | `size="small"` (500px); primary action buttons                                               |
| `FrDivider`        | `VDivider`                    | default, in the middle of the line                                   | none                                                                                         |
| `FrFadeIn`         | `VFadeTransition`             | default, what fades                                                  | `appear`: it fades in on first render too                                                    |
| `FrFieldGroup`     | a `<label>` + content         | `description`, default, the field(s)                                 | `size="default"`                                                                             |
| `FrFileField`      | `VFileInput`                  | `selection`                                                          | `variant="solo"`, `density="compact"`, `rounded="lg"`                                        |
| `FrGrid`           | a CSS grid `<div>`            | default, each child a cell                                           | 240px columns, 12px gap, stretched                                                           |
| `FrForm`           | `VForm`                       | default, the fields, given the form's state                          | none: it never submits the page                                                              |
| `FrIcon`           | `VIcon`                       | default, the icon's name                                             | none                                                                                         |
| `FrIconBtn`        | `VBtn` with `icon`            | none                                                                 | `variant="text"`, `size="small"`                                                             |
| `FrImage`          | `VImg`                        | default, `placeholder`, `error`, `sources`                           | none                                                                                         |
| `FrList`           | `VList`                       | default; `title`, `prepend`... for `items` rows                      | `density="compact"`                                                                          |
| `FrListHeader`     | `VListSubheader`              | default, the heading's text                                          | none                                                                                         |
| `FrListItem`       | `VListItem`                   | `prepend`, `title`, `subtitle`, default, `append`                    | none                                                                                         |
| `FrMenu`           | `VMenu`                       | `activator`, default, the menu                                       | none                                                                                         |
| `FrPage`           | `FrContainer` + `FrPageTitle` | `actions`, default                                                   | fluid; the title 24px above the content                                                      |
| `FrPageTitle`      | a `<div>` + an `<h1>`         | `actions`                                                            | bold, `clamp(1.25rem, 2vw, 2rem)`, actions on the right                                      |
| `FrProgressBar`    | `VProgressLinear`             | default, over the bar, given `value`                                 | none                                                                                         |
| `FrRow`            | `VRow`                        | default, the columns                                                 | `spacing="default"`: gutters, and the `fr-row` class                                         |
| `FrSelect`         | `VSelect`                     | `item`, `no-data`                                                    | `variant="solo"`, `density="compact"`, `rounded="lg"`                                        |
| `FrSkeleton`       | `VSkeletonLoader`             | default, shown once not `loading`                                    | none                                                                                         |
| `FrSlider`         | `VSlider`                     | `label`, `prepend`, `append`, `thumb-label`, `tick-label`            | `density="compact"`                                                                          |
| `FrSnackbarQueue`  | `VSnackbarQueue`              | `text`, `header`, `actions`, `item`, given the message               | `rounded="lg"`, `closable`                                                                   |
| `FrSpacer`         | `VSpacer`                     | default, rarely used                                                 | none                                                                                         |
| `FrSheet`          | `VSheet`                      | default, the content                                                 | `rounded="lg"`, `padding="default"` (16px)                                                   |
| `FrSpinner`        | `VProgressCircular`           | default, in the middle, given `value`                                | `indeterminate`, unless given a value                                                        |
| `FrTable`          | `VTable`                      | `top`, `actions`, `caption`, default, the rows, `bottom`             | `density="compact"`; a padded header bar                                                     |
| `FrTabs`           | `VTabs`                       | default, below the tabs, given the selected `tab`                    | `color="primary"`, `fixed-tabs`                                                              |
| `FrTextField`      | `VTextField`                  | none                                                                 | `variant="solo"`, `density="compact"`, `rounded="lg"`                                        |
| `FrTextarea`       | `VTextarea`                   | none                                                                 | `variant="solo"`, `density="compact"`, `rounded="lg"`                                        |
| `FrTimeline`       | built from Fr parts           | `day`, `actions`, `empty`                                            | none                                                                                         |
| `FrToggle`         | `VSwitch`                     | `label`, `prepend`, `append`, `thumb`, `track-true`...               | `density="compact"`                                                                          |
| `FrTooltip`        | `VTooltip`                    | `activator`, default, in place of `text`                             | none                                                                                         |
| `FrTree`           | `VTreeview`                   | `title`, `prepend`, `append`, `toggle`, `item`...                    | `density="compact"`                                                                          |

Use them by name, or everywhere once `FeralComponents` is installed:

```vue
<script setup lang="ts">
import { FrCard } from '@feral-auth/vue-components';
</script>

<template>
  <fr-card title="Harvest" subtitle="Tomatoes">
    <p>Three kilos this week.</p>
    <template #actions><fr-btn text="Save" /></template>
  </fr-card>
</template>
```

The defaults are exported too (`frCardDefaults`, `frCardActionsDefaults`, `frAccordionDefaults`, `frAlertDefaults`,
`frAutocompleteDefaults`, `frBtnDefaults`, `frCheckboxDefaults`, `frContainerDefaults`, `frDataTableDefaults`, `frFileFieldDefaults`, `frIconBtnDefaults`, `frListDefaults`, `frSelectDefaults`, `frSheetDefaults`, `frSliderDefaults`, `frSnackbarQueueDefaults`, `frTableDefaults`, `frTabsDefaults`, `frTextareaDefaults`, `frTextFieldDefaults`, `frToggleDefaults`, `frTreeDefaults`), for anything that needs to match them.

- **`FrCard`**: the `title` slot replaces the title and subtitle, which otherwise come from their
  props. The body is the default slot, inside a `VCardText`, so it is padded to line up with the
  title (16px). `flush` puts it straight against the card's edges instead, for a table or a list. `prepend` and `append` sit either side of the title,
  each passed on only when given, and replace that side's `*-icon` and `*-avatar` props, so an
  icon there can take a colour (`<fr-icon color="primary" icon="mdi-star" />`). `actions` lines its
  content up on the right, and its buttons are text buttons in the theme's primary unless they say
  otherwise: give a destructive one `color="error"`. VCard's own slots (`loader`, `image`, `text`...) are not forwarded.
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
  `append` replace `prepend-icon` and `append-icon`. Its defaults are `color="primary"` and
  `rounded="lg"`: it stays Vuetify's elevated button, in the theme's primary. Give it another colour
  for another job (`color="error"` to delete), or `color="default"` for a neutral one, as in an app
  bar. An icon button (`icon` set) skips both and stays a neutral circle. VBtn's `loader` slot is not forwarded; `loading` still works.

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
  text colour at 6% opacity, so it suits dark and light. That look is an inline style rather than
  CSS. Change it with `style`, which merges in after it and wins
  (`style="padding: 8px"`); a clashing Vuetify utility class (`pa-2`, `rounded-0`) can't, since
  Vuetify 4's classes are layered CSS and an inline style beats them. Classes that don't clash,
  such as margins, work as usual.

  ```vue
  <fr-code-block>npm install @feral-auth/vue-components</fr-code-block>
  ```

- **`FrDataTable`**: passes on the slots that fill a cell or a header, `item.<key>` and
  `header.<key>` for the column whose `key` follows the dot, plus `no-data` and `loading`. A cell
  slot gets your own item (typed from `items`), the cell's `value`, its `index` and `column`. Row
  and body slots (`item`, `body`, `headers`...) are not passed on: they need Vuetify
  markup. Above the table, a header bar holds the `title` prop (a card title's type), then the
  `top` slot (a search field, a filter), then the `actions` slot, on the right. It is padded as a
  card's title is, so the heading lines up with the cells below and with the cards around it, and
  it is built only when one of the three is given. Its defaults are `density="compact"` and
  `hover`. Inside an `FrCard`, give the card `flush` so the table runs to its edges. Note Vuetify 3+ identifies rows with `item-value`, not Vuetify 2's
  `item-key`.

  ```vue
  <fr-data-table
    title="Users"
    :headers="headers"
    :items="users"
    item-value="userId"
    :loading="loading"
  >
    <template #actions><fr-btn color="primary" text="Add" @click="add" /></template>
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
  inside the card's text, and `actions`, pushed to the right, whose buttons are primary text
  buttons unless they say otherwise. Other `VDialog` props
  (`fullscreen`, `transition`...) pass through.

  ```vue
  <fr-dialog v-model="open" title="Edit planting" closable persistent>
    <template #activator="{ props }"><fr-btn v-bind="props" text="Edit" /></template>
    <fr-autocomplete v-model="plantId" :items="plants" label="Plant" />
    <template #actions>
      <fr-btn text="Cancel" @click="open = false" />
      <fr-btn text="Save" @click="save" />
    </template>
  </fr-dialog>
  ```

- **`FrDivider`**: a plain line, or, with something in its default slot, a line split around it
  (`<fr-divider>or</fr-divider>`). It sets no defaults; `vertical`, `inset`, `thickness`,
  `variant` and the rest pass through.

- **`FrFadeIn`**: Vuetify's fade transition with `appear`, so its content fades in when it first
  renders, not only when it toggles with `v-if`. `:appear="false"`, `mode`, `group` and the rest
  pass through. It renders no element of its own, so it adds no `fr-*` class; that would land on
  your element.

- **`FrFileField`**: the feral field look (as `FrAutocomplete`'s), and a `selection` slot for how
  the chosen files show in the field, given their `fileNames`, `totalBytes` and
  `totalBytesReadable`. Without the slot, VFileInput shows their names (or chips, with `chips`).
  Note that without `multiple`, `v-model` is a single `File`, not an array.

- **`FrForm`**: a form that never submits the page. Submitting it (Enter in a field, or a button
  with `type="submit"`) validates its fields and emits `submit` with `{ valid, errors }`, whether
  or not they passed, so check `valid`. `v-model` is whether every field passes (`null` while some
  are unchecked). Its ref exposes `validate()`, `reset()` and `resetValidation()`, and the default
  slot gets the same functions and the form's state (`isValid`, `errors`...). `disabled`,
  `readonly`, `validate-on` and `fast-fail` pass through.

  ```vue
  <fr-form ref="form" v-model="valid" @submit="({ valid }) => valid && save()">
    <fr-autocomplete v-model="plantId" :items="plants" label="Plant" :rules="[required]" />
    <fr-btn type="submit" text="Save" :disabled="valid === false" />
  </fr-form>
  ```

- **`FrIcon`**: an icon, named in its default slot (`<fr-icon>mdi-sprout</fr-icon>`), as the apps
  write it, or by `icon`. It sets no defaults; `size`, `color`, `start`, `end` and the rest pass
  through. With `@click` it takes focus, but Enter and Space don't press it: for an icon that does
  something, use `FrIconBtn`. Vuetify 2's `small` and `left` are gone: use `size="small"` and
  `start`.

- **`FrIconBtn`**: a button showing only an icon, as an edit or delete in a table's row. `icon`
  and `label` are both required: `label` names the button for screen readers (`Edit Tomato`), since
  the icon says nothing to them. It is small, text and neutral by default, a real button that
  Enter and Space press, and takes VBtn's other props (`color`, `disabled`, `to`...) and `@click`.

  ```vue
  <template #item.actions="{ item }">
    <fr-icon-btn icon="mdi-pencil" :label="`Edit ${item.name}`" @click="edit(item)" />
    <fr-icon-btn icon="mdi-delete" :label="`Delete ${item.name}`" @click="remove(item)" />
  </template>
  ```

- **`FrImage`**: an image, sized to its `max-width` (or `width`, `aspect-ratio`...) and shown
  whole, as Vuetify 2's `contain` did; `cover` fills and crops instead. It sets no defaults, so
  centre it as before, with `class="mx-auto"`. Its slots are passed on only when given: the
  default slot sits over the image, `placeholder` shows while it loads, `error` if it fails, and
  `sources` takes `<source>` elements, wrapping the image in a `<picture>`.

  ```vue
  <fr-image :src="logo" alt="Logo" max-width="500" class="mx-auto" />
  ```

- **`FrList`**: a list, compact by default. Write its rows in the default slot (`FrListItem`,
  `FrListHeader`, `FrDivider`), or give it `items` and let it build them. Rows built from `items`
  take the `title`, `subtitle`, `prepend` and `append` slots, each given its `item` (typed by the
  `items` you pass) and Vuetify's row state (`isActive`, `isSelected`...). An item with
  `children` opens a group whose row is the `header` slot; items of `type: 'subheader'` and
  `type: 'divider'` take the `subheader` and `divider` slots. Those three get `props` to bind
  onto what they render. With rows in the default slot, `items` is ignored. `lines`, `nav`,
  `v-model:selected` and the rest pass through.

  ```vue
  <fr-list :items="plants" item-title="name" item-value="plantId" lines="two">
    <template #append="{ item }">
      <fr-chip size="small" :text="`${item.plantings} planted`" />
    </template>
  </fr-list>
  ```

- **`FrListHeader`**: a heading between an `FrList`'s rows. Its text is its default slot or its
  `title`; the slot wins. It sets no defaults; `color`, `inset` and `sticky` pass through. In an
  `FrList` built from `items`, bind the `subheader` slot's `props` onto it.

  ```vue
  <fr-list>
    <fr-list-header>Herbs</fr-list-header>
    <fr-list-item title="Basil" />
  </fr-list>
  ```

- **`FrListItem`**: one row of an `FrList`, from `title` and `subtitle`, or their slots. `prepend`
  and `append` hold what goes either side (an `FrIcon`, an `FrAvatar`, `FrBtn`s), and the default
  slot goes under the title. Each slot is passed on only when given, and gets Vuetify's row state
  (`isActive`, `isSelected`...). It sets no defaults; `prepend-icon`, `to`, `value`, `rounded`,
  `@click` and the rest pass through.

  ```vue
  <fr-list lines="two">
    <fr-list-item v-for="item in schedules" :key="item.id" :title="item.name">
      <template #subtitle>{{ item.description }}</template>
      <template #append>
        <fr-btn icon="mdi-delete" variant="text" size="small" @click="remove(item)" />
      </template>
    </fr-list-item>
  </fr-list>
  ```

- **`FrMenu`**: a menu that opens from what you put in its `activator` slot (bind the slot's
  `props` onto it, as with `FrDialog`). Its default slot is the menu itself, usually an `FrList`
  or `FrCard`, given `isActive` as a ref, so a button inside can close it with
  `isActive.value = false` (the `activator` slot's `isActive` is a plain boolean). It sets no defaults: it opens below its activator on click and
  closes when its content is clicked. `v-model`, `location`, `open-on-hover`,
  `close-on-content-click` and the rest pass through.

  ```vue
  <fr-menu>
    <template #activator="{ props }">
      <fr-btn v-bind="props" icon="mdi-dots-vertical" variant="text" aria-label="Actions" />
    </template>
    <fr-list>
      <fr-list-item prepend-icon="mdi-pencil" title="Edit" @click="edit" />
      <fr-list-item prepend-icon="mdi-delete" title="Delete" @click="remove" />
    </fr-list>
  </fr-menu>
  ```

- **`FrPageTitle`**: a page's title, bold and scaled with the window (`clamp(1.25rem, 2vw, 2rem)`),
  never too small on a phone or too big on a wide screen. It is an `h1` unless `tag` says
  otherwise, with its margin reset. The `actions` slot sits on the right, and wraps below the title
  when there isn't room. `FrPage` puts one at the top of a page for you.

- **`FrPage`**: a whole page: a fluid `FrContainer`, then an `FrPageTitle` given a `title` (with the
  `actions` slot beside it), then the default slot across the full width, 24px below the title.
  VContainer's props (`max-width`, `:fluid="false"`) go to the container.

  ```vue
  <fr-page title="Manage Plants">
    <template #actions><fr-btn text="Add" @click="add" /></template>
    <fr-card flush><fr-data-table :headers="headers" :items="plants" /></fr-card>
  </fr-page>
  ```

- **`FrProgressBar`**: a bar filled to its `v-model` (0 to `max`, 100 by default), or moving
  with `indeterminate` while something loads. Its default slot sits over the bar, given the
  `value` and `buffer` as percentages; give it a `height` to fit. It sets no defaults; `color`,
  `bg-color`, `height`, `buffer-value`, `striped`, `rounded` and the rest pass through.

  ```vue
  <fr-progress-bar :model-value="harvested" :max="target" color="success" height="20" rounded>
    <template #default="{ value }">{{ Math.round(value) }}%</template>
  </fr-progress-bar>
  ```

- **`FrRow`**: holds `FrCol`s. It takes `align`, `justify` and `align-content`, each also at a
  breakpoint (`align-md`, `justify-lg`...), and renders them as Vuetify's utility classes
  (`align-center`, `justify-md-space-between`) rather than passing them to VRow, which deprecates
  them in Vuetify 4. It also takes `spacing`: `'none'` removes the gutters between columns
  (`no-gutters`) and leaves off the `fr-row` class, while the default, `'default'`, keeps
  Vuetify's gutters and adds `fr-row`. Every other VRow prop (`density`, `tag`...) passes
  through.

  With `FrContainer` around them, they lay out a page. `FrContainer` is a VContainer that is fluid
  by default, so the page fills the width at every breakpoint rather than stopping at Vuetify 4's
  cap (1000px at `lg`); `:fluid="false"` brings the cap back, and `max-width` sets one of your own:

  ```vue
  <fr-container>
    <fr-row align="center" justify="space-between">
      <fr-col cols="12" md="6">Left</fr-col>
      <fr-col cols="12" md="6">Right</fr-col>
    </fr-row>
  </fr-container>
  ```

- **`FrCol`**: takes `order` (also at a breakpoint, `order-md`...) and `align-self`, and renders
  them as Vuetify's utility classes (`order-first`, `order-md-2`, `align-self-center`) rather than
  passing them to VCol, which deprecates them in Vuetify 4. `order` has a class for 0 to 12,
  `first` and `last`. Every other VCol prop (`cols`, `md`, `offset`...) passes through.

- **`FrSelect`**: the feral field look and the same slots as `FrAutocomplete`: `item` fills one
  row of the list and gets your own item (typed from `items`) and its index, with FrSelect
  rendering the row around it so selecting still works; `no-data` replaces `no-data-text` when
  there are no items. VSelect's other slots (`chip`, `selection`, `prepend-item`...) are not
  forwarded; its props all work, `return-object`, `multiple` and `chips` among them.

  ```vue
  <fr-select v-model="activityType" :items="activityTypes" label="Activity type" clearable />
  ```

- **`FrSkeleton`**: grey shapes standing in for content still loading; `type` says which
  (`"heading, paragraph"`, `"card"`, `"table"`...). Wrap the real content in its default slot
  and it shows that content once `loading` is false, the skeleton while it is true. Without a
  slot it is always the skeleton. It sets no defaults; `elevation`, `max-width`, `boilerplate`
  and the rest pass through. Once loaded it renders your content alone, with no element of its
  own, so classes given to it apply only to the skeleton.

  ```vue
  <fr-skeleton :loading="!recipe" type="heading, paragraph" elevation="2" max-width="600">
    <recipe-details :recipe="recipe" />
  </fr-skeleton>
  ```

- **`FrSlider`**: a slider for a number between `min` and `max` (0 and 100 by default), compact
  by default. Its slots are passed on only when given: `label` in place of the `label` prop,
  `prepend` and `append` either side, `thumb-label` for the bubble over the thumb (with
  `thumb-label`), given the value, and `tick-label` for each tick's label (with `show-ticks` and
  `ticks`), given the tick and its index. `step`, `color`, `disabled` and the rest pass through.

  ```vue
  <fr-slider v-model="spacing" :min="10" :max="90" :step="5" label="Spacing" thumb-label>
    <template #thumb-label="{ modelValue }">{{ modelValue }} cm</template>
  </fr-slider>
  ```

- **`FrSpacer`**: an empty element that grows to fill the free space in a flex row, pushing what
  follows it to the far end. It sets no defaults; `tag` passes through.

  ```vue
  <div class="d-flex">
    <fr-btn text="Back" />
    <fr-spacer />
    <fr-btn color="primary" text="Save" />
  </div>
  ```

- **`FrSheet`**: a plain surface in the theme's colours, for a page's content or a panel, rounded
  (`rounded="lg"`) and padded by default. `padding` is `'default'` (16px), `'small'` (8px) or
  `'none'`; use it rather than a `pa-*` class, which would sit beside the default one rather than
  replace it. `elevation`, `color`, `border`, `height` and the rest pass through.

  ```vue
  <fr-sheet elevation="2" height="30vh" padding="small">
    <fr-list :items="plantings" />
  </fr-sheet>
  ```

- **`FrSpinner`**: a loading spinner. It spins unless given a value (`v-model` or `model-value`,
  0 to 100 by default), which it shows as a ring instead; an undefined value counts as none,
  so it spins until the value arrives. `indeterminate` from the caller always wins. Its
  default slot sits in the middle, given the `value`. `size`, `width`, `color` and the rest pass
  through.

  ```vue
  <fr-spinner v-if="!plant" size="100" width="10" color="green" />
  <fr-spinner :model-value="uploaded" color="primary">{{ uploaded }}%</fr-spinner>
  ```

- **`FrTable`**: a plain HTML table styled to the theme, compact by default. Write its rows
  (`<thead>`, `<tbody>`) in the default slot. Above it, the `title` prop, the `top` slot and the
  `actions` slot share a padded header bar, as on `FrDataTable`; `bottom` sits below the table and
  `caption` goes first inside it, each passed on only when given. `aria-label` lands on the inner
  `<table>`. `hover`, `striped`, `height`, `fixed-header` and the rest pass through. For a table
  built from `items`, with sorting and paging, use `FrDataTable`.

  ```vue
  <fr-table aria-label="Harvest">
    <thead>
      <tr><th>Plant</th><th>Kilos</th></tr>
    </thead>
    <tbody>
      <tr v-for="row in harvest" :key="row.plant"><td>{{ row.plant }}</td><td>{{ row.kilos }}</td></tr>
    </tbody>
  </fr-table>
  ```

- **`FrTabs`**: tabs built from `options`, each a string (its title and value) or
  `{ title, value }`, optionally with `prependIcon` or `disabled`. `v-model` holds the selected
  tab's value; with none, the first tab is selected. The default slot sits below the tabs, given
  the selected value as `tab`, so show each tab's content with `v-if` there. By default the tabs
  stretch across the row, up to 300px each (`fixed-tabs`), in the theme's primary. `class` and `style` land on the div
  around it all; every other attribute (`align-tabs`, `grow`, `bg-color`...) goes to the tabs.

  ```vue
  <fr-tabs v-model="tab" :options="[{ title: 'To Start', value: 'planning' }, 'History']">
    <template #default="{ tab }">
      <planning-table v-if="tab === 'planning'" :items="toStart" />
      <history-list v-else :history="history" />
    </template>
  </fr-tabs>
  ```

- **`FrTextField`**: a one-line field in the feral field look, as `FrSelect`'s: solo, compact,
  rounded. Every VTextField prop and event passes through (`type`, `rules`, `clearable`,
  `counter`, `@click:append`...). Its icons come from props (`prepend-inner-icon`,
  `append-inner-icon`, `append-icon`); VTextField's slots are not passed on.

  ```vue
  <fr-text-field
    v-model="password"
    label="Password"
    :type="shown ? 'text' : 'password'"
    :append-inner-icon="shown ? 'mdi-eye' : 'mdi-eye-off'"
    @click:append-inner="shown = !shown"
  />
  ```

- **`FrTextarea`**: a field of several lines, in the same look as `FrTextField`. `rows`,
  `auto-grow`, `counter` and VTextarea's other props pass through; its slots are not passed on.

- **`FrTimeline`**: a column of the days that have records, newest first, beside the shown
  day's records, with Older and Newer buttons either side of its heading. Modelled on
  vigilant-harvest-app's DayTimeline. Give it `records` and `dateOf`, which returns a record's
  date (a date string, timestamp or Date), read as the local day it falls on; a date-only string
  such as `'2026-05-01'` is that day. Records whose date can't be read are left out. `v-model`
  holds the shown day as YYYY-MM-DD; when it names no day with records, the newest is shown and
  v-model told. Days more than one apart have a `...` between them. The `day` slot (the day's
  content) and `actions` (beside its heading) get the `day` and its `records`, typed by the
  records given; `empty` shows when there are none.

  ```vue
  <fr-timeline v-model="selectedDay" :records="journalEntries" :date-of="(e) => e.entryDate">
    <template #day="{ records }">
      <p v-for="entry in records" :key="entry.entryId">{{ entry.entry }}</p>
    </template>
    <template #empty><p>No entries yet.</p></template>
  </fr-timeline>
  ```

- **`FrSnackbarQueue`**: push messages onto its `v-model` array and it shows them as snackbars,
  one after another, taking each off the array as it does. A message is a string or an object of
  snackbar settings (`{ text, color, timeout }`, an `onDismiss`, a `promise`). It is rounded and
  dismissable (`closable`) by default; the caller's settings win, and a message's own win over
  both. The `text`, `header` and `actions` slots (the last given `props` that dismiss) and `item`
  (the whole snackbar) get the message, each passed on only when given. A ref exposes `clear()`.
  VSnackbarQueue renders no element of its own and passes `class` and `style` to no snackbar, so
  style them with `content-class` or a message's own `class`.

  ```vue
  <fr-snackbar-queue v-model="messages" timeout="2000" />
  <!-- then, in a handler: messages.value.push({ text: 'Saved', color: 'success' }) -->
  ```

- **`FrToggle`**: an on/off switch, compact by default, as `FrCheckbox` is. Its slots are passed
  on only when given: `label` in place of the `label` prop, `prepend` and `append` either side,
  `thumb` in place of the thumb's icon, and `track-true` and `track-false` on the track (with
  `inset`), each given the switch's state. `color`, `base-color`, `inset`, `hide-details` and the
  rest pass through.

  ```vue
  <fr-toggle v-model="enableEdit" color="success" base-color="error">
    <template #label><fr-icon>{{ enableEdit ? 'mdi-lock-open' : 'mdi-lock' }}</fr-icon></template>
  </fr-toggle>
  ```

- **`FrTooltip`**: a hint shown while what it describes is hovered or focused. Bind its
  `activator` slot's `props` onto that element; the tooltip's content is the `text` prop, or the
  default slot in its place, passed on only when given. It sets no defaults; `location`,
  `open-delay`, `disabled` and the rest pass through.

  ```vue
  <fr-tooltip text="Copy the link" location="end">
    <template #activator="{ props }"><fr-btn v-bind="props" icon="mdi-content-copy" /></template>
  </fr-tooltip>
  ```

- **`FrTree`**: `items` with `children`, shown as rows that open to show their children, compact
  by default as `FrList` is. Its slots are passed on only when given, and get the item, typed by
  the items given: `prepend`, `title`, `subtitle` and `append` for a row's parts, `toggle` for its
  open arrow, `header` and `footer` around a branch, `item` for a whole leaf row, `divider` and
  `subheader`, and `no-data`, shown when a `search` matches nothing. `v-model:opened`,
  `v-model:activated`, `selectable`, `open-on-click` and the rest pass through.

  ```vue
  <fr-tree v-model:opened="opened" :items="plots" item-value="id" open-on-click>
    <template #append="{ item }">{{ item.crop }}</template>
  </fr-tree>
  ```

- **`FrFieldGroup`**: a label above a field, with an optional `icon`, a `required` asterisk
  (hidden from assistive technology) and a `description` under it, which the `description` slot
  replaces. `field-id` points the label at the one field it is for; `box-id` wraps the content in
  a div with that id. `size="small"` gives a smaller label. The label and description get ids of
  their own. Use it directly only to label a group of fields, such as an hour and a minute
  picker; the single fields will build it in. Give each field in a flex row the
  `field-group--field` class (from `styles.css`) to share the width without overflowing.

  ```vue
  <fr-field-group label="Sowing time" description="24-hour clock">
    <div class="d-flex ga-2">
      <fr-select v-model="hour" :items="hours" class="field-group--field" />
      <fr-select v-model="minute" :items="minutes" class="field-group--field" />
    </div>
  </fr-field-group>
  ```

- **`FrGrid`**: a CSS grid in which each child is a cell. It fits as many columns of at least
  `min-item-width` (240px) as it can, up to `max-columns`, stretching them to fill the row
  (`:stretch="false"` leaves empty columns at the end instead). Given `weights` (`[2, 1]`), the
  columns take those proportions, stacking into one once the narrowest would be under
  `min-item-width`; it watches its own width for that. `gap="small"` spaces cells 4px apart
  rather than 12px; `min-row-height` and `uniform-rows` size the rows; `align` places cells in
  their row. Cells may shrink below their content's width (`styles.css`), so nothing overflows
  its column.

  ```vue
  <fr-grid :max-columns="3">
    <fr-card v-for="plot in plots" :key="plot.id" :title="plot.name" />
  </fr-grid>
  <fr-grid :weights="[2, 1]">
    <plot-map />
    <plot-details />
  </fr-grid>
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
| `npm run test:package`  | Builds, then packs the package and uses it as an app would (see below).  |

### Publishing

By hand, as a private package of the `@feral-auth` npm org: bump `version`, merge to `master`,
then `npm publish` from `master`. `publishConfig.access` is `restricted`, so only the org's
members can see it; never publish it with `--access public`.

`prepublishOnly` cleans, runs `verify`, then `scripts/check-package.mjs`, which CI runs too. It
packs the package as npm would publish it, checks the tarball holds `dist/index.js`,
`index.d.ts` and `index.css` and no source or tests, installs it into a scratch app with `vue`
and `vuetify`, builds that app with Vite (importing `vuetify/styles`, the package and its
`styles.css`), and type-checks a file that uses its types. That catches what `verify` can't: a
file left out of the tarball, a broken `exports` entry, or types that don't resolve.

### The playground

Each component has its own page, listed in the playground's left-hand menu. A page is a file
named `playground/pages/<Component>Page.vue`, e.g. `FrCardPage.vue`. It is picked up
automatically and served at the component's name in kebab case (`#/fr-card`).
