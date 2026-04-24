import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/graphql": {
        target: "http://localhost:8080", // Your backend URL
        changeOrigin: true,
        secure: false
      }
    }
  }
});
