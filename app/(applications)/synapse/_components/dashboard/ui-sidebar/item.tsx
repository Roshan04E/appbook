"use client";

import { useTransition } from "react";
import { ChevronRight, Plus, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useDocumentStore } from "../../../store/useDocumentStore";
import { deleteDocument } from "@/lib/database/tables/documents/action";
import { NoteIcon } from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/* ---------------- ITEM ---------------- */

interface ItemProps {
  id: string;
  label: string;
  level?: number;
  active?: boolean;
  expanded?: boolean;
  hasChildren?: boolean;
  documentIcon?: string;
  onClick?: () => void;
  onExpand?: () => void;
  onCreate?: () => void;
}

const Item = ({
  id,
  label,
  level = 0,
  active,
  expanded,
  hasChildren,
  documentIcon,
  onClick,
  onExpand,
  onCreate,
}: ItemProps) => {
  const [_, startTransition] = useTransition();
  const { removeDocument } = useDocumentStore();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the doc when deleting
    startTransition(async () => {
      const { success, message } = await deleteDocument(id);
      if (!success) {
        toast.error(message);
        return;
      }

      removeDocument(id);
      toast.success(message);
    });
  };

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: `${level * 12 + 12}px` }}
      className={cn(
        "group min-h-[28px] text-sm py-1 pr-3 w-full hover:bg-neutral-100/50 flex items-center text-neutral-500 transition-colors cursor-pointer",
        active && "bg-neutral-100/80 text-neutral-900 font-medium",
      )}
    >
      {/* 1. Toggle / Chevron Area */}
      <div
        className="h-full rounded-sm hover:bg-neutral-200/50 mr-0.5 flex items-center justify-center p-0.5 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          onExpand?.();
        }}
      >
        <ChevronRight
          className={cn(
            "h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200",
            expanded && "rotate-90 text-neutral-600",
            !hasChildren && "opacity-0 pointer-events-none",
          )}
        />
      </div>

      {/* 2. Document Icon */}
      {documentIcon ? (
        <span className="shrink-0 mr-2 text-[18px]">{documentIcon}</span>
      ) : (
        <NoteIcon
          weight={active ? "duotone" : "light"}
          className={cn(
            "shrink-0 h-[18px] w-[18px] mr-2 text-neutral-400",
            active && "text-neutral-700",
          )}
        />
      )}

      {/* 3. Label */}
      <span className="truncate select-none">{label}</span>

      {/* 4. Action Buttons (Appear on Hover) */}
      <div className="ml-auto flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 gap-1">
        {/* Create Child Button */}
        <div
          role="button"
          onClick={(e) => {
            e.stopPropagation();
            onCreate?.();
          }}
          className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-neutral-200 text-neutral-400 hover:text-neutral-700"
        >
          <Plus className="h-4 w-4" />
        </div>

        {/* Options Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              role="button"
              onClick={(e) => e.stopPropagation()}
              className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-neutral-200 text-neutral-400 hover:text-neutral-700"
            >
              <MoreHorizontal className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-48"
            align="start"
            side="right"
            forceMount
          >
            <DropdownMenuItem
              onClick={handleDelete}
              className="group/delete text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
            {/* You can add Rename/Duplicate here later */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Item;
