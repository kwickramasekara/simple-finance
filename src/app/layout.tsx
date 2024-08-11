import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Simple Finance",
  description: "The home for your personal finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-screen-3xl mx-auto border-x",
          `${GeistSans.variable} ${GeistMono.variable}`
        )}
      >
        {children}
      </body>
    </html>
  );
}
