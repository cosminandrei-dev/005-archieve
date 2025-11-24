import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Use relative asset paths so the built app works when opened from disk or a subpath
  base: './',
  plugins: [react()],
});
