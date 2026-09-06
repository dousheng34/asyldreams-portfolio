import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

// GitHub Pages serves the site from /asyldreams-portfolio/. Override with VITE_BASE for a custom domain.
export default defineConfig(({ mode }) => ({
  base: process.env.VITE_BASE ?? (mode === "production" ? "/asyldreams-portfolio/" : "/"),
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  build: {
    target: "es2020",
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: { gsap: ["gsap", "gsap/ScrollTrigger", "gsap/SplitText"], ogl: ["ogl"] },
      },
    },
  },
}));
