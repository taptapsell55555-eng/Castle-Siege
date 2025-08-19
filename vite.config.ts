import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ deploy GitHub Pages ได้
export default defineConfig({
  plugins: [react()],
  base: "/mystic-galaxy/", // เปลี่ยนตามชื่อ repo ของคุณ
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
