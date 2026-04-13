import { Badge } from "@/components/ui/badge";
import type { Idea } from "@/lib/types/database";

const costConfig: Record<string, { bg: string; dot: string }> = {
  Bajo: {
    bg: "bg-cost-bajo/10 text-cost-bajo border border-cost-bajo/20",
    dot: "bg-cost-bajo",
  },
  Medio: {
    bg: "bg-cost-medio/10 text-cost-medio border border-cost-medio/20",
    dot: "bg-cost-medio",
  },
  Alto: {
    bg: "bg-cost-alto/10 text-cost-alto border border-cost-alto/20",
    dot: "bg-cost-alto",
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
