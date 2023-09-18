import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Hue Food Advertise - Dashboard",
  description: "Hue Food Advertise",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
        {children}
    </div>
  );
}
