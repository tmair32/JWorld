import { ViteSSG } from "vite-ssg";
import "virtual:windi.css";
import "virtual:windi-devtools";
import App from "./App.vue";
import routes from "virtual:generated-pages";
import { RouterScrollBehavior } from "vue-router";

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) return savedPosition;
  else return { top: 0, behavior: "smooth" };
};

export const createApp = ViteSSG(App, { routes, scrollBehavior }, (ctx) => {
  Object.values(import.meta.glob("./module/*.ts", { eager: true })).map(
    (i: any) => i.install?.(ctx)
  );
});
