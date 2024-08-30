import { atom } from "recoil";

export const toastAtom = atom({
  key: "toastAtom", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
