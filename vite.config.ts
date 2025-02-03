import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/iterathor.ts',
      formats: ['cjs', 'es'],
      name: 'iterathor',
    },
  },
});
