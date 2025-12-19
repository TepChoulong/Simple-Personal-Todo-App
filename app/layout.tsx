import type { Metadata } from "next";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <Toaster richColors position="bottom-right" expand />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
