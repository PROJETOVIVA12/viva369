import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts: [
      "e085256e-1715-4988-a73a-e00b17660a21-00-1rss69km62em6.janeway.replit.dev",
      ".replit.dev",
      ".replit.app",
      "localhost",
      "127.0.0.1",
      "0.0.0.0"
    ],
  },
});
