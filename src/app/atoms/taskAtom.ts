import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const listAtom = atom({
  key: "listAtom",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
