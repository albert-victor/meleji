import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

function walkHtmlInputs(dir, acc) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      walkHtmlInputs(full, acc);
    } else if (name === 'index.html') {
      const rel = relative(rootDir, full).replace(/\\/g, '/');
      const key = rel
        .replace(/\.html$/, '')
        .replace(/\//g, '_')
        .replace(/[^a-zA-Z0-9_]/g, '_');
      acc[key || 'page'] = resolve(rootDir, rel);
    }
  }
}

function collectPageInputs() {
  const inputs = { main: resolve(rootDir, 'index.html') };

  const pagesDir = join(rootDir, 'pages');
  if (existsSync(pagesDir)) {
    walkHtmlInputs(pagesDir, inputs);
  }

  const notFound = resolve(rootDir, '404.html');
  if (existsSync(notFound)) {
    inputs.notFound = notFound;
  }

  return inputs;
}

export default defineConfig({
  root: rootDir,
  publicDir: 'public',
  resolve: {
    alias: {
      '@': resolve(rootDir, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: collectPageInputs(),
    },
  },
});
