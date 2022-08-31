import { ViteSSG } from "vite-ssg";
import { createPinia } from "pinia";
import "virtual:windi.css";
import "virtual:windi-devtools";
import App from "./App.vue";
import autoRoutes from "virtual:generated-pages";
import { RouterScrollBehavior } from "vue-router";

const routes = autoRoutes.map((i) => {
  return {
    ...i,
    alias: i.path.endsWith("/") ? `${i.path}index.html` : `${i.path}.html`,
  };
});

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  return { top: 0, behavior: "smooth" };

  // if (savedPosition) return savedPosition;
  // else return { top: 0, behavior: "smooth" };
};

export const createApp = ViteSSG(App, { routes, scrollBehavior }, (ctx) => {
  Object.values(import.meta.glob("./module/*.ts", { eager: true })).map(
    (i: any) => i.install?.(ctx)
  );

  const pinia = createPinia();
  ctx.app.use(pinia);

  if (import.meta.env.SSR) {
    ctx.initialState.pinia = pinia.state.value;
  } else {
    pinia.state.value = ctx.initialState.pinia || {};
  }
});
