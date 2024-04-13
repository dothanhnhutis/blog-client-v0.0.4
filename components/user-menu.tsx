import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import AvatarDefault from "@/images/avatars/user-1.jpg";
import { LogOutIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { getCurrentUser } from "@/service/api/user";

export const UserMenu = async () => {
  const currentUser = await getCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none ">
        <Avatar>
          <AvatarImage src={currentUser?.avatarUrl ?? AvatarDefault.src} />
          <AvatarFallback className="bg-transparent">
            <Skeleton className="h-10 w-10 rounded-full" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[360px]">
        <DropdownMenuLabel className="flex items-center gap-3">
          <Avatar className="w-24 h-24">
            <AvatarImage src={currentUser?.avatarUrl ?? AvatarDefault.src} />
            <AvatarFallback className="bg-transparent">
              <Skeleton className="w-24 h-24 rounded-full" />
            </AvatarFallback>
          </Avatar>
          <div className="w-full overflow-hidden">
            <p className="font-medium text-lg">
              {currentUser?.name ?? "error"}
            </p>
            <p className="text-muted-foreground font-normal">
              {currentUser?.role ?? "error"}
            </p>
            <div className="flex items-center space-x-2 text-muted-foreground w-full">
              <MailIcon size={16} />
              <p className="text-sm truncate">
                {currentUser?.email ?? `error`}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {currentUser?.role == "ADMIN" && (
          <DropdownMenuItem asChild>
            <Link href="/manager" className="cursor-pointer">
              <span>Manager</span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild>
          <Link href="/account/profile" className="cursor-pointer">
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/settings" className="cursor-pointer">
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/auth/signout" className="cursor-pointer">
            <LogOutIcon className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
