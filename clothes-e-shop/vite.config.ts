import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Ensure `typed-redux-saga/macro` resolves correctly
      'typed-redux-saga/macro': 'typed-redux-saga', // Adjust alias if macro.js is not available
    },
  },
})
