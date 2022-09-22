import { defineConfig } from "vite-plugin-windicss";
import plugin from "windicss/plugin";
import colors from "windicss/colors";

export default defineConfig({
  extract: {
    include: ["index.html", "src/**/*.{vue, ts}"],
  },
  plugins: [
    require("@windicss/plugin-question-mark"),
    require("@windicss/plugin-scrollbar"),
  ],
  theme: {
    extend: {
      colors: {
        "star-color-A": colors.white,
        "star-color-B": colors.transparent,
      },
    },
  },
});
