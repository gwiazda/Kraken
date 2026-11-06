import { defineConfig } from 'vite';

export default defineConfig({
  // Relative links: the site works at https://gwiazda.github.io/Kraken/ whatever the letter case of the address.
  base: './',
  server: {
    // Fixed address: it must match the "Authorized JavaScript origins" of the Google OAuth client.
    host: 'localhost',
    port: 5173,
    strictPort: true,
  },
});
