import { Badge } from "@/components/ui/badge";
import type { Idea } from "@/lib/types/database";

const costStyles: Record<string, string> = {
  Bajo: "bg-green-100 text-green-800 hover:bg-green-100",
  Medio: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  Alto: "bg-red-100 text-red-800 hover:bg-red-100",
};

export function CostBadge({ costo }: { costo: Idea["costo"] }) {
  if (!costo) return <span className="text-muted-foreground text-sm">—</span>;
  return <Badge className={costStyles[costo]}>{costo}</Badge>;
}
