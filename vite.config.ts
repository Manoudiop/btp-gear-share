import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    // Le port peut être imposé par l'environnement (conteneurs, proxys de dev).
    port: Number(process.env.PORT) || 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        /**
         * Les grosses dépendances partent dans des chunks stables : elles changent
         * rarement et restent donc en cache navigateur entre deux déploiements,
         * contrairement au code applicatif. Recharts, en particulier, n'est chargé
         * que par les pages de statistiques.
         */
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          charts: ["recharts"],
          forms: ["react-hook-form", "@hookform/resolvers", "zod"],
        },
      },
    },
  },
});
