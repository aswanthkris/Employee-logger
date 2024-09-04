import Dashboard from "@/components/Dashboard/page";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SignIn from "./auth/signin/page";

export const metadata: Metadata = {
  title: "Dashboard | Radiant Acemoney",
  description: "Work Log Application For Employees",
};

export default function Home() {
  return (
    <>
      <SignIn />
    </>
  );
}
