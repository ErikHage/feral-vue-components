import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
// createVuetify registers no components by itself; the playground takes all of them rather than
// wiring up vite-plugin-vuetify's auto-import, since bundle size doesn't matter here
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createFeralVuetifyOptions, FeralComponents } from '../src';
import App from './App.vue';

createApp(App)
  .use(createVuetify(createFeralVuetifyOptions({ components, directives })))
  .use(FeralComponents)
  .mount('#app');
