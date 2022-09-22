import { defineStore } from "pinia";

interface State {
  menuStatus: boolean;
  title: string;
}

export const useBlogStore = defineStore("blog", {
  state: (): State => {
    return {
      menuStatus: false,
      title: "J's Dev Blog",
    };
  },
  actions: {
    setTitle(title: string) {
      this.title = title;
    },
    toggleMenu() {
      this.menuStatus = !this.menuStatus;
    },
  },
});
