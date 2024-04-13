import React from "react";
import { SwitchTheme } from "@/components/switch-theme";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { BellIcon, MenuIcon } from "lucide-react";
import { UserMenu } from "@/components/user-menu";
import SiderBarComponent from "@/components/sidebar-component";
import { getCurrentUser } from "@/service/api/user";

const AccountLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  return (
    <main>
      <header className="backdrop-saturate-[1.8] sticky top-0 z-50 border-b backdrop-blur bg-background/60">
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
      <div className="relative flex bg-muted/50">
        <SiderBarComponent role={currentUser?.role || "CUSTOMER"} />
        {children}
      </div>
    </main>
  );
};

export default AccountLayout;
