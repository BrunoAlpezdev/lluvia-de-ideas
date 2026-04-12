"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserAvatar } from "@/components/atoms/user-avatar";
import { StatusBadge } from "@/components/atoms/status-badge";
import { PriorityBadge } from "@/components/atoms/priority-badge";
import { CostBadge } from "@/components/atoms/cost-badge";
import { IdeaRowActions } from "@/components/molecules/idea-row-actions";
import { IdeaFormSheet } from "@/components/organisms/idea-form-sheet";
import { DeleteIdeaDialog } from "@/components/organisms/delete-idea-dialog";
import type { Idea } from "@/lib/types/database";
import { Plus } from "lucide-react";

interface IdeasTableProps {
  ideas: Idea[];
  userId: string;
  userName?: string;
  userAvatarUrl?: string;
}

const tabs = [
  { value: "todas", label: "Todas" },
  { value: "idea", label: "Ideas" },
  { value: "analisis", label: "En Analisis" },
  { value: "desarrollo", label: "En Desarrollo" },
  { value: "descartadas", label: "Descartadas" },
] as const;

const statusFilter: Record<string, Idea["estado"] | null> = {
  todas: null,
  idea: "Idea",
  analisis: "En análisis",
  desarrollo: "En desarrollo",
  descartadas: "Descartada",
};

export function IdeasTable({
  ideas,
  userId,
  userName,
  userAvatarUrl,
}: IdeasTableProps) {
  const router = useRouter();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingIdea, setEditingIdea] = useState<Idea | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingIdea, setDeletingIdea] = useState<Idea | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("todas");

  const filteredIdeas =
    statusFilter[activeTab] === null
      ? ideas
      : ideas.filter((i) => i.estado === statusFilter[activeTab]);

  const handleEdit = (idea: Idea) => {
    setEditingIdea(idea);
    setSheetOpen(true);
  };

  const handleNew = () => {
    setEditingIdea(null);
    setSheetOpen(true);
  };

  const handleDeleteClick = (idea: Idea) => {
    setDeletingIdea(idea);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingIdea) return;
    setDeleteLoading(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("ideas")
      .delete()
      .eq("id", deletingIdea.id);

    if (error) {
      toast.error("Error al eliminar la idea");
    } else {
      toast.success("Idea eliminada");
    }

    setDeleteLoading(false);
    setDeleteDialogOpen(false);
    setDeletingIdea(null);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ideas</h1>
        <Button onClick={handleNew} className="gap-1.5">
          <Plus className="h-4 w-4" />
          Nueva Idea
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {filteredIdeas.length === 0 ? (
            <div className="rounded-lg border border-dashed p-12 text-center">
              <p className="text-muted-foreground">
                {activeTab === "todas"
                  ? "No hay ideas registradas. Crea tu primera idea!"
                  : "No hay ideas en esta categoria."}
              </p>
            </div>
          ) : (
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead className="hidden md:table-cell">Idea</TableHead>
                    <TableHead>Costo</TableHead>
                    <TableHead>Prioridad</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Plazo
                    </TableHead>
                    <TableHead className="hidden text-right sm:table-cell">
                      Fecha
                    </TableHead>
                    <TableHead className="w-10" />
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIdeas.map((idea) => (
                    <TableRow key={idea.id}>
                      <TableCell className="font-medium">
                        {idea.nombre}
                      </TableCell>
                      <TableCell className="text-muted-foreground hidden max-w-[200px] truncate md:table-cell">
                        {idea.idea}
                      </TableCell>
                      <TableCell>
                        <CostBadge costo={idea.costo} />
                      </TableCell>
                      <TableCell>
                        <PriorityBadge prioridad={idea.prioridad} />
                      </TableCell>
                      <TableCell>
                        <StatusBadge estado={idea.estado} />
                      </TableCell>
                      <TableCell className="text-muted-foreground hidden text-sm lg:table-cell">
                        {idea.plazo_estimado ?? "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground hidden text-right text-sm sm:table-cell">
                        {new Date(idea.created_at).toLocaleDateString("es-ES")}
                      </TableCell>
                      <TableCell>
                        <IdeaRowActions
                          onEdit={() => handleEdit(idea)}
                          onDelete={() => handleDeleteClick(idea)}
                        />
                      </TableCell>
                      <TableCell>
                        <UserAvatar
                          name={idea.user_name}
                          avatarUrl={idea.user_avatar_url}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <IdeaFormSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        idea={editingIdea}
        userId={userId}
        userName={userName}
        userAvatarUrl={userAvatarUrl}
      />

      <DeleteIdeaDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        ideaName={deletingIdea?.nombre ?? ""}
        loading={deleteLoading}
      />
    </div>
  );
}
