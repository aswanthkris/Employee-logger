// src/components/ProtectRoute.tsx
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
// import { userAt } from '../recoil/atoms/authAtom';
import { userAtom } from "@/app/atoms/userAtom";

const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { token } = useRecoilValue(userAtom);

  useEffect(() => {
    if (!token) {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [token, router]);

  if (!token) {
    return null; // You can show a loading spinner here if desired
  }

  return { children };
};

export default ProtectRoute;
