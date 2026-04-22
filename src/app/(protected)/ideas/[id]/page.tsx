import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Target,
  Lightbulb,
  Network,
  Layers,
  TrendingUp,
  Calendar,
  Wallet,
} from "lucide-react";

import { getIdeaById } from "@/lib/firebase/ideas";

import { StatusBadge } from "@/components/atoms/status-badge";
import { PriorityBadge } from "@/components/atoms/priority-badge";
import { CostBadge } from "@/components/atoms/cost-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idea = await getIdeaById(id);

  if (!idea) return { title: "Idea no encontrada" };

  return {
    title: `${idea.nombre} - Lluvia de Ideas`,
    description: idea.descripcion || "Detalles de esta idea de negocio",
  };
}

export default async function IdeaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idea = await getIdeaById(id);

  if (!idea) {
    notFound();
  }

  // Helper date formatter
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-col gap-6 p-6 duration-500 md:p-10">
      {/* HEADER ROW */}
      <div className="flex items-center gap-4">
        <Link
          href="/ideas"
          className="text-muted-foreground hover:bg-surface-bright hover:text-foreground inline-flex h-9 items-center gap-1 rounded-md px-3 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Link>
        <h1 className="font-heading truncate text-2xl font-bold tracking-tight sm:text-3xl">
          {idea.nombre}
        </h1>
      </div>

      {/* STATS BENTO GRID */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="glass flex flex-col justify-center rounded-xl p-4">
          <span className="text-muted-foreground mb-1 text-xs font-semibold tracking-wider uppercase">
            Estado
          </span>
          <div>
            <StatusBadge estado={idea.estado} />
          </div>
        </div>

        <div className="glass flex flex-col justify-center rounded-xl p-4">
          <span className="text-muted-foreground mb-1 text-xs font-semibold tracking-wider uppercase">
            Prioridad
          </span>
          <div>
            <PriorityBadge prioridad={idea.prioridad} />
          </div>
        </div>

        <div className="glass flex flex-col justify-center rounded-xl p-4">
          <span className="text-muted-foreground mb-1 text-xs font-semibold tracking-wider uppercase">
            Costo Estimado
          </span>
          <div>
            <CostBadge costo={idea.costo} />
          </div>
        </div>

        <div className="glass flex flex-col justify-center rounded-xl p-4">
          <span className="text-muted-foreground mb-1 text-xs font-semibold tracking-wider uppercase">
            Alta en Plataforma
          </span>
          <div className="flex items-center gap-1.5 font-medium">
            <Calendar className="text-primary/70 h-4 w-4" />
            <span className="text-sm">{formatDate(idea.created_at)}</span>
          </div>
        </div>
      </div>

      {/* MASONRY/GRID CONTENT */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
        {/* LEFT COLUMN: Concepto e Info Básica */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Idea Card */}
          <Card className="glass relative overflow-hidden border-0 shadow-sm">
            <div className="bg-primary absolute top-0 left-0 h-1 w-full" />
            <CardHeader className="pb-3">
              <CardTitle className="from-foreground to-foreground/70 flex items-center gap-2 bg-gradient-to-br bg-clip-text text-xl font-bold text-transparent">
                <Lightbulb className="text-primary h-5 w-5" />
                El Concepto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-muted-foreground mb-1 text-sm font-medium">
                  ¿De qué trata?
                </h4>
                <p className="text-base leading-relaxed whitespace-pre-wrap">
                  {idea.idea || "No se ha detallado el concepto de la idea."}
                </p>
              </div>
              {idea.descripcion && (
                <div>
                  <h4 className="text-muted-foreground mb-1 text-sm font-medium">
                    Descripción
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                    {idea.descripcion}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Business & Projections Card */}
          <Card className="glass border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-xl font-bold">
                <TrendingUp className="text-primary h-5 w-5" />
                Modelo & Proyecciones
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
                  <Layers className="text-muted-foreground h-4 w-4" />
                  Plan de Negocio
                </h4>
                <p className="text-muted-foreground text-sm whitespace-pre-wrap">
                  {idea.plan_de_negocio || "Sin información."}
                </p>
              </div>
              <div>
                <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
                  <Wallet className="text-muted-foreground h-4 w-4" />
                  Inversión Requerida
                </h4>
                <p className="text-muted-foreground text-sm whitespace-pre-wrap">
                  {idea.inversion || "Sin estimación de inversión."}
                </p>
              </div>
              <div className="sm:col-span-2">
                <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
                  <TrendingUp className="text-muted-foreground h-4 w-4" />
                  Proyección a Futuro
                </h4>
                <p className="text-muted-foreground text-sm whitespace-pre-wrap">
                  {idea.proyeccion || "Sin proyecciones."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Mercado & Estructura */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          {/* Mercado Card */}
          <Card className="glass border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg font-bold">
                <Target className="text-primary h-5 w-5" />
                Análisis de Mercado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <Badge variant="outline" className="mb-2">
                  Mercado Objetivo
                </Badge>
                <p className="text-muted-foreground text-sm">
                  {idea.mercado_objetivo || "—"}
                </p>
              </div>
              <div>
                <Badge variant="outline" className="mb-2">
                  Competencia
                </Badge>
                <p className="text-muted-foreground text-sm">
                  {idea.competencia || "—"}
                </p>
              </div>
              <div>
                <Badge
                  variant="outline"
                  className="bg-primary/5 text-primary border-primary/20 mb-2"
                >
                  Diferenciador Clave
                </Badge>
                <p className="text-muted-foreground text-sm font-medium">
                  {idea.diferenciador_clave || "—"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Ejecución Card */}
          <Card className="glass border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg font-bold">
                <Network className="text-primary h-5 w-5" />
                Ejecución
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <h4 className="mb-1 text-sm font-semibold">
                  Estructura Necesaria
                </h4>
                <p className="text-muted-foreground text-sm">
                  {idea.estructura || "—"}
                </p>
              </div>
              <div>
                <h4 className="mb-1 text-sm font-semibold">
                  Planificación Temporal
                </h4>
                <p className="text-muted-foreground text-sm">
                  {idea.planificacion || "—"}
                </p>
              </div>
              <div>
                <h4 className="mb-1 text-sm font-semibold">Plazo Estimado</h4>
                <p className="text-muted-foreground text-sm">
                  {idea.plazo_estimado || "—"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
