import { snapshot_UNSTABLE } from "recoil";
import { userAtom } from "@/app/atoms/userAtom"; // Import your Recoil state

export const getRecoilToken = () => {
  const snapshot = snapshot_UNSTABLE();
  const token = snapshot.getLoadable(userAtom).contents.token;
  return token;
};