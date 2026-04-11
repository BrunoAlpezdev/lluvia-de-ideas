import { Badge } from "@/components/ui/badge";
import type { Idea } from "@/lib/types/database";

const statusStyles: Record<Idea["estado"], string> = {
  Idea: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  "En análisis": "bg-purple-100 text-purple-800 hover:bg-purple-100",
  "En desarrollo": "bg-orange-100 text-orange-800 hover:bg-orange-100",
  Descartada: "bg-gray-100 text-gray-800 hover:bg-gray-100",
};

export function StatusBadge({ estado }: { estado: Idea["estado"] }) {
  return <Badge className={statusStyles[estado]}>{estado}</Badge>;
}
