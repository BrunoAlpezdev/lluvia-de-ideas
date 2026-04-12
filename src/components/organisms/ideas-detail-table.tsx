"use client";

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

interface IdeasDetailTableProps {
  ideas: Idea[];
}

const priorityColor: Record<string, string> = {
  Alta: "bg-red-100 text-red-800 border-red-200",
  Media: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Baja: "bg-green-100 text-green-800 border-green-200",
};

const statusColor: Record<string, string> = {
  Idea: "bg-blue-100 text-blue-800 border-blue-200",
  "En análisis": "bg-purple-100 text-purple-800 border-purple-200",
  "En desarrollo": "bg-orange-100 text-orange-800 border-orange-200",
  Descartada: "bg-gray-100 text-gray-800 border-gray-200",
};

const costColor: Record<string, string> = {
  Bajo: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medio: "bg-amber-50 text-amber-700 border-amber-200",
  Alto: "bg-rose-50 text-rose-700 border-rose-200",
};

const statusRowAccent: Record<string, string> = {
  Idea: "border-l-blue-400",
  "En análisis": "border-l-purple-400",
  "En desarrollo": "border-l-orange-400",
  Descartada: "border-l-gray-400",
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
    <Badge className={cn("border font-medium", colorMap[value] ?? "")}>
      {value}
    </Badge>
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
  if (ideas.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center">
        <p className="text-muted-foreground">No hay ideas registradas aun.</p>
      </div>
    );
  }

  const headClass = "text-sm py-4 px-5 whitespace-nowrap";
  const cellClass = "py-4 px-5";

  return (
    <div className="overflow-x-auto rounded-lg border">
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
          {ideas.map((idea) => (
            <TableRow
              key={idea.id}
              className={cn(
                "hover:bg-muted/30 border-l-4 transition-colors",
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
  );
}
