"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/atoms/user-avatar";
import { StatusBadge } from "@/components/atoms/status-badge";
import { PriorityBadge } from "@/components/atoms/priority-badge";
import { CostBadge } from "@/components/atoms/cost-badge";
import { IdeaRowActions } from "@/components/molecules/idea-row-actions";
import { IdeaFormSheet } from "@/components/organisms/idea-form-sheet";
import { DeleteIdeaDialog } from "@/components/organisms/delete-idea-dialog";
import type { Idea } from "@/lib/types/database";
import { cn } from "@/lib/utils";
import { Plus, Search } from "lucide-react";

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

const statusAccent: Record<Idea["estado"], string> = {
  Idea: "var(--status-idea)",
  "En análisis": "var(--status-analisis)",
  "En desarrollo": "var(--status-desarrollo)",
  Descartada: "var(--status-descartada)",
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
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIdeas = ideas.filter((i) => {
    const matchesTab =
      statusFilter[activeTab] === null || i.estado === statusFilter[activeTab];
    const matchesSearch =
      searchQuery === "" ||
      i.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.idea.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (i.descripcion ?? "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

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
        <div>
          <h1 className="font-heading text-4xl font-bold tracking-tighter uppercase italic">
            IDEAS
          </h1>
          <p className="text-muted-foreground mt-1 max-w-md text-sm">
            Gestiona y organiza todas tus ideas de negocio
          </p>
        </div>
        <Button onClick={handleNew} className="gap-1.5 rounded-xl px-6 py-3">
          <Plus className="h-4 w-4" />
          Nueva Idea
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Buscar ideas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-accent text-foreground placeholder:text-muted-foreground focus:border-b-primary h-9 w-full rounded-full border-0 border-b-2 border-transparent pr-4 pl-10 text-sm transition-colors outline-none"
        />
      </div>

      <div className="flex items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              "rounded-full px-5 py-2 text-xs transition-colors",
              activeTab === tab.value
                ? "bg-primary text-primary-foreground font-bold"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filteredIdeas.length === 0 ? (
        <div className="border-border/50 rounded-xl border border-dashed p-12 text-center">
          <p className="text-muted-foreground">
            {activeTab === "todas"
              ? "No hay ideas registradas. Crea tu primera idea!"
              : "No hay ideas en esta categoria."}
          </p>
        </div>
      ) : (
        <div className="bg-card border-border/30 overflow-hidden rounded-xl border shadow-sm">
          <div className="overflow-x-auto overscroll-x-contain">
            <table className="w-full min-w-[2400px] border-collapse text-sm">
              <thead className="bg-surface-highest border-border/30 border-b">
                <tr>
                  <th className="bg-surface-highest text-muted-foreground sticky left-0 z-20 min-w-[200px] px-5 py-3 text-left text-[10px] font-bold tracking-[0.15em] uppercase shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)]">
                    Nombre
                  </th>
                  <th className="text-muted-foreground min-w-[200px] px-5 py-3 text-left text-[10px] font-bold tracking-[0.15em] uppercase">
                    Idea
                  </th>
                  <th className="text-muted-foreground min-w-[100px] px-5 py-3 text-left text-[10px] font-bold tracking-[0.15em] uppercase">
                    Estado
                  </th>
                  <th className="text-muted-foreground min-w-[100px] px-5 py-3 text-left text-[10px] font-bold tracking-[0.15em] uppercase">
                    Prioridad
                  </th>
                  <th className="text-muted-foreground min-w-[90px] px-5 py-3 text-left text-[10px] font-bold tracking-[0.15em] uppercase">
                    Costo
                  </th>
                  <th className="text-muted-foreground min-w-[150px] px-5 py-3 text-left text-[10px] font-bold tracking-[0.15em] uppercase">
                    Plan de Negocio
                  </th>
                  <th className="text-muted-foreground min-w-[240px] px-5 py-3 text-left text-[10px] font-bold tracking-[0.15em] uppercase">
                    Descripcion
                  </th>
                  <th className="text-muted-foreground min-w-[200px] px-5 py-3 text-left text-[10px] font-bold tracking-[0.15em] uppercase">
                    Estructura
                  </th>
                  <th className="text-muted-foreground min-w-[200px] px-5 py-3 text-left text-[10px] font-bold tracking-[0.15em] uppercase">
                    Planificacion
                  </th>
                  <th className="text-muted-foreground min-w-[120px] px-5 py-3 text-left text-[10px] font-bold tracking-[0.15em] uppercase">
                    Plazo
                  </th>
                  <th className="text-muted-foreground min-w-[200px] px-5 py-3 text-left text-[10px] font-bold tracking-[0.15em] uppercase">
                    Mercado
                  </th>
                  <th className="text-muted-foreground min-w-[200px] px-5 py-3 text-left text-[10px] font-bold tracking-[0.15em] uppercase">
                    Competencia
                  </th>
                  <th className="text-muted-foreground min-w-[200px] px-5 py-3 text-left text-[10px] font-bold tracking-[0.15em] uppercase">
                    Diferenciador
                  </th>
                  <th className="text-muted-foreground min-w-[180px] px-5 py-3 text-left text-[10px] font-bold tracking-[0.15em] uppercase">
                    Proyeccion
                  </th>
                  <th className="text-muted-foreground min-w-[180px] px-5 py-3 text-left text-[10px] font-bold tracking-[0.15em] uppercase">
                    Inversion
                  </th>
                  <th className="text-muted-foreground min-w-[100px] px-5 py-3 text-right text-[10px] font-bold tracking-[0.15em] uppercase">
                    Fecha
                  </th>
                  <th className="bg-surface-highest sticky right-0 z-20 w-12 px-3 py-4 shadow-[-2px_0_4px_-2px_rgba(0,0,0,0.1)]" />
                </tr>
              </thead>
              <tbody className="divide-border/20 divide-y">
                {filteredIdeas.map((idea) => (
                  <tr
                    key={idea.id}
                    className={cn(
                      "group hover:bg-surface-bright",
                      idea.estado === "Descartada" && "opacity-60",
                    )}
                  >
                    {/* Sticky Name */}
                    <td
                      onClick={() => router.push(`/ideas/${idea.id}`)}
                      className="bg-card group-hover:bg-surface-bright hover:bg-surface-highest sticky left-0 z-10 cursor-pointer px-5 py-3 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)]"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="h-8 w-1 flex-shrink-0 rounded-full"
                          style={{ backgroundColor: statusAccent[idea.estado] }}
                        />
                        <UserAvatar
                          name={idea.user_name}
                          avatarUrl={idea.user_avatar_url}
                          className="h-8 w-8 rounded-lg"
                        />
                        <span className="group-hover:text-primary text-sm font-bold transition-colors">
                          {idea.nombre}
                        </span>
                      </div>
                    </td>
                    <td className="text-muted-foreground max-w-[240px] truncate px-5 py-3 text-xs">
                      {idea.idea}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge estado={idea.estado} />
                    </td>
                    <td className="px-5 py-3">
                      <PriorityBadge prioridad={idea.prioridad} />
                    </td>
                    <td className="px-5 py-3">
                      <CostBadge costo={idea.costo} />
                    </td>
                    <td className="text-muted-foreground px-5 py-3 text-sm">
                      {idea.plan_de_negocio ?? (
                        <span className="text-muted-foreground/40">—</span>
                      )}
                    </td>
                    <td className="text-muted-foreground max-w-[240px] truncate px-5 py-3 text-sm">
                      {idea.descripcion ?? (
                        <span className="text-muted-foreground/40">—</span>
                      )}
                    </td>
                    <td className="text-muted-foreground px-5 py-3 text-sm">
                      {idea.estructura ?? (
                        <span className="text-muted-foreground/40">—</span>
                      )}
                    </td>
                    <td className="text-muted-foreground px-5 py-3 text-sm">
                      {idea.planificacion ?? (
                        <span className="text-muted-foreground/40">—</span>
                      )}
                    </td>
                    <td className="text-muted-foreground px-5 py-3 text-sm">
                      {idea.plazo_estimado ?? (
                        <span className="text-muted-foreground/40">—</span>
                      )}
                    </td>
                    <td className="text-muted-foreground px-5 py-3 text-sm">
                      {idea.mercado_objetivo ?? (
                        <span className="text-muted-foreground/40">—</span>
                      )}
                    </td>
                    <td className="text-muted-foreground px-5 py-3 text-sm">
                      {idea.competencia ?? (
                        <span className="text-muted-foreground/40">—</span>
                      )}
                    </td>
                    <td className="text-muted-foreground px-5 py-3 text-sm">
                      {idea.diferenciador_clave ?? (
                        <span className="text-muted-foreground/40">—</span>
                      )}
                    </td>
                    <td className="text-muted-foreground px-5 py-3 text-sm">
                      {idea.proyeccion ?? (
                        <span className="text-muted-foreground/40">—</span>
                      )}
                    </td>
                    <td className="text-muted-foreground px-5 py-3 text-sm">
                      {idea.inversion ?? (
                        <span className="text-muted-foreground/40">—</span>
                      )}
                    </td>
                    <td className="text-muted-foreground px-5 py-3 text-right text-sm whitespace-nowrap">
                      {new Date(idea.created_at).toLocaleDateString("es-ES")}
                    </td>
                    {/* Sticky Actions */}
                    <td className="bg-card group-hover:bg-surface-bright sticky right-0 z-10 px-3 py-4 text-right shadow-[-2px_0_4px_-2px_rgba(0,0,0,0.1)]">
                      <IdeaRowActions
                        onEdit={() => handleEdit(idea)}
                        onDelete={() => handleDeleteClick(idea)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Footer */}
          <div className="border-border/30 bg-surface-bright flex items-center justify-between border-t px-6 py-3">
            <span className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase">
              Mostrando {filteredIdeas.length} de {ideas.length} ideas
            </span>
          </div>
        </div>
      )}

      <IdeaFormSheet
        key={editingIdea?.id ?? "new"}
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
