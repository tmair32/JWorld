import { PluginFunction } from "vue";

declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "*.md" {
  import { ComponentOptions } from "vue";
  const Component: ComponentOptions;
  export default Component;
}

declare module "aos" {
  export const install: PluginFunction<{}>;
}

declare module "animejs" {
  export const install: PluginFunction<{}>;
}
