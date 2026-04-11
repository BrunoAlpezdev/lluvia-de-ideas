import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/atoms/status-badge";
import { PriorityBadge } from "@/components/atoms/priority-badge";
import type { Idea } from "@/lib/types/database";

interface RecentIdeasTableProps {
  ideas: Idea[];
}

export function RecentIdeasTable({ ideas }: RecentIdeasTableProps) {
  const recent = ideas.slice(0, 5);

  if (recent.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Ideas Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-6">
            No hay ideas registradas. Crea tu primera idea!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Ideas Recientes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead className="text-right">Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recent.map((idea) => (
              <TableRow key={idea.id}>
                <TableCell className="font-medium">{idea.nombre}</TableCell>
                <TableCell>
                  <StatusBadge estado={idea.estado} />
                </TableCell>
                <TableCell>
                  <PriorityBadge prioridad={idea.prioridad} />
                </TableCell>
                <TableCell className="text-right text-sm text-muted-foreground">
                  {new Date(idea.created_at).toLocaleDateString("es-ES")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
