import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps:{
    include:['firebase/compat/app','firebase/firestore'],
  },
})
