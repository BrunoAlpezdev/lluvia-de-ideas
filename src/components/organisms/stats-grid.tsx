import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusBadge } from "@/components/atoms/status-badge";
import { PriorityBadge } from "@/components/atoms/priority-badge";
import { CostBadge } from "@/components/atoms/cost-badge";
import { StatItem } from "@/components/molecules/stat-item";
import type { Idea } from "@/lib/types/database";
import { Lightbulb } from "lucide-react";

interface StatsGridProps {
  ideas: Idea[];
}

export function StatsGrid({ ideas }: StatsGridProps) {
  const total = ideas.length;

  const byPriority = {
    Alta: ideas.filter((i) => i.prioridad === "Alta").length,
    Media: ideas.filter((i) => i.prioridad === "Media").length,
    Baja: ideas.filter((i) => i.prioridad === "Baja").length,
  };

  const byStatus = {
    Idea: ideas.filter((i) => i.estado === "Idea").length,
    "En análisis": ideas.filter((i) => i.estado === "En análisis").length,
    "En desarrollo": ideas.filter((i) => i.estado === "En desarrollo").length,
    Descartada: ideas.filter((i) => i.estado === "Descartada").length,
  };

  const byCost = {
    Bajo: ideas.filter((i) => i.costo === "Bajo").length,
    Medio: ideas.filter((i) => i.costo === "Medio").length,
    Alto: ideas.filter((i) => i.costo === "Alto").length,
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="flex items-center gap-4 pt-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
            <Lightbulb className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total de Ideas</p>
            <p className="text-3xl font-bold">{total}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Por Prioridad</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {(["Alta", "Media", "Baja"] as const).map((p) => (
              <StatItem
                key={p}
                label={p}
                count={byPriority[p]}
                badge={<PriorityBadge prioridad={p} />}
              />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Por Estado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {(
              ["Idea", "En análisis", "En desarrollo", "Descartada"] as const
            ).map((s) => (
              <StatItem
                key={s}
                label={s}
                count={byStatus[s]}
                badge={<StatusBadge estado={s} />}
              />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Por Costo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {(["Bajo", "Medio", "Alto"] as const).map((c) => (
              <StatItem
                key={c}
                label={c}
                count={byCost[c]}
                badge={<CostBadge costo={c} />}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
