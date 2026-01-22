"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { LogOut, User } from "lucide-react"; // Optional icons for that native feel

const UserItems = () => {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="mt-6">
        <div
          role="button"
          className="
            flex items-center gap-2.5
            px-2.5 py-1.5 rounded-lg
            bg-white/70 backdrop-blur-md
            border border-white/40 shadow-sm
            hover:bg-white/90 hover:border-white/60
            transition-all duration-200 cursor-default select-none
            active:scale-[0.98]
          "
        >
          <Avatar className="h-5 w-5 border border-black/5">
            <AvatarImage src={session?.user?.image as string} />
            <AvatarFallback className="text-[10px] bg-neutral-200">
              {session?.user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <span className="text-[13px] font-medium text-neutral-700 tracking-tight">
            {session?.user?.name?.split(" ")[0]}’s Synapse
          </span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-56 mt-2 p-1.5 rounded-xl bg-white/80 backdrop-blur-xl border-white/40 shadow-2xl"
      >
        <DropdownMenuLabel className="px-2 py-1.5">
          <div className="flex flex-col space-y-0.5">
            <p className="text-[13px] font-semibold text-neutral-900 leading-none">
              {session?.user?.name}
            </p>
            <p className="text-[11px] font-medium text-neutral-500 leading-none">
              {session?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-neutral-200/50" />

        <DropdownMenuItem className="rounded-md px-2 py-1.5 text-[13px] focus:bg-blue-600 focus:text-white transition-colors cursor-default">
          <User className="mr-2 h-4 w-4 opacity-70" />
          Profile Settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItems;
