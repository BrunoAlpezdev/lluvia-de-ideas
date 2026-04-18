import { Badge } from "@/components/ui/badge";
import type { Idea } from "@/lib/types/database";

const complejidadConfig: Record<
  string,
  { bg: string; dot: string; label: string }
> = {
  "Muy fácil": {
    bg: "bg-complejidad-muy-facil/10 text-complejidad-muy-facil border border-complejidad-muy-facil/20",
    dot: "bg-complejidad-muy-facil",
    label: "Muy fácil",
  },
  Fácil: {
    bg: "bg-complejidad-facil/10 text-complejidad-facil border border-complejidad-facil/20",
    dot: "bg-complejidad-facil",
    label: "Fácil",
  },
  Moderado: {
    bg: "bg-complejidad-moderado/10 text-complejidad-moderado border border-complejidad-moderado/20",
    dot: "bg-complejidad-moderado",
    label: "Moderado",
  },
  Complejo: {
    bg: "bg-complejidad-complejo/10 text-complejidad-complejo border border-complejidad-complejo/20",
    dot: "bg-complejidad-complejo",
    label: "Complejo",
  },
  Transversal: {
    bg: "bg-complejidad-transversal/10 text-complejidad-transversal border border-complejidad-transversal/20",
    dot: "bg-complejidad-transversal",
    label: "Transversal",
  },
};

export function ComplejidadBadge({
  complejidad,
}: {
  complejidad: Idea["complejidad"];
}) {
  if (!complejidad)
    return <span className="text-muted-foreground text-sm">—</span>;
  const { bg, dot, label } = complejidadConfig[complejidad];
  return (
    <Badge className={bg}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </Badge>
  );
}
