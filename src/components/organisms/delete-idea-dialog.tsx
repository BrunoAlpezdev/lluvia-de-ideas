"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
      <DialogContent className="relative overflow-hidden">
        <div className="bg-destructive absolute top-0 right-0 left-0 h-1" />
        <DialogHeader>
          <div className="mb-2 flex items-center gap-4">
            <div className="bg-destructive/10 text-destructive flex h-12 w-12 items-center justify-center rounded-full">
              <Trash2 className="h-5 w-5" />
            </div>
            <DialogTitle>Eliminar idea</DialogTitle>
          </div>
          <DialogDescription>
            Estas seguro de que quieres eliminar &ldquo;{ideaName}&rdquo;? Esta
            accion no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className="shadow-destructive/20 bg-gradient-to-br from-[#ff6e84] to-[#d73357] text-white shadow-lg hover:opacity-90"
          >
            {loading ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
