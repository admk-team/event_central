import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/js/app.tsx",
                "resources/js/website-script.js", // Add this
                "resources/css/website-styles.css",
                "resources/css/design1/index_styles.css",
                "resources/css/design2/index_styles.css",
                 // Ensure this is included
            ],
            refresh: true,
        }),
        react(),
    ],
});
