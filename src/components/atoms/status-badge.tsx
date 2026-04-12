import { Badge } from "@/components/ui/badge";
import type { Idea } from "@/lib/types/database";

const statusConfig: Record<Idea["estado"], { bg: string; dot: string }> = {
  Idea: { bg: "bg-[#a7a5ff]/10 text-[#a7a5ff]", dot: "bg-[#a7a5ff]" },
  "En análisis": {
    bg: "bg-[#ac8aff]/10 text-[#ac8aff]",
    dot: "bg-[#ac8aff]",
  },
  "En desarrollo": {
    bg: "bg-[#f97316]/10 text-[#f97316]",
    dot: "bg-[#f97316]",
  },
  Descartada: { bg: "bg-[#6d758c]/10 text-[#6d758c]", dot: "bg-[#6d758c]" },
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
