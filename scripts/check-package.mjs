// Packs the package as npm would publish it, installs the tarball into a scratch app beside vue
// and vuetify, and uses it as an app would: Vite builds an entry that imports vuetify/styles, the
// package and its styles.css, and tsc checks a file that uses its types. Node alone can't import
// the package, since Vuetify's components import CSS; a bundler is how it is meant to be loaded.
import { execFileSync } from 'node:child_process';
import console from 'node:console';
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const work = mkdtempSync(join(tmpdir(), 'vue-components-'));
// Run from an npm script, npm's own CLI is in npm_execpath and runs under this Node. Run
// directly, fall back to `npm`, which on Windows is a .cmd and needs a shell
const npmCli = process.env.npm_execpath;
// Under `npm publish --dry-run`, npm passes npm_config_dry_run down to this script, and the pack
// and install below would inherit it, writing and installing nothing
const env = { ...process.env };
delete env.npm_config_dry_run;
const npm = (args, cwd) =>
  npmCli === undefined
    ? execFileSync('npm', args, { cwd, env, encoding: 'utf8', shell: process.platform === 'win32' })
    : execFileSync(process.execPath, [npmCli, ...args], { cwd, env, encoding: 'utf8' });

// The peers the app installs: the versions this repo develops and tests against
const installed = (name) =>
  JSON.parse(readFileSync(join(root, 'node_modules', name, 'package.json'), 'utf8')).version;

function fail(message) {
  throw new Error(message);
}

try {
  // Built already by whatever ran this, so --ignore-scripts; what was packed is read from the
  // tarball rather than from npm's output
  npm(['pack', '--ignore-scripts', '--pack-destination', work], root);
  const [tarball, ...others] = readdirSync(work).filter((file) => file.endsWith('.tgz'));
  if (tarball === undefined || others.length > 0) {
    fail(`expected npm pack to write one tarball, found: ${readdirSync(work).join(', ')}`);
  }
  // Windows has had bsdtar since 10; it reads .tgz as GNU tar does
  const files = execFileSync('tar', ['-tzf', tarball], { cwd: work, encoding: 'utf8' })
    .split('\n')
    .filter((path) => path !== '')
    .map((path) => path.replace(/^package\//, ''));
  for (const expected of [
    'package.json',
    'README.md',
    'LICENSE',
    'dist/index.js',
    'dist/index.d.ts',
    'dist/index.css',
  ]) {
    if (!files.includes(expected)) fail(`${tarball} is missing ${expected}`);
  }
  const stray = files.filter((path) => /^(src|test|playground|scripts)\//.test(path));
  if (stray.length > 0) fail(`${tarball} ships files it shouldn't: ${stray.join(', ')}`);
  console.log(`packed ${tarball}: ${files.length} files`);

  writeFileSync(
    join(work, 'package.json'),
    JSON.stringify({ name: 'check', private: true, type: 'module' }),
  );
  npm(
    [
      'install',
      '--no-audit',
      '--no-fund',
      join(work, tarball),
      `vue@${installed('vue')}`,
      `vuetify@${installed('vuetify')}`,
    ],
    work,
  );

  // An app's entry, as the README sets one up
  writeFileSync(
    join(work, 'index.html'),
    '<div id="app"></div><script type="module" src="/main.js"></script>',
  );
  writeFileSync(
    join(work, 'main.js'),
    `import 'vuetify/styles';
import '@feral-auth/vue-components/styles.css';
import { createApp, h } from 'vue';
import { createVuetify } from 'vuetify';
import { createFeralVuetifyOptions, FeralComponents, FrBtn } from '@feral-auth/vue-components';

createApp({ render: () => h(FrBtn, { text: 'Save' }) })
  .use(createVuetify(createFeralVuetifyOptions()))
  .use(FeralComponents)
  .mount('#app');
`,
  );
  // This repo's own Vite, building from the scratch app's node_modules
  const { build } = await import(pathToFileURL(join(root, 'node_modules/vite/dist/node/index.js')));
  await build({ root: work, logLevel: 'error', configFile: false, build: { outDir: 'out' } });
  const assets = readdirSync(join(work, 'out', 'assets'));
  const css = assets
    .filter((file) => file.endsWith('.css'))
    .map((file) => readFileSync(join(work, 'out', 'assets', file), 'utf8'))
    .join('\n');
  for (const rule of ['.field-group--field', '.fr-grid']) {
    if (!css.includes(rule)) fail(`the app's built CSS has no ${rule}: styles.css didn't reach it`);
  }
  console.log(`built an app with it: ${assets.join(', ')}`);

  // A consumer's types: the expect-error fails the check if the package's types were any
  writeFileSync(
    join(work, 'check.ts'),
    `import { createFeralVuetifyOptions, FrBtn, type FrTabsOption } from '@feral-auth/vue-components';

const options = createFeralVuetifyOptions();
const tab: FrTabsOption = { title: 'Details', value: 'details' };
// @ts-expect-error an option object needs a value
const broken: FrTabsOption = { title: 'No value' };
export { broken, FrBtn, options, tab };
`,
  );
  writeFileSync(
    join(work, 'tsconfig.json'),
    JSON.stringify({
      compilerOptions: {
        target: 'ES2022',
        module: 'ESNext',
        moduleResolution: 'bundler',
        strict: true,
        noEmit: true,
        skipLibCheck: true,
        types: [],
      },
      files: ['check.ts'],
    }),
  );
  execFileSync(process.execPath, [join(root, 'node_modules/typescript/bin/tsc'), '-p', work], {
    cwd: work,
    encoding: 'utf8',
  });
  console.log('type-checked a file using its types');
} catch (error) {
  console.error(error.stdout ?? '', error.stderr ?? '', error.message);
  process.exitCode = 1;
} finally {
  rmSync(work, { recursive: true, force: true });
}
