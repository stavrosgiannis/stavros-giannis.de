import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(async () => {
  const plugins = [react()];

  if (process.env.ANALYZE) {
    const { visualizer } = await import("rollup-plugin-visualizer");
    plugins.push(visualizer({ filename: "build/stats.html", gzipSize: true, brotliSize: true }));
  }

  return {
    plugins,
    envPrefix: ["VITE_", "REACT_APP_"],
    esbuild: {
      loader: "jsx",
      include: /[/\\]src[/\\].*\.js$/,
      exclude: [],
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          ".js": "jsx",
        },
      },
    },
    build: {
      outDir: "build",
    },
  };
});
