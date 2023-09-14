"use client";
import React from "react";
import useDashboard, { Props } from "./hook";
import { ReceivedProps } from "./type";
import { signOut, useSession } from "next-auth/react";

const DashboardPageLayout = (props: Props) => {
  const session = useSession({
    required: true,
  });

  return <div></div>;
};

const Dashboard = (props: ReceivedProps) => {
  return <DashboardPageLayout {...useDashboard(props)} />;
};
export default Dashboard;
