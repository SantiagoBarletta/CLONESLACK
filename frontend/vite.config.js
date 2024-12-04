import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@hooks": path.resolve(__dirname, "./src/Hooks"),
      "@screens": path.resolve(__dirname, "./src/Screens"),
      "@context": path.resolve(__dirname, "./src/context"),
    },
  },
});
