import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  build: {
    target: ['es2022'],
  },
  plugins: [],
  vercel: {},
});
