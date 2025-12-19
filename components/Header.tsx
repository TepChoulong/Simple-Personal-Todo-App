import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { BellDot, Bell, Plus } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="bg-sidebar h-21 flex items-center justify-between px-4">
      <SidebarTrigger />

      <div className="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"icon-lg"} variant={"ghost"}>
              <BellDot />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 rounded-[10px] p-3">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="empty-notification h-44 space-y-2">
              <Bell
                className=" mx-auto bg-accent p-3 rounded-[10px] mt-15"
                size={55}
              />
              <h1 className="text-center text-lg font-medium">
                No Notifications
              </h1>
              <p className="text-sm text-center text-muted-foreground">
                You're all caught up. New notifications will appear here.
              </p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button className="font-semibold" asChild>
          <Link href="/dashboard/add-task">
            <Plus /> Add Task
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Header;
