"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

interface IdeaRowActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function IdeaRowActions({ onEdit, onDelete }: IdeaRowActionsProps) {
  return (
    <DropdownMenu>
      <div onClick={(e) => e.stopPropagation()}>
        <DropdownMenuTrigger className="hover:bg-surface-bright inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md transition-colors">
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
          <Pencil className="mr-2 h-4 w-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onDelete}
          className="text-destructive focus:text-destructive cursor-pointer"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
