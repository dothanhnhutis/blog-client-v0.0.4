import React from "react";
import { Logo } from "../logo";
import Link from "next/link";
import { Button } from "../ui/button";
import { BellIcon, MenuIcon } from "lucide-react";
import { SwitchTheme } from "../switch-theme";
import { UserMenu } from "@/app/manager/user-menu";
import SiderBarComponent from "@/app/manager/siderbar";
import { getCurrentUser } from "@/service/api/user";

export const ManagerDefaultLayout = async ({
  isSiderBar = true,
  children,
}: {
  isSiderBar?: boolean;
  children: React.ReactNode;
}) => {
  const currentUser = await getCurrentUser();

  return (
    <main className="bg-muted/40 min-h-screen">
      <header className="backdrop-saturate-[1.8] sticky top-0 z-50 border-b backdrop-blur bg-background/50">
        <nav className="flex justify-between items-center p-2 pr-4 h-[72px]">
          <Logo className="hidden md:block" />
          <div className="hidden md:flex items-center space-x-6 ml-6 text-sm font-medium">
            <Link
              prefetch={false}
              href="/manager"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Manager
            </Link>
            <Link
              prefetch={false}
              href="/mail"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Mail
            </Link>
          </div>
          <Button variant="ghost" className="md:hidden">
            <MenuIcon className="w-5 h-5" />
          </Button>

          <div className="flex flex-1 items-center justify-end gap-4 ">
            <BellIcon className="size-5" />
            <SwitchTheme />
            <UserMenu />
          </div>
        </nav>
      </header>
      <div className="relative flex">
        {isSiderBar && (
          <SiderBarComponent role={currentUser?.role || "CUSTOMER"} />
        )}
        asdasd
        {children}
      </div>
    </main>
  );
};
