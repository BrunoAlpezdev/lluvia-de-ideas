import { Badge } from "@/components/ui/badge";
import type { Idea } from "@/lib/types/database";

const priorityConfig: Record<Idea["prioridad"], { bg: string; dot: string }> = {
  Alta: { bg: "bg-[#ff6e84]/10 text-[#ff6e84]", dot: "bg-[#ff6e84]" },
  Media: { bg: "bg-[#fbbf24]/10 text-[#fbbf24]", dot: "bg-[#fbbf24]" },
  Baja: { bg: "bg-[#34d399]/10 text-[#34d399]", dot: "bg-[#34d399]" },
};

export function PriorityBadge({ prioridad }: { prioridad: Idea["prioridad"] }) {
  const { bg, dot } = priorityConfig[prioridad];
  return (
    <Badge className={bg}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {prioridad}
    </Badge>
  );
}
