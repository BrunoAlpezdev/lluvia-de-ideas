"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  if (!value)
    return <span className="text-muted-foreground/50 text-xs">—</span>;
  return (
    <span className={cn("text-sm", muted && "text-muted-foreground")}>
      {value}
    </span>
  );
}

export function IdeasDetailTable({ ideas }: IdeasDetailTableProps) {
  if (ideas.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center">
        <p className="text-muted-foreground">
          No hay ideas registradas aun.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="sticky left-0 z-10 bg-muted/50 min-w-[160px]">
              Nombre
            </TableHead>
            <TableHead className="min-w-[180px]">Idea</TableHead>
            <TableHead className="min-w-[100px]">Estado</TableHead>
            <TableHead className="min-w-[90px]">Prioridad</TableHead>
            <TableHead className="min-w-[80px]">Costo</TableHead>
            <TableHead className="min-w-[140px]">Plan de Negocio</TableHead>
            <TableHead className="min-w-[200px]">Descripcion</TableHead>
            <TableHead className="min-w-[200px]">Estructura</TableHead>
            <TableHead className="min-w-[200px]">Planificacion</TableHead>
            <TableHead className="min-w-[120px]">Plazo</TableHead>
            <TableHead className="min-w-[180px]">Mercado Objetivo</TableHead>
            <TableHead className="min-w-[180px]">Competencia</TableHead>
            <TableHead className="min-w-[180px]">Diferenciador</TableHead>
            <TableHead className="min-w-[180px]">Proyeccion</TableHead>
            <TableHead className="min-w-[180px]">Inversion</TableHead>
            <TableHead className="min-w-[100px] text-right">Fecha</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {ideas.map((idea) => (
            <TableRow
              key={idea.id}
              className={cn(
                "border-l-4 hover:bg-muted/30 transition-colors",
                statusRowAccent[idea.estado] ?? "border-l-transparent"
              )}
            >
              <TableCell className="sticky left-0 z-10 bg-background font-semibold">
                {idea.nombre}
              </TableCell>
              <TableCell>
                <TextCell value={idea.idea} />
              </TableCell>
              <TableCell>
                <ColorBadge value={idea.estado} colorMap={statusColor} />
              </TableCell>
              <TableCell>
                <ColorBadge value={idea.prioridad} colorMap={priorityColor} />
              </TableCell>
              <TableCell>
                <ColorBadge value={idea.costo} colorMap={costColor} />
              </TableCell>
              <TableCell>
                <TextCell value={idea.plan_de_negocio} muted />
              </TableCell>
              <TableCell>
                <TextCell value={idea.descripcion} />
              </TableCell>
              <TableCell>
                <TextCell value={idea.estructura} />
              </TableCell>
              <TableCell>
                <TextCell value={idea.planificacion} />
              </TableCell>
              <TableCell>
                <TextCell value={idea.plazo_estimado} muted />
              </TableCell>
              <TableCell>
                <TextCell value={idea.mercado_objetivo} />
              </TableCell>
              <TableCell>
                <TextCell value={idea.competencia} />
              </TableCell>
              <TableCell>
                <TextCell value={idea.diferenciador_clave} />
              </TableCell>
              <TableCell>
                <TextCell value={idea.proyeccion} />
              </TableCell>
              <TableCell>
                <TextCell value={idea.inversion} />
              </TableCell>
              <TableCell className="text-right text-xs text-muted-foreground whitespace-nowrap">
                {new Date(idea.created_at).toLocaleDateString("es-ES")}
              </TableCell>
              <TableCell>
                <Avatar className="h-7 w-7">
                  <AvatarImage
                    src={idea.user_avatar_url ?? undefined}
                    alt={idea.user_name ?? ""}
                  />
                  <AvatarFallback className="text-xs">
                    {idea.user_name?.[0]?.toUpperCase() ?? "?"}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
