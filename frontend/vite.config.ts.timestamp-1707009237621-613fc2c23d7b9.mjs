// vite.config.ts
import path from "path";
import { defineConfig } from "file:///C:/ProgrammingProjects/LeetGPT/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///C:/ProgrammingProjects/LeetGPT/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\ProgrammingProjects\\LeetGPT\\frontend";
var vite_config_default = defineConfig(({ mode }) => {
  if (mode === "content") {
    return {
      build: {
        emptyOutDir: false,
        outDir: "./dist",
        rollupOptions: {
          input: {
            content: "./src/content.tsx"
          },
          output: {
            inlineDynamicImports: true,
            entryFileNames: "[name].js"
          }
        }
      }
    };
  }
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    },
    build: {
      outDir: "./dist",
      assetsDir: "./assets",
      rollupOptions: {
        input: {
          background: "./src/background.ts",
          index: "index.html"
        },
        output: {
          entryFileNames(chunkInfo) {
            switch (chunkInfo.name) {
              case "index":
                return "assets/[name]-[hash:8].js";
              default:
                return "[name].js";
            }
          },
          assetFileNames: "assets/[name].[ext]"
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxQcm9ncmFtbWluZ1Byb2plY3RzXFxcXExlZXRHUFRcXFxcZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFByb2dyYW1taW5nUHJvamVjdHNcXFxcTGVldEdQVFxcXFxmcm9udGVuZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovUHJvZ3JhbW1pbmdQcm9qZWN0cy9MZWV0R1BUL2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgVXNlckNvbmZpZywgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xyXG4gIGlmIChtb2RlID09PSBcImNvbnRlbnRcIikge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYnVpbGQ6IHtcclxuICAgICAgICBlbXB0eU91dERpcjogZmFsc2UsXHJcbiAgICAgICAgb3V0RGlyOiBcIi4vZGlzdFwiLFxyXG4gICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICAgIGlucHV0OiB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiLi9zcmMvY29udGVudC50c3hcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgICAgaW5saW5lRHluYW1pY0ltcG9ydHM6IHRydWUsXHJcbiAgICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiBcIltuYW1lXS5qc1wiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSBhcyBVc2VyQ29uZmlnO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHBsdWdpbnM6IFtyZWFjdCgpXSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICBvdXREaXI6IFwiLi9kaXN0XCIsXHJcbiAgICAgIGFzc2V0c0RpcjogXCIuL2Fzc2V0c1wiLFxyXG4gICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgaW5wdXQ6IHtcclxuICAgICAgICAgIGJhY2tncm91bmQ6IFwiLi9zcmMvYmFja2dyb3VuZC50c1wiLFxyXG4gICAgICAgICAgaW5kZXg6IFwiaW5kZXguaHRtbFwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lcyhjaHVua0luZm8pIHtcclxuICAgICAgICAgICAgc3dpdGNoIChjaHVua0luZm8ubmFtZSkge1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJpbmRleFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiYXNzZXRzL1tuYW1lXS1baGFzaDo4XS5qc1wiO1xyXG4gICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJbbmFtZV0uanNcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiBcImFzc2V0cy9bbmFtZV0uW2V4dF1cIixcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9IGFzIFVzZXJDb25maWc7XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStTLE9BQU8sVUFBVTtBQUNoVSxTQUFxQixvQkFBb0I7QUFDekMsT0FBTyxXQUFXO0FBRmxCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLE1BQUksU0FBUyxXQUFXO0FBQ3RCLFdBQU87QUFBQSxNQUNMLE9BQU87QUFBQSxRQUNMLGFBQWE7QUFBQSxRQUNiLFFBQVE7QUFBQSxRQUNSLGVBQWU7QUFBQSxVQUNiLE9BQU87QUFBQSxZQUNMLFNBQVM7QUFBQSxVQUNYO0FBQUEsVUFDQSxRQUFRO0FBQUEsWUFDTixzQkFBc0I7QUFBQSxZQUN0QixnQkFBZ0I7QUFBQSxVQUNsQjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQUEsSUFDTCxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsSUFDakIsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3RDO0FBQUEsSUFDRjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLFFBQ2IsT0FBTztBQUFBLFVBQ0wsWUFBWTtBQUFBLFVBQ1osT0FBTztBQUFBLFFBQ1Q7QUFBQSxRQUNBLFFBQVE7QUFBQSxVQUNOLGVBQWUsV0FBVztBQUN4QixvQkFBUSxVQUFVLE1BQU07QUFBQSxjQUN0QixLQUFLO0FBQ0gsdUJBQU87QUFBQSxjQUNUO0FBQ0UsdUJBQU87QUFBQSxZQUNYO0FBQUEsVUFDRjtBQUFBLFVBQ0EsZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
