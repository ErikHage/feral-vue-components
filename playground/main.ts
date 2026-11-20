import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createVuetify } from 'vuetify';
// createVuetify registers no components by itself; the playground takes all of them rather than
// wiring up vite-plugin-vuetify's auto-import, since bundle size doesn't matter here
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createFeralVuetifyOptions, FeralComponents } from '../src';
import App from './App.vue';
import { routes } from './pages';

createApp(App)
  .use(createVuetify(createFeralVuetifyOptions({ components, directives })))
  .use(FeralComponents)
  // Hash history, so any path works without server config
  .use(createRouter({ history: createWebHashHistory(), routes }))
  .mount('#app');
