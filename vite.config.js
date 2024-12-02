import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Binds to all network interfaces
    port: 5173, // Port number (make sure this matches what you're using)
  },
});
