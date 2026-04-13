"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

interface DeleteIdeaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  ideaName: string;
  loading?: boolean;
}

export function DeleteIdeaDialog({
  open,
  onOpenChange,
  onConfirm,
  ideaName,
  loading,
}: DeleteIdeaDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="relative overflow-hidden sm:max-w-md"
      >
        {/* Error accent bar */}
        <div className="bg-destructive absolute inset-x-0 top-0 h-1" />

        <div className="p-4">
          <DialogHeader>
            <div className="mb-6 flex items-center gap-4">
              <div className="bg-destructive/10 text-destructive flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
                <Trash2 className="h-5 w-5" />
              </div>
              <DialogTitle className="font-heading text-2xl font-bold tracking-tight">
                Eliminar idea
              </DialogTitle>
            </div>
            <DialogDescription className="leading-relaxed">
              Estas seguro de que deseas eliminar{" "}
              <span className="text-foreground font-bold">{ideaName}</span>?
              Esta accion no se puede deshacer y todos los datos asociados se
              perderan permanentemente.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="text-foreground hover:bg-surface-bright border-border rounded-lg border px-6 py-3 text-sm font-bold tracking-tight transition-all"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="shadow-destructive/20 rounded-lg bg-gradient-to-br from-[#ff6e84] to-[#d73357] px-6 py-3 text-sm font-bold tracking-tight text-white shadow-lg transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 dark:from-[#ff6e84] dark:to-[#d73357]"
            >
              {loading ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
