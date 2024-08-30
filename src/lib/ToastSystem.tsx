import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import SuccessToast from "@/components/Toast/SuccessToast";

// Define the toast state atom
const toastState = atom({
  key: "toastState",
  default: null as string | null,
});

// Hook to show toasts
export const useToast = () => {
  const setToast = useSetRecoilState(toastState);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000); // Hide toast after 3 seconds
  };

  return { showToast };
};

// Component to render toasts
export const ToastContainer = () => {
  const [toast] = useRecoilState(toastState);

  return toast ? <SuccessToast message={toast} /> : null;
};
// Optional: RecoilRoot wrapper component
import { RecoilRoot } from "recoil";

export const RecoilWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <RecoilRoot>
    {children}
    <ToastContainer />
  </RecoilRoot>
);
