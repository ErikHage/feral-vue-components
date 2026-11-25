import type { Component } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

// Every playground/pages/Fr*Page.vue is a component's page, so adding a component's page is
// adding one file. The menu shows the component's name, and the route is that name in kebab case.
// A page isn't named after its component alone because Vue resolves a component's own name
// before global ones: <fr-card> inside FrCard.vue would render the page, not the card
const modules = import.meta.glob<Component>('./Fr*Page.vue');

/** Pages that render their own v-app, shown without the playground's frame around them */
const barePages = new Set(['FrAppShell']);

export interface ComponentPage {
  name: string;
  path: string;
  file: string;
}

export const componentPages: ComponentPage[] = Object.keys(modules)
  .map((file) => {
    const name = file.replace(/^\.\/|Page\.vue$/g, '');
    const path = `/${name.replace(/(?<!^)([A-Z])/g, '-$1').toLowerCase()}`;
    return { name, path, file };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

export const routes: RouteRecordRaw[] = [
  ...componentPages.map(({ name, path, file }) => ({
    name,
    path,
    component: modules[file] as () => Promise<Component>,
    meta: { bare: barePages.has(name) },
  })),
  { path: '/:pathMatch(.*)*', redirect: componentPages[0]?.path ?? '/' },
];
