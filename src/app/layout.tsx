"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppLayout from "@src/components/AppLayout";
import { usePathname } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Hue Food Advertise",
//   description: "Hue Food Advertise",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        {pathname !== "/login" ? <AppLayout>{children}</AppLayout> : children}
        <title>Huế Food Advertise</title>
      </body>
      
    </html>
  );
}
