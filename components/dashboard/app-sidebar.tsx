"use client";

import * as React from "react";
import {
    Command,
    Layers,
    PackageSearch,
    UserRound,
} from "lucide-react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavUser } from "@/components/dashboard/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { User as UserType} from "@supabase/supabase-js";

type Props = {
    currentUser: UserType
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & Props;

const data = {
    menuList: [
        {
            name: "Products",
            url: "/dashboard/products",
            icon: PackageSearch,
        },
        // {
        //     name: "Categories",
        //     url: "/dashboard/categories",
        //     icon: Layers,
        // },
        // {
        //     name: "Users",
        //     url: "/dashboard/users",
        //     icon: UserRound,
        // },
        // {
        //     name: "Admin users",
        //     url: "/dashboard/admin-users",
        //     icon: UserRound,
        // },
    ],
};

export function AppSidebar({ currentUser, ...props }:AppSidebarProps) {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        Acme Inc
                                    </span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain menuList={data.menuList} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={currentUser} />
            </SidebarFooter>
        </Sidebar>
    );
}
