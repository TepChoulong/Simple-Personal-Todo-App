import type { Metadata } from "next";

import { SidebarProvider } from "@/components/ui/sidebar";

import NavSidebar from "@/components/NavSidebar";
import Header from "@/components/Header";

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
    <SidebarProvider>
      <NavSidebar />
      <main className="w-full flex-col">
        <Header />
        <div className="p-12">{children}</div>
      </main>
    </SidebarProvider>
  );
}
