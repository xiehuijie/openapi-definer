import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/cli.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  sourcemap: false,
  clean: true,
  shims: true,
  treeshake: true,
  minify: false,
  target: 'es2022',
  outDir: 'dist',
});
