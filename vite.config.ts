import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { extname, relative, resolve } from "path";
import { glob } from "glob";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import dts from "vite-plugin-dts";
import { fileURLToPath } from "url";
import tailwindcss from "tailwindcss";
export default defineConfig({
  build: {
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "tailwindcss"],
      input: Object.fromEntries(
        glob
          .sync("lib/**/*.{ts,tsx}", {
            ignore: ["lib/**/*.d.ts"],
          })
          .map((file) => [
            relative("lib", file.slice(0, file.length - extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "JSX",
          tailwindcss: "tailwindcss",
        },
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
        sourcemap: true,
      },
    },
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      formats: ["es"],
    },
  },
  plugins: [react(), libInjectCss(), dts({ include: ["lib"] })],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
