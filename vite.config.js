import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react"],
          "react-dom": ["react-dom"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  css: {
    modules: {
      localsConvention: "dashes",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
  // Adăugați această secțiune pentru a specifica modul de încărcare 'jsx' pentru fișierele '.js'
  esbuild: {
    loader: {
      ".js": "jsx",
    },
  },
});
