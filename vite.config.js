import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    base: "/wdd330-classcheck/",
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                attendance: resolve(__dirname, "attendance.html"),
                student: resolve(__dirname, "student.html"),
            },
        },
    },
});