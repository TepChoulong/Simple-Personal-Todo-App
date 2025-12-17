import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simple Personal Todo",
  description: "Welcome to SimplePersonalTodo!",
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
