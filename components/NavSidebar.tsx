import React from "react";

import Image from "next/image";

import { currentUser } from "@clerk/nextjs/server";

import {
  LayoutDashboard,
  SquareCheckBig,
  CalendarDays,
  Tag,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";

type NavItem = {
  title: string;
  url: string;
  icon: any;
};

const NavSidebar = async () => {
  const user = await currentUser();

  const nav_items: NavItem[] = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      title: "My tasks",
      url: "/dashboard/my-tasks",
      icon: <SquareCheckBig />,
    },
    {
      title: "Calendar",
      url: "/dashboard/calendar",
      icon: <CalendarDays />,
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: <Tag />,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col space-y-4 py-8">
        <h1 className="text-xl font-bold text-center">Simple Personal Todo</h1>

        <hr />

        <div className="user-info flex gap-4 px-4 items-center">
          <Image
            width={58}
            height={58}
            src={user?.imageUrl || ""}
            alt={user?.username || ""}
            className="rounded-full"
          />
          <div className="user-details">
            <h3 className="user-name font-semibold">{user?.username}</h3>
            <p className="user-email">{user?.emailAddresses[0].emailAddress}</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav_items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild size={"lg"}>
                    <Link href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size={"lg"}>
              <Link href="/">
                <LogOut />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default NavSidebar;
