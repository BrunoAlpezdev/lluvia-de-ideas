"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/atoms/user-avatar";
import type { Idea } from "@/lib/types/database";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface IdeasDetailTableProps {
  ideas: Idea[];
}

const priorityColor: Record<string, string> = {
  Alta: "bg-priority-alta/10 text-priority-alta",
  Media: "bg-priority-media/10 text-priority-media",
  Baja: "bg-priority-baja/10 text-priority-baja",
};

const statusColor: Record<string, string> = {
  Idea: "bg-status-idea/10 text-status-idea",
  "En análisis": "bg-status-analisis/10 text-status-analisis",
  "En desarrollo": "bg-status-desarrollo/10 text-status-desarrollo",
  Descartada: "bg-status-descartada/10 text-status-descartada",
};

const costColor: Record<string, string> = {
  Bajo: "bg-cost-bajo/10 text-cost-bajo",
  Medio: "bg-cost-medio/10 text-cost-medio",
  Alto: "bg-cost-alto/10 text-cost-alto",
};

const statusRowAccent: Record<string, string> = {
  Idea: "border-l-status-idea",
  "En análisis": "border-l-status-analisis",
  "En desarrollo": "border-l-status-desarrollo",
  Descartada: "border-l-status-descartada",
};

function ColorBadge({
  value,
  colorMap,
}: {
  value: string | null;
  colorMap: Record<string, string>;
}) {
  if (!value) return <span className="text-muted-foreground">—</span>;
  return (
    <Badge className={cn("font-medium", colorMap[value] ?? "")}>{value}</Badge>
  );
}

function TextCell({ value, muted }: { value: string | null; muted?: boolean }) {
  if (!value) return <span className="text-muted-foreground/40">—</span>;
  return (
    <span
      className={cn(
        "text-sm leading-relaxed",
        muted && "text-muted-foreground",
      )}
    >
      {value}
    </span>
  );
}

export function IdeasDetailTable({ ideas }: IdeasDetailTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIdeas = ideas.filter((i) => {
    if (searchQuery === "") return true;
    const q = searchQuery.toLowerCase();
    return (
      i.nombre.toLowerCase().includes(q) ||
      i.idea.toLowerCase().includes(q) ||
      (i.descripcion ?? "").toLowerCase().includes(q) ||
      (i.plan_de_negocio ?? "").toLowerCase().includes(q)
    );
  });

  if (ideas.length === 0) {
    return (
      <div className="border-border/50 rounded-lg border border-dashed p-12 text-center">
        <p className="text-muted-foreground">No hay ideas registradas aun.</p>
      </div>
    );
  }

  const headClass = "text-sm py-4 px-5 whitespace-nowrap";
  const cellClass = "py-4 px-5";

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Buscar en desglose..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-accent text-foreground placeholder:text-muted-foreground focus:border-b-primary h-9 w-full rounded-full border-0 border-b-2 border-transparent pr-4 pl-10 text-sm transition-colors outline-none"
        />
      </div>
      <div className="overflow-x-auto rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className={cn(headClass, "min-w-[180px]")}>
                Nombre
              </TableHead>
              <TableHead className={cn(headClass, "min-w-[220px]")}>
                Idea
              </TableHead>
              <TableHead className={cn(headClass, "min-w-[130px]")}>
                Estado
              </TableHead>
              <TableHead className={cn(headClass, "min-w-[110px]")}>
                Prioridad
              </TableHead>
              <TableHead className={cn(headClass, "min-w-[100px]")}>
                Costo
              </TableHead>
              <TableHead className={cn(headClass, "min-w-[160px]")}>
                Plan de Negocio
              </TableHead>
              <TableHead className={cn(headClass, "min-w-[260px]")}>
                Descripcion
              </TableHead>
              <TableHead className={cn(headClass, "min-w-[260px]")}>
                Estructura
              </TableHead>
              <TableHead className={cn(headClass, "min-w-[260px]")}>
                Planificacion
              </TableHead>
              <TableHead className={cn(headClass, "min-w-[130px]")}>
                Plazo
              </TableHead>
              <TableHead className={cn(headClass, "min-w-[220px]")}>
                Mercado Objetivo
              </TableHead>
              <TableHead className={cn(headClass, "min-w-[220px]")}>
                Competencia
              </TableHead>
              <TableHead className={cn(headClass, "min-w-[220px]")}>
                Diferenciador
              </TableHead>
              <TableHead className={cn(headClass, "min-w-[220px]")}>
                Proyeccion
              </TableHead>
              <TableHead className={cn(headClass, "min-w-[220px]")}>
                Inversion
              </TableHead>
              <TableHead className={cn(headClass, "min-w-[110px] text-right")}>
                Fecha
              </TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIdeas.map((idea) => (
              <TableRow
                key={idea.id}
                className={cn(
                  "border-l-4 transition-colors",
                  statusRowAccent[idea.estado] ?? "border-l-transparent",
                )}
              >
                <TableCell className={cn(cellClass, "text-base font-semibold")}>
                  {idea.nombre}
                </TableCell>
                <TableCell className={cellClass}>
                  <TextCell value={idea.idea} />
                </TableCell>
                <TableCell className={cellClass}>
                  <ColorBadge value={idea.estado} colorMap={statusColor} />
                </TableCell>
                <TableCell className={cellClass}>
                  <ColorBadge value={idea.prioridad} colorMap={priorityColor} />
                </TableCell>
                <TableCell className={cellClass}>
                  <ColorBadge value={idea.costo} colorMap={costColor} />
                </TableCell>
                <TableCell className={cellClass}>
                  <TextCell value={idea.plan_de_negocio} muted />
                </TableCell>
                <TableCell className={cellClass}>
                  <TextCell value={idea.descripcion} />
                </TableCell>
                <TableCell className={cellClass}>
                  <TextCell value={idea.estructura} />
                </TableCell>
                <TableCell className={cellClass}>
                  <TextCell value={idea.planificacion} />
                </TableCell>
                <TableCell className={cellClass}>
                  <TextCell value={idea.plazo_estimado} muted />
                </TableCell>
                <TableCell className={cellClass}>
                  <TextCell value={idea.mercado_objetivo} />
                </TableCell>
                <TableCell className={cellClass}>
                  <TextCell value={idea.competencia} />
                </TableCell>
                <TableCell className={cellClass}>
                  <TextCell value={idea.diferenciador_clave} />
                </TableCell>
                <TableCell className={cellClass}>
                  <TextCell value={idea.proyeccion} />
                </TableCell>
                <TableCell className={cellClass}>
                  <TextCell value={idea.inversion} />
                </TableCell>
                <TableCell
                  className={cn(
                    cellClass,
                    "text-muted-foreground text-right text-sm whitespace-nowrap",
                  )}
                >
                  {new Date(idea.created_at).toLocaleDateString("es-ES")}
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
    </div>
  );
}
