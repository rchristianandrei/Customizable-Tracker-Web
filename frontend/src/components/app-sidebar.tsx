import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {} = useSidebar();
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <span className="font-medium">Customizable Tracker</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <a href="/" className="w-full">
              Dashboard
            </a>
          </SidebarMenuButton>
          <SidebarMenuButton>
            <a href="/submit-tracker" target="_blank" className="w-full">
              Submit Tracker
            </a>
          </SidebarMenuButton>
          <SidebarMenuButton>
            <a href="/manage-tracker" className="w-full">
              Manage Tracker
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarContent>
      <SidebarFooter>User</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
