import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: [
    'src/root.tsx',
    'src/entry-{client,server}.tsx',
    'src/routes/**/*.tsx',
    'generate-static-api/index.ts',
    'macro/join/index.ts',
    'vite.config.ts',
    'uno.config.ts',
  ],
  project: ['./**/*.{ts,tsx}'],
  ignoreDependencies: ['tsx', 'join.macro', 'virtual'],
  vite: false,
};

export default config;
