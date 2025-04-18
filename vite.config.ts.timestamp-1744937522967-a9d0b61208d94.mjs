// vite.config.ts
import { defineConfig } from "file:///Users/yqg/personal/webs/astro-resume/node_modules/.pnpm/vite@5.4.17_@types+node@22.13.14_lightningcss@1.29.2/node_modules/vite/dist/node/index.js";
import preact from "file:///Users/yqg/personal/webs/astro-resume/node_modules/.pnpm/@preact+preset-vite@2.10.1_@babel+core@7.26.10_preact@10.26.4_vite@5.4.17_@types+node@22.13.14_lightningcss@1.29.2_/node_modules/@preact/preset-vite/dist/esm/index.mjs";
import path2 from "path";
import { componentTagger } from "file:///Users/yqg/personal/webs/astro-resume/node_modules/.pnpm/lovable-tagger@1.1.8_vite@5.4.17_@types+node@22.13.14_lightningcss@1.29.2_/node_modules/lovable-tagger/dist/index.js";
import viteImagemin from "file:///Users/yqg/personal/webs/astro-resume/node_modules/.pnpm/vite-plugin-imagemin@0.6.1_vite@5.4.17_@types+node@22.13.14_lightningcss@1.29.2_/node_modules/vite-plugin-imagemin/dist/index.mjs";

// plugins/vite-plugin-preload-config.ts
import fs from "fs/promises";
import path from "path";
function preloadConfigPlugin() {
  let config;
  let outDir;
  return {
    name: "vite-plugin-preload-config",
    configResolved(resolvedConfig) {
      outDir = resolvedConfig.build.outDir;
    },
    async buildStart() {
      try {
        const configFile = await fs.readFile("public/preload-config.json", "utf-8");
        config = JSON.parse(configFile);
      } catch (error) {
        console.error("Failed to read preload-config.json:", error);
        throw error;
      }
    },
    async writeBundle(options, bundle) {
      const assetMap = /* @__PURE__ */ new Map();
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type === "chunk" || chunk.type === "asset") {
          const baseName = path.basename(fileName);
          const key = baseName.replace(/-.{8}\.(js|css)$/, "");
          assetMap.set(key, fileName);
        }
      }
      const updatePaths = (items) => {
        return items.map((item) => {
          const pathWithoutExt = path.basename(item.path);
          const matchedFile = assetMap.get(pathWithoutExt);
          if (matchedFile) {
            return {
              ...item,
              path: matchedFile
            };
          }
          return item;
        });
      };
      const updatedConfig = {
        preload: updatePaths(config.preload),
        prefetch: updatePaths(config.prefetch)
      };
      const outputPath = path.join(outDir, "preload-config.json");
      await fs.writeFile(
        outputPath,
        JSON.stringify(updatedConfig, null, 2),
        "utf-8"
      );
    }
  };
}

