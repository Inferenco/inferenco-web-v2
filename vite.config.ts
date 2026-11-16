import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { legalPages, legalTemplate } from "./src/legal/build";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), legalPages()],
  base: "/",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    rolldownOptions: {
      input: [resolve(__dirname, "index.html"), resolve(__dirname, legalTemplate)],
    },
  },
});
