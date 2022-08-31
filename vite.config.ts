import { defineConfig } from "vite";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import eslintPlugin from "vite-plugin-eslint";
import Markdown from "vite-plugin-md";
import matter from "gray-matter";
import Pages from "vite-plugin-pages";
import vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";

import { resolve } from "path";
import { readFileSync } from "fs";

import anchor from "markdown-it-anchor";
import attr from "markdown-it-link-attributes";
import Prism from "markdown-it-prism";
import toc from "markdown-it-table-of-contents";

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.gltf"],
  base: "/JWorld/",
  build: {
    chunkSizeWarningLimit: 1600,
  },
  define: {
    "process.env": process.env,
  },
  mode: process.env.MODE || process.env.NODE_ENV || "development",
  optimizeDeps: {
    include: ["vue", "vue-router", "@vueuse/core"],
  },
  plugins: [
    AutoImport({
      imports: [
        // presets
        "vue",
        "vue-router",
        // custom
        {
          "@vueuse/core": [
            // named imports
            "useMouse", // import { useMouse } from '@vueuse/core',
            // alias
            "useFetch",
          ],
          axios: [
            // default imports
            ["default", "axios"], // import { default as axios } from 'axios',
          ],
        },
      ],
      dts: true,
    }),
    Components({
      extensions: ["vue", "md"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      deep: true,
      dts: true,
    }),
    eslintPlugin(),
    Markdown({
      headEnabled: true,
      wrapperComponent: "post",
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      wrapperClasses: "article-body mb-5",
      markdownItSetup(md) {
        md.use(Prism);
        md.use(anchor, {
          permalink: true,
          permalinkBefore: true,
          permalinkSymbol: "#",
          permalinkAttrs: () => ({ "aria-hidden": true }),
        }),
          md.use(attr, {
            pattern: /^https?:/,
            attrs: {
              target: "_blank",
              rel: "noopener",
            },
          }),
          md.use(toc);
      },
    }),
    Pages({
      dirs: [
        {
          dir: "src/pages",
          baseRoute: "/JWorld/",
        },
        {
          dir: "posts",
          baseRoute: "posts",
        },
      ],
      extensions: ["vue", "md"],
      extendRoute(route) {
        // Get inspired from anthony fu"s personal website
        // https://github.com/antfu/antfu.me
        const path = resolve(__dirname, route.component.slice(1));
        const md = readFileSync(path, "utf-8");
        const { data } = matter(md);
        if (path.split(".").pop() == "md") {
          route.meta = Object.assign(route.meta || {}, { frontmatter: data });
        }
        return route;
      },
      routeStyle: "nuxt",
    }),
    vue(),
    WindiCSS(),
  ],
  resolve: {
    alias: {
      "~/": `${resolve(__dirname, "src")}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        sourceMap: false,
        additionalData(source: any, fp: any) {
          if (fp.endsWith("variables.scss")) return source;
          return `@import "~/assets/styles/_variables.scss"; ${source}`;
        },
      },
    },
  },
});
