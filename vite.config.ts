import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      assets: `${path.resolve(__dirname, "./src/assets/")}`,
      utils: `${path.resolve(__dirname, "./src/utils/")}`,
      hooks: `${path.resolve(__dirname, "./src/hooks/")}`,
      pages: `${path.resolve(__dirname, "./src/pages/")}`,
      components: `${path.resolve(__dirname, "./src/components/")}`,
      api: `${path.resolve(__dirname, "./src/api/")}`,
    },
  },
});
