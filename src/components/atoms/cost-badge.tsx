import { Badge } from "@/components/ui/badge";
import type { Idea } from "@/lib/types/database";

const costConfig: Record<string, { bg: string; dot: string }> = {
  Bajo: {
    bg: "bg-[#34d399]/10 text-[#34d399] border border-[#34d399]/20",
    dot: "bg-[#34d399]",
  },
  Medio: {
    bg: "bg-[#fbbf24]/10 text-[#fbbf24] border border-[#fbbf24]/20",
    dot: "bg-[#fbbf24]",
  },
  Alto: {
    bg: "bg-[#ff6e84]/10 text-[#ff6e84] border border-[#ff6e84]/20",
    dot: "bg-[#ff6e84]",
  },
};

export function CostBadge({ costo }: { costo: Idea["costo"] }) {
  if (!costo) return <span className="text-muted-foreground text-sm">—</span>;
  const { bg, dot } = costConfig[costo];
  return (
    <Badge className={bg}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {costo}
    </Badge>
  );
}
