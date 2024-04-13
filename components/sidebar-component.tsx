"use client";
import React from "react";
import { SideBarGroup, SideBarLink, SideBar } from "@/components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ClipboardSignatureIcon,
  PackageIcon,
  SettingsIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Role } from "@/schemas/user";

const permissions: {
  [index: string]: {
    icon: JSX.Element;
    href: string;
    label: string;
    isActive: (path: string) => boolean;
  }[];
} = {
  ADMIN: [
    {
      icon: <PackageIcon className="lg:mr-2 size-6" />,
      href: "/manager/products",
      label: "Product",
      isActive: (path: string) => {
        return /^\/manager\/products(\/create|.+\/edit)?$/.test(path);
      },
    },
    {
      icon: <ClipboardSignatureIcon className="lg:mr-2 size-6" />,
      href: "/manager/blogs",
      label: "Post",
      isActive: (path: string) => {
        return /^\/manager\/blogs(\/create|.+\/edit)?$/.test(path);
      },
    },
    {
      icon: <UsersIcon className="lg:mr-2 size-6" />,
      href: "/manager/users",
      label: "User",
      isActive: (path: string) => {
        return /^\/manager\/users(\/create|.+\/edit)?$/.test(path);
      },
    },
  ],
  WRITER: [
    {
      icon: <ClipboardSignatureIcon className="lg:mr-2 size-6" />,
      href: "/manager/blogs",
      label: "Post",
      isActive: (path: string) => {
        return /^\/manager\/blogs(\/create|.+\/edit)?$/.test(path);
      },
    },
  ],
};

const SiderBarComponent = ({ role }: { role: Role }) => {
  const path = usePathname();
  return (
    <div className="sticky top-[73px] h-[calc(100vh-73px)] bg-background z-50">
      <ScrollArea className="hidden md:flex flex-shrink-0 lg:w-[200px] h-full border-r">
        <SideBar>
          {permissions[role] && (
            <SideBarGroup label="Manager">
              {permissions[role].map((permission, index) => (
                <SideBarLink
                  key={index}
                  icon={permission.icon}
                  title={permission.label}
                  href={permission.href}
                  isActive={permission.isActive(path)}
                  className="items-center justify-center lg:justify-start"
                >
                  <UserIcon className="lg:mr-2 size-6" />
                  <span className="text-base font-normal hidden lg:inline">
                    Profile
                  </span>
                </SideBarLink>
              ))}
            </SideBarGroup>
          )}

          <SideBarGroup label="Account">
            <SideBarLink
              icon={<UserIcon className="lg:mr-2 size-6" />}
              title="Profile"
              href={"/account/profile"}
              isActive={/^\/account\/profile(\/edit)?$/.test(path)}
              className="items-center justify-center lg:justify-start"
            >
              <UserIcon className="lg:mr-2 size-6" />
              <span className="text-base font-normal hidden lg:inline">
                Profile
              </span>
            </SideBarLink>
            <SideBarLink
              icon={<SettingsIcon className="lg:mr-2 size-6" />}
              title="Settings"
              href={"/account/settings"}
              isActive={/^\/account\/settings(\/change-password)?$/.test(path)}
              className="items-center justify-center lg:justify-start"
            >
              <UserIcon className="lg:mr-2 size-6" />
              <span className="text-base font-normal hidden lg:inline">
                Profile
              </span>
            </SideBarLink>
          </SideBarGroup>
        </SideBar>
      </ScrollArea>
    </div>
  );
};

export default SiderBarComponent;
