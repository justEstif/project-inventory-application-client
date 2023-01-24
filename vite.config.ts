import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      server: {
        proxy: {
          "/api": {
            target: "http://localhost:5000",
            changeOrigin: false,
            rewrite: (path) => path.replace(/^\/api/, ""),
          },
        },
      },
      plugins: [react()],
    };
  } else {
    return {
      server: {
        proxy: {
          "/api": {
            target: "https://web-production-0008.up.railway.app",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ""),
          },
        },
      },
      plugins: [react()],
    };
  }
});
