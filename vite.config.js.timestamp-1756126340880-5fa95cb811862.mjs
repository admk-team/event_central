// vite.config.js
import { defineConfig } from "file:///D:/khurramprojects/event_central/node_modules/vite/dist/node/index.js";
import laravel from "file:///D:/khurramprojects/event_central/node_modules/laravel-vite-plugin/dist/index.js";
import react from "file:///D:/khurramprojects/event_central/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    laravel({
      input: [
        "resources/js/app.tsx",
        "resources/js/website-script.js",
        // Add this
        "resources/css/website-styles.css",
        "resources/css/design1/index_styles.css",
        "resources/css/design2/index_styles.css"
        // Ensure this is included
      ],
      refresh: true
    }),
    react()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxraHVycmFtcHJvamVjdHNcXFxcZXZlbnRfY2VudHJhbFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxca2h1cnJhbXByb2plY3RzXFxcXGV2ZW50X2NlbnRyYWxcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2todXJyYW1wcm9qZWN0cy9ldmVudF9jZW50cmFsL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCBsYXJhdmVsIGZyb20gXCJsYXJhdmVsLXZpdGUtcGx1Z2luXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW1xuICAgICAgICBsYXJhdmVsKHtcbiAgICAgICAgICAgIGlucHV0OiBbXG4gICAgICAgICAgICAgICAgXCJyZXNvdXJjZXMvanMvYXBwLnRzeFwiLFxuICAgICAgICAgICAgICAgIFwicmVzb3VyY2VzL2pzL3dlYnNpdGUtc2NyaXB0LmpzXCIsIC8vIEFkZCB0aGlzXG4gICAgICAgICAgICAgICAgXCJyZXNvdXJjZXMvY3NzL3dlYnNpdGUtc3R5bGVzLmNzc1wiLFxuICAgICAgICAgICAgICAgIFwicmVzb3VyY2VzL2Nzcy9kZXNpZ24xL2luZGV4X3N0eWxlcy5jc3NcIixcbiAgICAgICAgICAgICAgICBcInJlc291cmNlcy9jc3MvZGVzaWduMi9pbmRleF9zdHlsZXMuY3NzXCIsXG4gICAgICAgICAgICAgICAgIC8vIEVuc3VyZSB0aGlzIGlzIGluY2x1ZGVkXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVmcmVzaDogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICAgIHJlYWN0KCksXG4gICAgXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF3UixTQUFTLG9CQUFvQjtBQUNyVCxPQUFPLGFBQWE7QUFDcEIsT0FBTyxXQUFXO0FBRWxCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNMLFFBQVE7QUFBQSxNQUNKLE9BQU87QUFBQSxRQUNIO0FBQUEsUUFDQTtBQUFBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUE7QUFBQSxNQUVKO0FBQUEsTUFDQSxTQUFTO0FBQUEsSUFDYixDQUFDO0FBQUEsSUFDRCxNQUFNO0FBQUEsRUFDVjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
