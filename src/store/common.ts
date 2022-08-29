import { defineStore } from "pinia";
import { ClientSizeType } from "./types/Common";

interface State extends ClientSizeType {}

export const useCommonStore = defineStore("common", {
  state: (): State => {
    return {
      clientWidth: 0,
      clientHeight: 0,
    };
  },
  actions: {
    ChangeClientSize(payload: ClientSizeType) {
      this.clientWidth = payload.clientWidth;
      this.clientHeight = payload.clientHeight;
    },
  },
});
