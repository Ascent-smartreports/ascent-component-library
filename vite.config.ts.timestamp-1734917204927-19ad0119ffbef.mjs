// vite.config.ts
import { defineConfig } from "file:///home/madhan/projectRepos/ascent-component-library/node_modules/vite/dist/node/index.js";
import react from "file:///home/madhan/projectRepos/ascent-component-library/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { extname, relative, resolve } from "path";
import { glob } from "file:///home/madhan/projectRepos/ascent-component-library/node_modules/glob/dist/esm/index.js";
import { libInjectCss } from "file:///home/madhan/projectRepos/ascent-component-library/node_modules/vite-plugin-lib-inject-css/dist/index.js";
import dts from "file:///home/madhan/projectRepos/ascent-component-library/node_modules/vite-plugin-dts/dist/index.mjs";
import { fileURLToPath } from "url";
import tailwindcss from "file:///home/madhan/projectRepos/ascent-component-library/node_modules/tailwindcss/lib/index.js";
var __vite_injected_original_dirname = "/home/madhan/projectRepos/ascent-component-library";
var __vite_injected_original_import_meta_url = "file:///home/madhan/projectRepos/ascent-component-library/vite.config.ts";
var vite_config_default = defineConfig({
  build: {
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "tailwindcss",
        /^node:\w+/
      ],
      input: Object.fromEntries(
        glob.sync("lib/**/*.{ts,tsx,scss,css}", {
          ignore: ["lib/**/*.d.ts", "lib/**/*.{test,spec,stories}.{ts,tsx}"]
        }).map((file) => [
          relative("lib", file.slice(0, file.length - extname(file).length)),
          fileURLToPath(new URL(file, __vite_injected_original_import_meta_url))
        ])
      ),
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "JSX",
          tailwindcss: "tailwindcss"
        },
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
        sourcemap: true
      }
    },
    copyPublicDir: false,
    lib: {
      entry: resolve(__vite_injected_original_dirname, "lib/main.ts"),
      formats: ["es"]
    }
  },
  plugins: [
    react(),
    libInjectCss(),
    dts({
      include: ["lib", "src"],
      exclude: ["lib/**/*.{test,spec,stories}.{ts,tsx}"]
    })
  ],
  css: {
    postcss: {
      plugins: [tailwindcss]
    }
    // preprocessorOptions: {
    //   scss: {
    //     additionalData:
    //   }
    // },
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9tYWRoYW4vcHJvamVjdFJlcG9zL2FzY2VudC1jb21wb25lbnQtbGlicmFyeVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvbWFkaGFuL3Byb2plY3RSZXBvcy9hc2NlbnQtY29tcG9uZW50LWxpYnJhcnkvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvbWFkaGFuL3Byb2plY3RSZXBvcy9hc2NlbnQtY29tcG9uZW50LWxpYnJhcnkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCB7IGV4dG5hbWUsIHJlbGF0aXZlLCByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGdsb2IgfSBmcm9tIFwiZ2xvYlwiO1xuaW1wb3J0IHsgbGliSW5qZWN0Q3NzIH0gZnJvbSBcInZpdGUtcGx1Z2luLWxpYi1pbmplY3QtY3NzXCI7XG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tIFwidXJsXCI7XG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSBcInRhaWx3aW5kY3NzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFtcbiAgICAgICAgXCJyZWFjdFwiLFxuICAgICAgICBcInJlYWN0LWRvbVwiLFxuICAgICAgICBcInJlYWN0L2pzeC1ydW50aW1lXCIsXG4gICAgICAgIFwidGFpbHdpbmRjc3NcIixcbiAgICAgICAgL15ub2RlOlxcdysvLFxuICAgICAgXSxcbiAgICAgIGlucHV0OiBPYmplY3QuZnJvbUVudHJpZXMoXG4gICAgICAgIGdsb2JcbiAgICAgICAgICAuc3luYyhcImxpYi8qKi8qLnt0cyx0c3gsc2Nzcyxjc3N9XCIsIHtcbiAgICAgICAgICAgIGlnbm9yZTogW1wibGliLyoqLyouZC50c1wiLCBcImxpYi8qKi8qLnt0ZXN0LHNwZWMsc3Rvcmllc30ue3RzLHRzeH1cIl0sXG4gICAgICAgICAgfSlcbiAgICAgICAgICAubWFwKChmaWxlKSA9PiBbXG4gICAgICAgICAgICByZWxhdGl2ZShcImxpYlwiLCBmaWxlLnNsaWNlKDAsIGZpbGUubGVuZ3RoIC0gZXh0bmFtZShmaWxlKS5sZW5ndGgpKSxcbiAgICAgICAgICAgIGZpbGVVUkxUb1BhdGgobmV3IFVSTChmaWxlLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgICAgICBdKVxuICAgICAgKSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgcmVhY3Q6IFwiUmVhY3RcIixcbiAgICAgICAgICBcInJlYWN0LWRvbVwiOiBcIlJlYWN0RE9NXCIsXG4gICAgICAgICAgXCJyZWFjdC9qc3gtcnVudGltZVwiOiBcIkpTWFwiLFxuICAgICAgICAgIHRhaWx3aW5kY3NzOiBcInRhaWx3aW5kY3NzXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiBcImFzc2V0cy9bbmFtZV1bZXh0bmFtZV1cIixcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6IFwiW25hbWVdLmpzXCIsXG4gICAgICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjb3B5UHVibGljRGlyOiBmYWxzZSxcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgXCJsaWIvbWFpbi50c1wiKSxcbiAgICAgIGZvcm1hdHM6IFtcImVzXCJdLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIGxpYkluamVjdENzcygpLFxuICAgIGR0cyh7XG4gICAgICBpbmNsdWRlOiBbXCJsaWJcIiwgXCJzcmNcIl0sXG4gICAgICBleGNsdWRlOiBbXCJsaWIvKiovKi57dGVzdCxzcGVjLHN0b3JpZXN9Lnt0cyx0c3h9XCJdLFxuICAgIH0pLFxuICBdLFxuICBjc3M6IHtcbiAgICBwb3N0Y3NzOiB7XG4gICAgICBwbHVnaW5zOiBbdGFpbHdpbmRjc3NdLFxuICAgIH0sXG4gICAgLy8gcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgIC8vICAgc2Nzczoge1xuICAgIC8vICAgICBhZGRpdGlvbmFsRGF0YTpcbiAgICAvLyAgIH1cbiAgICAvLyB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdVLFNBQVMsb0JBQW9CO0FBQ3JXLE9BQU8sV0FBVztBQUNsQixTQUFTLFNBQVMsVUFBVSxlQUFlO0FBQzNDLFNBQVMsWUFBWTtBQUNyQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsU0FBUyxxQkFBcUI7QUFDOUIsT0FBTyxpQkFBaUI7QUFQeEIsSUFBTSxtQ0FBbUM7QUFBbUssSUFBTSwyQ0FBMkM7QUFTN1AsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLE1BQ0EsT0FBTyxPQUFPO0FBQUEsUUFDWixLQUNHLEtBQUssOEJBQThCO0FBQUEsVUFDbEMsUUFBUSxDQUFDLGlCQUFpQix1Q0FBdUM7QUFBQSxRQUNuRSxDQUFDLEVBQ0EsSUFBSSxDQUFDLFNBQVM7QUFBQSxVQUNiLFNBQVMsT0FBTyxLQUFLLE1BQU0sR0FBRyxLQUFLLFNBQVMsUUFBUSxJQUFJLEVBQUUsTUFBTSxDQUFDO0FBQUEsVUFDakUsY0FBYyxJQUFJLElBQUksTUFBTSx3Q0FBZSxDQUFDO0FBQUEsUUFDOUMsQ0FBQztBQUFBLE1BQ0w7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLE9BQU87QUFBQSxVQUNQLGFBQWE7QUFBQSxVQUNiLHFCQUFxQjtBQUFBLFVBQ3JCLGFBQWE7QUFBQSxRQUNmO0FBQUEsUUFDQSxnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixXQUFXO0FBQUEsTUFDYjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGVBQWU7QUFBQSxJQUNmLEtBQUs7QUFBQSxNQUNILE9BQU8sUUFBUSxrQ0FBVyxhQUFhO0FBQUEsTUFDdkMsU0FBUyxDQUFDLElBQUk7QUFBQSxJQUNoQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLGFBQWE7QUFBQSxJQUNiLElBQUk7QUFBQSxNQUNGLFNBQVMsQ0FBQyxPQUFPLEtBQUs7QUFBQSxNQUN0QixTQUFTLENBQUMsdUNBQXVDO0FBQUEsSUFDbkQsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILFNBQVM7QUFBQSxNQUNQLFNBQVMsQ0FBQyxXQUFXO0FBQUEsSUFDdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFNRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
