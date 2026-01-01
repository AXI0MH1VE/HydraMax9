import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  root: "./OneDrive/Desktop/HyHive",
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./OneDrive/Desktop/HyHive/src"),
      "@components": resolve(__dirname, "./OneDrive/Desktop/HyHive/src/components"),
      "@services": resolve(__dirname, "./OneDrive/Desktop/HyHive/src/services"),
      "@types": resolve(__dirname, "./OneDrive/Desktop/HyHive/src/types"),
    },
  },
});
