import { ViteSSG } from "vite-ssg";
import { createPinia } from "pinia";
import "virtual:windi.css";
import "virtual:windi-devtools";
import App from "./App.vue";
import routes from "virtual:generated-pages";
import { RouterScrollBehavior } from "vue-router";

import AOS from "aos";
import "aos/dist/aos.css";

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) return savedPosition;
  else return { top: 0, behavior: "smooth" };
};

export const createApp = ViteSSG(App, { routes, scrollBehavior }, (ctx) => {
  Object.values(import.meta.glob("./module/*.ts", { eager: true })).map(
    (i: any) => i.install?.(ctx)
  );

  AOS.init();

  const pinia = createPinia();
  ctx.app.use(pinia);

  if (import.meta.env.SSR) {
    ctx.initialState.pinia = pinia.state.value;
  } else {
    pinia.state.value = ctx.initialState.pinia || {};
  }
});
