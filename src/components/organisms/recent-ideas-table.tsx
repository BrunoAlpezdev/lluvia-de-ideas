import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserAvatar } from "@/components/atoms/user-avatar";
import type { Idea } from "@/lib/types/database";

interface RecentIdeasTableProps {
  ideas: Idea[];
}

const statusColors: Record<Idea["estado"], string> = {
  Idea: "var(--status-idea)",
  "En análisis": "var(--status-analisis)",
  "En desarrollo": "var(--status-desarrollo)",
  Descartada: "var(--status-descartada)",
};

const priorityColors: Record<Idea["prioridad"], string> = {
  Alta: "var(--priority-alta)",
  Media: "var(--priority-media)",
  Baja: "var(--priority-baja)",
};

export function RecentIdeasTable({ ideas }: RecentIdeasTableProps) {
  const recent = ideas.slice(0, 5);

  if (recent.length === 0) {
    return (
      <div className="bg-card rounded-xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-muted-foreground text-sm font-bold tracking-wider uppercase">
            Ideas Recientes
          </h2>
        </div>
        <p className="text-muted-foreground py-6 text-center text-sm">
          No hay ideas registradas. Crea tu primera idea!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border-border/30 overflow-hidden rounded-xl border shadow-sm">
      <div className="flex items-center justify-between px-6 py-5">
        <h2 className="text-muted-foreground text-sm font-bold tracking-wider uppercase">
          Ideas Recientes
        </h2>
        <Link
          href="/ideas"
          className="text-primary text-sm font-medium hover:underline"
        >
          Ver todas
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-surface-highest hover:bg-surface-highest">
            <TableHead className="px-6 py-3 text-xs font-bold tracking-wider uppercase">
              Nombre
            </TableHead>
            <TableHead className="px-6 py-3 text-xs font-bold tracking-wider uppercase">
              Estado
            </TableHead>
            <TableHead className="px-6 py-3 text-xs font-bold tracking-wider uppercase">
              Prioridad
            </TableHead>
            <TableHead className="px-6 py-3 text-right text-xs font-bold tracking-wider uppercase">
              Fecha
            </TableHead>
            <TableHead className="w-10 px-6 py-3" />
          </TableRow>
        </TableHeader>
        <TableBody className="divide-border/20 divide-y">
          {recent.map((idea) => (
            <TableRow key={idea.id}>
              <TableCell className="px-6 py-4 font-medium">
                {idea.nombre}
              </TableCell>
              <TableCell className="px-6 py-4">
                <span
                  className="flex items-center gap-2 text-xs font-bold"
                  style={{ color: statusColors[idea.estado] }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: statusColors[idea.estado],
                    }}
                  />
                  {idea.estado}
                </span>
              </TableCell>
              <TableCell className="px-6 py-4">
                <span
                  className="flex items-center gap-2 text-xs font-bold"
                  style={{ color: priorityColors[idea.prioridad] }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: priorityColors[idea.prioridad],
                    }}
                  />
                  {idea.prioridad}
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground px-6 py-4 text-right text-sm">
                {new Date(idea.created_at).toLocaleDateString("es-ES")}
              </TableCell>
              <TableCell className="px-6 py-4">
                <UserAvatar
                  name={idea.user_name}
                  avatarUrl={idea.user_avatar_url}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
