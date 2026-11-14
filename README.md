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
