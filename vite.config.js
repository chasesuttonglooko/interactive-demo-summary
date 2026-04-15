import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change base to '/your-repo-name/' for GitHub Pages subdirectory deployments.
// For a root-level Pages site (username.github.io), keep './'.
export default defineConfig({
  plugins: [react()],
  base: './',
})
