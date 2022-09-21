import { defineStore } from "pinia";

interface State {
  title: string;
}

export const useBlogStore = defineStore("blog", {
  state: (): State => {
    return {
      title: "J's Dev Blog",
    };
  },
  actions: {
    setTitle(title: string) {
      this.title = title;
    },
  },
});
