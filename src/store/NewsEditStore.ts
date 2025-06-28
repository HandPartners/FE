import { proxy } from "valtio";

export const newsEditStore = proxy({
  hasReachedLimit: false,

  setHasReachedLimit(b: boolean) {
    this.hasReachedLimit = b;
  },
});
