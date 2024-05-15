import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": "/resources/js",
        },
    },
    build: {
        outDir: "public/build",
        rollupOptions: {
            input: "resources/js/app.js",
        },
    },
});
