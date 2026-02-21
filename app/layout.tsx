import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RevDX - Revenue Diagnostic Engine",
  description: "AI-powered revenue diagnostics for B2B companies scaling from $5M to $100M+",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
