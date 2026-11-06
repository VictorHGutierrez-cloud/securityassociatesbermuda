import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Local: ./  |  GitHub Pages Actions sets VITE_BASE=/securityassociatesbermuda/
const base = process.env.VITE_BASE || "./";

export default defineConfig({
  plugins: [react()],
  base,
  server: {
    port: 5180,
  },
});
