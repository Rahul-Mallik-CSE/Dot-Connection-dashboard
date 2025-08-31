/** @format */

"use client";

import type React from "react";

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Settings,
  StrikethroughIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import LogoutModal from "./logout-modal";
import { useState } from "react";

// import { logout } from "@/service/authService";
export default function DashboardSidebar() {
  return <DashboardSidebarContent />;
}

function DashboardSidebarContent() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { state } = useSidebar();

  const handleLogout = async () => {
    // Perform logout actions here (clear tokens, etc.)
    // Redirect to login page
    // await logout();
    // localStorage.removeItem("accessToken");
    router.push("/signin");
  };

  if (
    pathname === "/signin" ||
    pathname === "/create-account" ||
    pathname === "/forget-password" ||
    pathname === "/verify-password" ||
    pathname === "/verify-otp" ||
    pathname === "/reset-password"
  ) {
    return null;
  }

  const isCollapsed = state === "collapsed";

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <SidebarTrigger />
      </div>
      <Sidebar
        className="border-r-0 border-transparent !bg-[#F2F6FF]"
        collapsible="icon"
      >
        <SidebarContent>
          <div
            className={`flex items-center justify-center px-4 py-6 relative ${
              isCollapsed ? "px-2" : "gap-2"
            }`}
          >
            <Link href="/">
              <Image
                src="/image.png"
                alt="logo"
                width={isCollapsed ? 40 : 140}
                height={isCollapsed ? 40 : 140}
                className={isCollapsed ? "hidden" : "h-7 w-24"}
              />
            </Link>
            {/* Collapse button for desktop */}
            <div
              className={`absolute top-1 hidden md:block ${
                isCollapsed ? "right-0" : "right-0"
              }`}
            >
              <SidebarTrigger />
            </div>
          </div>

          <SidebarMenu
            className={
              isCollapsed ? "px-2 space-y-2 items-center" : "px-6 space-y-6"
            }
          >
            <NavItem
              href="/"
              icon={LayoutDashboard}
              label="Dashboard"
              active={pathname === "/"}
              collapsed={isCollapsed}
            />
            <NavItem
              href="/users"
              icon={Users}
              label="Users"
              active={pathname === "/users" || pathname.startsWith("/users")}
              collapsed={isCollapsed}
            />

            <NavItem
              href="/skinCondition"
              icon={StrikethroughIcon}
              label="Skin Condition"
              active={
                pathname === "/skinCondition" ||
                pathname.startsWith("/skinCondition")
              }
              collapsed={isCollapsed}
            />
            <NavItem
              href="/uploadProduct"
              icon={StrikethroughIcon}
              label="Upload Product"
              active={
                pathname === "/uploadProduct" ||
                pathname.startsWith("/uploadProduct")
              }
              collapsed={isCollapsed}
            />

            <NavItem
              href="/setting"
              icon={Settings}
              label="Setting"
              active={
                pathname === "/setting" || pathname.startsWith("/setting/")
              }
              collapsed={isCollapsed}
            />
          </SidebarMenu>
        </SidebarContent>

        {!isCollapsed && (
          <SidebarFooter className="p-6">
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="flex w-full items-center gap-3  px-4 py-3"
            >
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.4 7.56023C9.71 3.96023 11.56 2.49023 15.61 2.49023H15.74C20.21 2.49023 22 4.28023 22 8.75023V15.2702C22 19.7402 20.21 21.5302 15.74 21.5302H15.61C11.59 21.5302 9.74 20.0802 9.41 16.5402"
                  stroke="#4F3E19"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.5 12H4.12"
                  stroke="#4F3E19"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.35 8.65039L3 12.0004L6.35 15.3504"
                  stroke="#4F3E19"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="text-primary text-lg font-semibold">
                Log out
              </span>
            </button>
          </SidebarFooter>
        )}
      </Sidebar>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}

// ...existing code...

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
  collapsed?: boolean;
}

function NavItem({
  href,
  icon: Icon,
  label,
  active,
  collapsed = false,
}: NavItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          href={href}
          className={cn(
            collapsed
              ? "flex items-center justify-center px-2 py-3 transition-colors rounded-full w-12 h-12 mx-auto"
              : "flex items-center gap-3 px-4 !py-5 transition-colors rounded-full",
            active
              ? "bg-gradient-to-br from-blue-600 via-blue-500 to-teal-400 text-white"
              : "hover:bg-gradient-to-br hover:from-blue-600 hover:via-blue-500 hover:to-teal-400 hover:text-white"
          )}
        >
          <Icon size={collapsed ? 20 : 18} />
          {!collapsed && (
            <span className={`text-lg ${active ? "text-secondary" : ""}`}>
              {label}
            </span>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
// ...existing code...
