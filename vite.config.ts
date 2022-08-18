import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [eslintPlugin(), vue(), WindiCSS()],
});
