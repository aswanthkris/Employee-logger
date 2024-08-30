import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DashboardElements from "@/components/Dashboard/Dashboard";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Chart | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Chart page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Dashboard: React.FC = () => {
  return (
    <DefaultLayout>
      <DashboardElements />
    </DefaultLayout>
  );
};

export default Dashboard;
