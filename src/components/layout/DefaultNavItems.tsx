import React from "react";

import { MenuOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};
export const defaultNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "#",
    icon: <HomeOutlined className="w-6 h-6" />,
  },
  {
    label: "User",
    href: "#",
    icon: <UserOutlined className="w-6 h-6" />,
  },
];
