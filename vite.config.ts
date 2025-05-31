import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { imageToWebpPlugin } from "vite-plugin-image-to-webp";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), imageToWebpPlugin()],
});
