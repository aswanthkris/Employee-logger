import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const userAtom = atom({
  key: "userAtom", // unique ID (with respect to other atoms/selectors)
  default: { token: "" }, // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});
