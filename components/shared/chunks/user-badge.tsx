"use client";

import { User } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User as UserIcon } from "lucide-react";
import { signOutAction } from "@/lib/authentication/auth.action";
import { Button } from "@/components/ui/button";

const UserMenu = ({ user }: { user: User }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-6 w-6 flex items-center justify-center cursor-pointer rounded-full bg-neutral-800 text-white flex items-center justify-center">
          {user.name?.[0]}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 rounded-xl bg-white text-neutral-900
                   border border-neutral-200 shadow-xl"
      >
        <div className="px-3 py-2 text-sm">
          <p className="font-medium">{user.name}</p>
          <p className="text-xs text-neutral-500">{user.email}</p>
        </div>

        <DropdownMenuSeparator className="bg-neutral-200" />

        <DropdownMenuItem className="gap-2 hover:bg-neutral-100">
          <UserIcon size={16} />
          Profile
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-neutral-200" />

        <form action={signOutAction} className="w-full">
          <DropdownMenuItem
            asChild
            className="text-red-500 hover:bg-red-50 focus:bg-red-50
                       focus:text-red-600"
          >
            <Button
              variant="ghost"
              className="w-full flex gap-2 justify-start "
            >
              <LogOut size={16} />
              Logout
            </Button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
