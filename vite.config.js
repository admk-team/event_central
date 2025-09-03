import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import i18n from 'laravel-react-i18n/vite' // 👈
export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/js/app.tsx",
                "resources/js/website-script.js", // Add this
                "resources/css/website-styles.css",
                //Design1 css
                "resources/css/design1/index_styles.css",
                "resources/css/design1/exhibitors_styles.css",
                "resources/css/design1/products_styles.css",
                "resources/css/design1/schedule_styles.css",
                "resources/css/design1/speakers_styles.css",
                "resources/css/design1/sponsor_single_styles.css",
                "resources/css/design1/sponsors_styles.css",

                //Design2 css
                "resources/css/design2/index_styles.css",
                "resources/css/design2/exhibitors_styles.css",
                "resources/css/design2/products_styles.css",
                "resources/css/design2/schedule_styles.css",
                "resources/css/design2/speakers_styles.css",
                "resources/css/design2/sponsor_single_styles.css",
                "resources/css/design2/sponsors_styles.css",

                //Design3 css
                "resources/css/design3/variables.css",
                "resources/css/design3/index.css",
                "resources/css/design3/exhibitors_style.css",
                "resources/css/design3/product_style.css",
                "resources/css/design3/schedule_style.css",
                "resources/css/design3/speakers_style.css",
                "resources/css/design3/sponsor_style.css",
                "resources/css/design3/single_sponsor_style.css",
                "resources/css/design3/tickets_style.css",

                // Ensure this is included
            ],
            refresh: true,
        }),
        react(),
        i18n(), // 👈 converts PHP lang files at dev/build time

    ],
});
