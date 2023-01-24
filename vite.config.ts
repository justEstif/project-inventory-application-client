import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      proxy: {
        ...(env.NODE_ENV === "development"
          ? {
              "/api": {
                target: "http://localhost:5000",
                changeOrigin: false,
                rewrite: (path) => path.replace(/^\/api/, ""),
              },
            }
          : {
              "/api": {
                target: env.API_URL,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
              },
            }),
      },
    },
    plugins: [react()],
  };
});
