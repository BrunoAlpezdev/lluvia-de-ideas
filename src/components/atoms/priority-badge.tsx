import { Badge } from "@/components/ui/badge";
import type { Idea } from "@/lib/types/database";

const priorityConfig: Record<Idea["prioridad"], { bg: string; dot: string }> = {
  Alta: {
    bg: "bg-priority-alta/10 text-priority-alta border border-priority-alta/20",
    dot: "bg-priority-alta",
  },
  Media: {
    bg: "bg-priority-media/10 text-priority-media border border-priority-media/20",
    dot: "bg-priority-media",
  },
  Baja: {
    bg: "bg-priority-baja/10 text-priority-baja border border-priority-baja/20",
    dot: "bg-priority-baja",
  },
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
