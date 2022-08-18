import { defineConfig } from "vite-plugin-windicss";
import plugin from "windicss/plugin";

export default defineConfig({
  extract: {
    include: ["index.html", "src/**/*.{vue, ts}"],
  },
  plugins: [require("@windicss/plugin-question-mark")],
});
