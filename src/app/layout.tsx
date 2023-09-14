import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "./SectionProvider";
import Layout from "@src/components/layout/index";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hue Food Advertise",
  description: "Hue Food Advertise",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
