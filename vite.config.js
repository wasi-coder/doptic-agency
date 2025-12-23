import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    // If we are building for production, use the repo name. 
    // If we are running 'npm run dev', use the root '/'.
    base: command === 'build' ? '/doptic-agency/' : '/',
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});