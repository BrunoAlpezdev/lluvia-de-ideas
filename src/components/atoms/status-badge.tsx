import { Badge } from "@/components/ui/badge";
import type { Idea } from "@/lib/types/database";

const statusConfig: Record<Idea["estado"], { bg: string; dot: string }> = {
  Idea: {
    bg: "bg-status-idea/10 text-status-idea border border-status-idea/20",
    dot: "bg-status-idea",
  },
  "En análisis": {
    bg: "bg-status-analisis/10 text-status-analisis border border-status-analisis/20",
    dot: "bg-status-analisis",
  },
  "En desarrollo": {
    bg: "bg-status-desarrollo/10 text-status-desarrollo border border-status-desarrollo/20",
    dot: "bg-status-desarrollo",
  },
  Descartada: {
    bg: "bg-status-descartada/10 text-status-descartada border border-status-descartada/20",
    dot: "bg-status-descartada",
  },
};

export function StatusBadge({ estado }: { estado: Idea["estado"] }) {
  const { bg, dot } = statusConfig[estado];
  return (
    <Badge className={bg}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {estado}
    </Badge>
  );
}
