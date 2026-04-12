import type { Idea } from "@/lib/types/database";
import { Lightbulb, TrendingUp } from "lucide-react";

interface StatsGridProps {
  ideas: Idea[];
}

const statusColors: Record<Idea["estado"], string> = {
  Idea: "#a7a5ff",
  "En análisis": "#ac8aff",
  "En desarrollo": "#f97316",
  Descartada: "#6d758c",
};

const priorityColors: Record<Idea["prioridad"], string> = {
  Alta: "#ff6e84",
  Media: "#fbbf24",
  Baja: "#34d399",
};

const costColors: Record<string, string> = {
  Bajo: "#34d399",
  Medio: "#fbbf24",
  Alto: "#ff6e84",
};

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

  const maxCost = Math.max(byCost.Bajo, byCost.Medio, byCost.Alto, 1);

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Total Card - 2/3 width */}
        <div className="border-primary bg-muted relative overflow-hidden rounded-xl border-t-4 p-8 lg:col-span-2">
          <p className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
            TOTAL DE IDEAS
          </p>
          <p className="font-heading mt-2 text-7xl font-bold tracking-tighter">
            {total}
          </p>
          {total > 0 && (
            <span className="text-primary bg-primary/10 mt-3 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-bold">
              <TrendingUp className="h-4 w-4" />+{total}
            </span>
          )}
          <Lightbulb className="absolute right-6 bottom-4 h-32 w-32 opacity-5" />
        </div>

        {/* Side Cards - 1/3 width */}
        <div className="flex flex-col gap-6">
          {/* By Status Card */}
          <div className="bg-card rounded-xl border-t-4 border-[#ac8aff] p-6">
            <p className="text-muted-foreground mb-4 text-sm font-bold tracking-wider uppercase">
              POR ESTADO
            </p>
            <div className="space-y-2.5">
              {(
                ["Idea", "En análisis", "En desarrollo", "Descartada"] as const
              ).map((s) => (
                <div key={s} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: statusColors[s] }}
                    />
                    <span className="text-muted-foreground text-sm">{s}</span>
                  </div>
                  <span
                    className="rounded px-2 py-0.5 text-xs font-bold"
                    style={{
                      backgroundColor: `${statusColors[s]}1a`,
                      color: statusColors[s],
                    }}
                  >
                    {byStatus[s]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* By Priority Card */}
          <div className="bg-card rounded-xl border-t-4 border-[#9093ff] p-6">
            <p className="text-muted-foreground mb-4 text-sm font-bold tracking-wider uppercase">
              POR PRIORIDAD
            </p>
            <div className="space-y-2.5">
              {(["Alta", "Media", "Baja"] as const).map((p) => (
                <div key={p} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: priorityColors[p] }}
                    />
                    <span className="text-muted-foreground text-sm">{p}</span>
                  </div>
                  <span
                    className="rounded px-2 py-0.5 text-xs font-bold"
                    style={{
                      backgroundColor: `${priorityColors[p]}1a`,
                      color: priorityColors[p],
                    }}
                  >
                    {byPriority[p]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Distribution Section */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Priority Distribution */}
        <div className="bg-muted rounded-xl p-6">
          <p className="text-muted-foreground mb-6 text-sm font-bold tracking-wider uppercase">
            POR PRIORIDAD
          </p>
          <div className="space-y-3">
            {(["Alta", "Media", "Baja"] as const).map((p) => (
              <div key={p} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: priorityColors[p] }}
                  />
                  <span className="text-sm">{p}</span>
                </div>
                <span className="text-sm font-bold">{byPriority[p]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-muted rounded-xl p-6">
          <p className="text-muted-foreground mb-6 text-sm font-bold tracking-wider uppercase">
            POR ESTADO
          </p>
          <div className="space-y-3">
            {(
              ["Idea", "En análisis", "En desarrollo", "Descartada"] as const
            ).map((s) => (
              <div key={s} className="flex items-center justify-between">
                <span className="text-sm">{s}</span>
                <span
                  className="rounded px-2 py-0.5 text-xs font-bold"
                  style={{
                    backgroundColor: `${statusColors[s]}1a`,
                    color: statusColors[s],
                  }}
                >
                  {byStatus[s]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Distribution - Bar Chart */}
        <div className="bg-muted rounded-xl p-6">
          <p className="text-muted-foreground mb-6 text-sm font-bold tracking-wider uppercase">
            POR COSTO
          </p>
          <div className="flex items-end justify-around gap-4">
            {(["Bajo", "Medio", "Alto"] as const).map((c) => {
              const height = maxCost > 0 ? (byCost[c] / maxCost) * 100 : 0;
              return (
                <div key={c} className="flex flex-col items-center gap-2">
                  <span className="text-xs font-bold">{byCost[c]}</span>
                  <div
                    className="w-10 rounded-t-md"
                    style={{
                      backgroundColor: costColors[c],
                      height: `${Math.max(height, 8)}px`,
                      minHeight: "8px",
                      maxHeight: "100px",
                    }}
                  />
                  <span className="text-muted-foreground text-xs">{c}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
