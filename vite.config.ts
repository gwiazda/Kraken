import { defineConfig } from 'vite';

export default defineConfig({
  // The site is published at https://gwiazda.github.io/kraken/
  base: '/kraken/',
  server: {
    // Fixed address: it must match the "Authorized JavaScript origins" of the Google OAuth client.
    host: 'localhost',
    port: 5173,
    strictPort: true,
  },
});
