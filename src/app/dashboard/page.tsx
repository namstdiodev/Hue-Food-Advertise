"use client";
import React from "react";
import useDashboard, { Props } from "./hook";
import { ReceivedProps } from "./type";

const DashboardPageLayout = (props: Props) => {
  return (
    <div>1212</div>
  )
};

const Dashboard = (props: ReceivedProps) => {
  return <DashboardPageLayout {...useDashboard(props)} />;
};
export default Dashboard;
