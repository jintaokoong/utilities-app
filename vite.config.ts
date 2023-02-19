import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import fontPlugin from "vite-plugin-fonts";

export default defineConfig({
  plugins: [
    solidPlugin(),
    fontPlugin({
      google: {
        injectTo: "head-prepend",
        families: ["Inter"],
      },
    }),
  ],
  server: {
    port: 5173,
  },
  build: {
    target: "esnext",
  },
});
