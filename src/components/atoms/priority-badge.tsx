import { Badge } from "@/components/ui/badge";
import type { Idea } from "@/lib/types/database";

const priorityStyles: Record<Idea["prioridad"], string> = {
  Alta: "bg-red-100 text-red-800 hover:bg-red-100",
  Media: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  Baja: "bg-green-100 text-green-800 hover:bg-green-100",
};

export function PriorityBadge({ prioridad }: { prioridad: Idea["prioridad"] }) {
  return <Badge className={priorityStyles[prioridad]}>{prioridad}</Badge>;
}