// vite.config.ts
var __vite_injected_original_dirname = "/Users/yqg/personal/webs/astro-resume";
function createPreloadPlugin() {
  return {
    name: "vite-plugin-preload",
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: "link",
            attrs: {
              rel: "preload",
              as: "image",
              href: "/assets/images/placeholder.webp",
              type: "image/webp"
            },
            injectTo: "head"
          }
        ]
      };
    }
  };
}
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Change to true to allow all hosts
    allowedHosts: true
  },
  plugins: [
    preact(),
    mode === "development" && componentTagger(),
    // mode === 'production' &&
    //     visualizer({
    //         filename: 'dist/stats.html',
    //         open: true,
    //         gzipSize: true,
    //         brotliSize: true
    //     }),
    viteImagemin({
      webp: {
        quality: 85,
        method: 6,
        lossless: false,
        nearLossless: 75
      },
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 80,
        progressive: true
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4
      },
      svgo: {
        plugins: [
          {
            name: "removeViewBox"
          },
          {
            name: "removeEmptyAttrs",
            active: false
          }
        ]
      }
    }),
    createPreloadPlugin(),
    preloadConfigPlugin()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path2.resolve(__vite_injected_original_dirname, "./src"),
      react: "preact/compat",
      "react-dom": "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime"
    }
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    chunkSizeWarningLimit: 1e3,
    cssCodeSplit: true,
    // cssMinify: 'lightningcss',
    sourcemap: false,
    reportCompressedSize: false,
    rollupOptions: {
      treeshake: {
        moduleSideEffects: true,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false
      },
      output: {
        manualChunks: {
          "preact-vendor": ["preact", "preact/compat", "preact/hooks"],
          "router-vendor": ["react-router-dom"],
          "ui-core-vendor": [
            "@radix-ui/react-label",
            "@radix-ui/react-slot",
            "@radix-ui/react-separator",
            "@radix-ui/react-progress"
          ],
          "ui-interaction-vendor": [
            "@radix-ui/react-toast",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-switch",
            "sonner"
          ],
          "ui-scroll-vendor": [
            "@radix-ui/react-scroll-area"
          ],
          "animation-vendor": ["framer-motion"],
          "utils-vendor": [
            "class-variance-authority",
            "clsx",
            "tailwind-merge",
            "next-themes"
          ],
          "icons-vendor": ["lucide-react"]
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "assets/css/[name]-vendor-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js"
      }
    }
  },
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
    legalComments: "none",
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGx1Z2lucy92aXRlLXBsdWdpbi1wcmVsb2FkLWNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy95cWcvcGVyc29uYWwvd2Vicy9hc3Ryby1yZXN1bWVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy95cWcvcGVyc29uYWwvd2Vicy9hc3Ryby1yZXN1bWUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3lxZy9wZXJzb25hbC93ZWJzL2FzdHJvLXJlc3VtZS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7ZGVmaW5lQ29uZmlnfSBmcm9tICd2aXRlJztcbmltcG9ydCBwcmVhY3QgZnJvbSAnQHByZWFjdC9wcmVzZXQtdml0ZSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7Y29tcG9uZW50VGFnZ2VyfSBmcm9tICdsb3ZhYmxlLXRhZ2dlcic7XG5pbXBvcnQgdml0ZUltYWdlbWluIGZyb20gJ3ZpdGUtcGx1Z2luLWltYWdlbWluJztcbmltcG9ydCB7UGx1Z2lufSBmcm9tICd2aXRlJztcbmltcG9ydCB7dmlzdWFsaXplcn0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJztcbmltcG9ydCBwcmVsb2FkQ29uZmlnUGx1Z2luIGZyb20gJy4vcGx1Z2lucy92aXRlLXBsdWdpbi1wcmVsb2FkLWNvbmZpZydcbi8vIFx1NTIxQlx1NUVGQVx1ODFFQVx1NUI5QVx1NEU0OVx1OTg4NFx1NTJBMFx1OEY3RFx1NjNEMlx1NEVGNlxuZnVuY3Rpb24gY3JlYXRlUHJlbG9hZFBsdWdpbigpOiBQbHVnaW4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICd2aXRlLXBsdWdpbi1wcmVsb2FkJyxcbiAgICAgICAgdHJhbnNmb3JtSW5kZXhIdG1sKGh0bWwpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaHRtbCxcbiAgICAgICAgICAgICAgICB0YWdzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ2xpbmsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWw6ICdwcmVsb2FkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhczogJ2ltYWdlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmOiAnL2Fzc2V0cy9pbWFnZXMvcGxhY2Vob2xkZXIud2VicCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3dlYnAnXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5qZWN0VG86ICdoZWFkJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHttb2RlfSkgPT4gKHtcbiAgICBzZXJ2ZXI6IHtcbiAgICAgICAgaG9zdDogJzo6JyxcbiAgICAgICAgcG9ydDogODA4MCxcbiAgICAgICAgLy8gQ2hhbmdlIHRvIHRydWUgdG8gYWxsb3cgYWxsIGhvc3RzXG4gICAgICAgIGFsbG93ZWRIb3N0czogdHJ1ZVxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgICBwcmVhY3QoKSxcbiAgICAgICAgbW9kZSA9PT0gJ2RldmVsb3BtZW50JyAmJiBjb21wb25lbnRUYWdnZXIoKSxcbiAgICAgICAgLy8gbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nICYmXG4gICAgICAgIC8vICAgICB2aXN1YWxpemVyKHtcbiAgICAgICAgLy8gICAgICAgICBmaWxlbmFtZTogJ2Rpc3Qvc3RhdHMuaHRtbCcsXG4gICAgICAgIC8vICAgICAgICAgb3BlbjogdHJ1ZSxcbiAgICAgICAgLy8gICAgICAgICBnemlwU2l6ZTogdHJ1ZSxcbiAgICAgICAgLy8gICAgICAgICBicm90bGlTaXplOiB0cnVlXG4gICAgICAgIC8vICAgICB9KSxcbiAgICAgICAgdml0ZUltYWdlbWluKHtcbiAgICAgICAgICAgIHdlYnA6IHtcbiAgICAgICAgICAgICAgICBxdWFsaXR5OiA4NSxcbiAgICAgICAgICAgICAgICBtZXRob2Q6IDYsXG4gICAgICAgICAgICAgICAgbG9zc2xlc3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG5lYXJMb3NzbGVzczogNzVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnaWZzaWNsZToge1xuICAgICAgICAgICAgICAgIG9wdGltaXphdGlvbkxldmVsOiA3LFxuICAgICAgICAgICAgICAgIGludGVybGFjZWQ6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3B0aXBuZzoge1xuICAgICAgICAgICAgICAgIG9wdGltaXphdGlvbkxldmVsOiA3XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbW96anBlZzoge1xuICAgICAgICAgICAgICAgIHF1YWxpdHk6IDgwLFxuICAgICAgICAgICAgICAgIHByb2dyZXNzaXZlOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcG5ncXVhbnQ6IHtcbiAgICAgICAgICAgICAgICBxdWFsaXR5OiBbMC44LCAwLjldLFxuICAgICAgICAgICAgICAgIHNwZWVkOiA0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3Znbzoge1xuICAgICAgICAgICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3JlbW92ZVZpZXdCb3gnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdyZW1vdmVFbXB0eUF0dHJzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZTogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIGNyZWF0ZVByZWxvYWRQbHVnaW4oKSxcbiAgICAgICAgcHJlbG9hZENvbmZpZ1BsdWdpbigpXG4gICAgXS5maWx0ZXIoQm9vbGVhbiksXG4gICAgcmVzb2x2ZToge1xuICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICAgICAgICAgIHJlYWN0OiAncHJlYWN0L2NvbXBhdCcsXG4gICAgICAgICAgICAncmVhY3QtZG9tJzogJ3ByZWFjdC9jb21wYXQnLFxuICAgICAgICAgICAgJ3JlYWN0L2pzeC1ydW50aW1lJzogJ3ByZWFjdC9qc3gtcnVudGltZSdcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgICAgdGFyZ2V0OiAnZXNuZXh0JyxcbiAgICAgICAgbWluaWZ5OiAnZXNidWlsZCcsXG4gICAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCxcbiAgICAgICAgY3NzQ29kZVNwbGl0OiB0cnVlLFxuICAgICAgICAvLyBjc3NNaW5pZnk6ICdsaWdodG5pbmdjc3MnLFxuICAgICAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICAgICAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogZmFsc2UsXG4gICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgICAgIHRyZWVzaGFrZTp7XG4gICAgICAgICAgICAgICAgbW9kdWxlU2lkZUVmZmVjdHM6IHRydWUsXG4gICAgICAgICAgICAgICAgcHJvcGVydHlSZWFkU2lkZUVmZmVjdHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHRyeUNhdGNoRGVvcHRpbWl6YXRpb246IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgICAgICAgICAgICdwcmVhY3QtdmVuZG9yJzogWydwcmVhY3QnLCAncHJlYWN0L2NvbXBhdCcsICdwcmVhY3QvaG9va3MnXSxcbiAgICAgICAgICAgICAgICAgICAgJ3JvdXRlci12ZW5kb3InOiBbJ3JlYWN0LXJvdXRlci1kb20nXSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWNvcmUtdmVuZG9yJzogW1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1sYWJlbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LXNsb3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1zZXBhcmF0b3InLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1wcm9ncmVzcydcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLWludGVyYWN0aW9uLXZlbmRvcic6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtdG9hc3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC10b29sdGlwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3Qtc3dpdGNoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdzb25uZXInXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICd1aS1zY3JvbGwtdmVuZG9yJzogW1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1zY3JvbGwtYXJlYSdcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgJ2FuaW1hdGlvbi12ZW5kb3InOiBbJ2ZyYW1lci1tb3Rpb24nXSxcbiAgICAgICAgICAgICAgICAgICAgJ3V0aWxzLXZlbmRvcic6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICdjbGFzcy12YXJpYW5jZS1hdXRob3JpdHknLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2Nsc3gnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3RhaWx3aW5kLW1lcmdlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICduZXh0LXRoZW1lcydcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgJ2ljb25zLXZlbmRvcic6IFsnbHVjaWRlLXJlYWN0J11cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvOiB7bmFtZT86IHN0cmluZ30pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFzc2V0SW5mby5uYW1lPy5lbmRzV2l0aCgnLmNzcycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2Fzc2V0cy9jc3MvW25hbWVdLXZlbmRvci1baGFzaF1bZXh0bmFtZV0nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnYXNzZXRzL1tuYW1lXS1baGFzaF1bZXh0bmFtZV0nO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdhc3NldHMvanMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgICAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdhc3NldHMvanMvW25hbWVdLVtoYXNoXS5qcydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgZXNidWlsZDoge1xuICAgICAgICBqc3hGYWN0b3J5OiAnaCcsXG4gICAgICAgIGpzeEZyYWdtZW50OiAnRnJhZ21lbnQnLFxuICAgICAgICBsZWdhbENvbW1lbnRzOiAnbm9uZScsXG4gICAgICAgIG1pbmlmeUlkZW50aWZpZXJzOiB0cnVlLFxuICAgICAgICBtaW5pZnlTeW50YXg6IHRydWUsXG4gICAgICAgIG1pbmlmeVdoaXRlc3BhY2U6IHRydWVcbiAgICB9XG59KSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy95cWcvcGVyc29uYWwvd2Vicy9hc3Ryby1yZXN1bWUvcGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3lxZy9wZXJzb25hbC93ZWJzL2FzdHJvLXJlc3VtZS9wbHVnaW5zL3ZpdGUtcGx1Z2luLXByZWxvYWQtY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy95cWcvcGVyc29uYWwvd2Vicy9hc3Ryby1yZXN1bWUvcGx1Z2lucy92aXRlLXBsdWdpbi1wcmVsb2FkLWNvbmZpZy50c1wiO2ltcG9ydCB0eXBlIHsgUGx1Z2luIH0gZnJvbSAndml0ZSdcbmltcG9ydCBmcyBmcm9tICdmcy9wcm9taXNlcydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmludGVyZmFjZSBQcmVsb2FkSXRlbSB7XG4gICAgdHlwZTogJ3N0eWxlJyB8ICdzY3JpcHQnIHwgJ2ZvbnQnIHwgJ2ltYWdlJ1xuICAgIHBhdGg6IHN0cmluZ1xuICAgIGNyb3Nzb3JpZ2luPzogc3RyaW5nXG59XG5cbmludGVyZmFjZSBQcmVsb2FkQ29uZmlnIHtcbiAgICBwcmVsb2FkOiBQcmVsb2FkSXRlbVtdXG4gICAgcHJlZmV0Y2g6IFByZWxvYWRJdGVtW11cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJlbG9hZENvbmZpZ1BsdWdpbigpOiBQbHVnaW4ge1xuICAgIGxldCBjb25maWc6IFByZWxvYWRDb25maWdcbiAgICBsZXQgb3V0RGlyOiBzdHJpbmdcblxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICd2aXRlLXBsdWdpbi1wcmVsb2FkLWNvbmZpZycsXG4gICAgICAgIFxuICAgICAgICBjb25maWdSZXNvbHZlZChyZXNvbHZlZENvbmZpZykge1xuICAgICAgICAgICAgb3V0RGlyID0gcmVzb2x2ZWRDb25maWcuYnVpbGQub3V0RGlyXG4gICAgICAgIH0sXG5cbiAgICAgICAgYXN5bmMgYnVpbGRTdGFydCgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgLy8gXHU4QkZCXHU1M0Q2XHU1MzlGXHU1OUNCXHU3Njg0IHByZWxvYWQtY29uZmlnLmpzb25cbiAgICAgICAgICAgICAgICBjb25zdCBjb25maWdGaWxlID0gYXdhaXQgZnMucmVhZEZpbGUoJ3B1YmxpYy9wcmVsb2FkLWNvbmZpZy5qc29uJywgJ3V0Zi04JylcbiAgICAgICAgICAgICAgICBjb25maWcgPSBKU09OLnBhcnNlKGNvbmZpZ0ZpbGUpXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byByZWFkIHByZWxvYWQtY29uZmlnLmpzb246JywgZXJyb3IpXG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBhc3luYyB3cml0ZUJ1bmRsZShvcHRpb25zLCBidW5kbGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGFzc2V0TWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKVxuXG4gICAgICAgICAgICAvLyBcdTY3ODRcdTVFRkFcdTY1ODdcdTRFRjZcdTU0MERcdTY2MjBcdTVDMDRcbiAgICAgICAgICAgIGZvciAoY29uc3QgW2ZpbGVOYW1lLCBjaHVua10gb2YgT2JqZWN0LmVudHJpZXMoYnVuZGxlKSkge1xuICAgICAgICAgICAgICAgIGlmIChjaHVuay50eXBlID09PSAnY2h1bmsnIHx8IGNodW5rLnR5cGUgPT09ICdhc3NldCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZU5hbWUgPSBwYXRoLmJhc2VuYW1lKGZpbGVOYW1lKVxuICAgICAgICAgICAgICAgICAgICAvLyBcdTc5RkJcdTk2NjQgaGFzaCBcdTU0OENcdTYyNjlcdTVDNTVcdTU0MERcdUZGMENcdTc1MjhcdTRGNUNcdTk1MkVcdTU0MERcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gYmFzZU5hbWUucmVwbGFjZSgvLS57OH1cXC4oanN8Y3NzKSQvLCAnJylcbiAgICAgICAgICAgICAgICAgICAgYXNzZXRNYXAuc2V0KGtleSwgZmlsZU5hbWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gXHU2NkY0XHU2NUIwXHU5MTREXHU3RjZFXHU0RTJEXHU3Njg0XHU4REVGXHU1Rjg0XG4gICAgICAgICAgICBjb25zdCB1cGRhdGVQYXRocyA9IChpdGVtczogUHJlbG9hZEl0ZW1bXSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtcy5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhdGhXaXRob3V0RXh0ID0gcGF0aC5iYXNlbmFtZShpdGVtLnBhdGgpXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoZWRGaWxlID0gYXNzZXRNYXAuZ2V0KHBhdGhXaXRob3V0RXh0KVxuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hlZEZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uaXRlbSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBtYXRjaGVkRmlsZSBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRDb25maWc6IFByZWxvYWRDb25maWcgPSB7XG4gICAgICAgICAgICAgICAgcHJlbG9hZDogdXBkYXRlUGF0aHMoY29uZmlnLnByZWxvYWQpLFxuICAgICAgICAgICAgICAgIHByZWZldGNoOiB1cGRhdGVQYXRocyhjb25maWcucHJlZmV0Y2gpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFx1NTE5OVx1NTE2NVx1NjZGNFx1NjVCMFx1NTQwRVx1NzY4NFx1OTE0RFx1N0Y2RVx1NjU4N1x1NEVGNlxuICAgICAgICAgICAgY29uc3Qgb3V0cHV0UGF0aCA9IHBhdGguam9pbihvdXREaXIsICdwcmVsb2FkLWNvbmZpZy5qc29uJylcbiAgICAgICAgICAgIGF3YWl0IGZzLndyaXRlRmlsZShcbiAgICAgICAgICAgICAgICBvdXRwdXRQYXRoLFxuICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHVwZGF0ZWRDb25maWcsIG51bGwsIDIpLFxuICAgICAgICAgICAgICAgICd1dGYtOCdcbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuICAgIH1cbn0gIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpUyxTQUFRLG9CQUFtQjtBQUM1VCxPQUFPLFlBQVk7QUFDbkIsT0FBT0EsV0FBVTtBQUNqQixTQUFRLHVCQUFzQjtBQUM5QixPQUFPLGtCQUFrQjs7O0FDSHpCLE9BQU8sUUFBUTtBQUNmLE9BQU8sVUFBVTtBQWFGLFNBQVIsc0JBQStDO0FBQ2xELE1BQUk7QUFDSixNQUFJO0FBRUosU0FBTztBQUFBLElBQ0gsTUFBTTtBQUFBLElBRU4sZUFBZSxnQkFBZ0I7QUFDM0IsZUFBUyxlQUFlLE1BQU07QUFBQSxJQUNsQztBQUFBLElBRUEsTUFBTSxhQUFhO0FBQ2YsVUFBSTtB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QUEsVUFDQTtBQUFBLFlBQ0ksTUFBTTtBQUFBLFlBQ04sUUFBUTtBQUFBLFVBQ1o7QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUFBLElBQ0osQ0FBQztBQUFBLElBQ0Qsb0JBQW9CO0FBQUEsSUFDcEIsb0JBQW9CO0FBQUEsRUFDeEIsRUFBRSxPQUFPLE9BQU87QUFBQSxFQUNoQixTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxLQUFLQyxNQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3BDLE9BQU87QUFBQSxNQUNQLGFBQWE7QUFBQSxNQUNiLHFCQUFxQjtBQUFBLElBQ3pCO0FBQUEsRUFDSjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0gsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLElBQ1IsdUJBQXVCO0FBQUEsSUFDdkIsY0FBYztBQUFBO0FBQUEsSUFFZCxXQUFXO0FBQUEsSUFDWCxzQkFBc0I7QUFBQSxJQUN0QixlQUFlO0FBQUEsTUFDWCxXQUFVO0FBQUEsUUFDTixtQkFBbUI7QUFBQSxRQUNuQix5QkFBeUI7QUFBQSxRQUN6Qix3QkFBd0I7QUFBQSxNQUM1QjtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ0osY0FBYztBQUFBLFVBQ1YsaUJBQWlCLENBQUMsVUFBVSxpQkFBaUIsY0FBYztBQUFBLFVBQzNELGlCQUFpQixDQUFDLGtCQUFrQjtBQUFBLFVBQ3BDLGtCQUFrQjtBQUFBLFlBQ2Q7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNKO0FBQUEsVUFDQSx5QkFBeUI7QUFBQSxZQUNyQjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0o7QUFBQSxVQUNBLG9CQUFvQjtBQUFBLFlBQ2hCO0FBQUEsVUFDSjtBQUFBLFVBQ0Esb0JBQW9CLENBQUMsZUFBZTtBQUFBLFVBQ3BDLGdCQUFnQjtBQUFBLFlBQ1o7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNKO0FBQUEsVUFDQSxnQkFBZ0IsQ0FBQyxjQUFjO0FBQUEsUUFDbkM7QUFBQSxRQUNBLGdCQUFnQixDQUFDLGNBQStCO0FBQzVDLGNBQUksVUFBVSxNQUFNLFNBQVMsTUFBTSxHQUFHO0FBQ2xDLG1CQUFPO0FBQUEsVUFDWDtBQUNBLGlCQUFPO0FBQUEsUUFDWDtBQUFBLFFBQ0EsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsTUFDcEI7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsWUFBWTtBQUFBLElBQ1osYUFBYTtBQUFBLElBQ2IsZUFBZTtBQUFBLElBQ2YsbUJBQW1CO0FBQUEsSUFDbkIsY0FBYztBQUFBLElBQ2Qsa0JBQWtCO0FBQUEsRUFDdEI7QUFDSixFQUFFOyIsCiAgIm5hbWVzIjogWyJwYXRoIiwgInBhdGgiXQp9Cg==
