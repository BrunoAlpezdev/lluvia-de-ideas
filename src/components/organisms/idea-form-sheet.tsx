"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import type { Idea, IdeaInsert, IdeaUpdate } from "@/lib/types/database";

interface IdeaFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  idea?: Idea | null;
  userId: string;
  userName?: string;
  userAvatarUrl?: string;
}

type FormFields = Omit<IdeaInsert, "user_id" | "user_name" | "user_avatar_url">;

const emptyForm: FormFields = {
  plan_de_negocio: null,
  nombre: "",
  idea: "",
  descripcion: null,
  estructura: null,
  planificacion: null,
  costo: null,
  proyeccion: null,
  inversion: null,
  mercado_objetivo: null,
  diferenciador_clave: null,
  plazo_estimado: null,
  competencia: null,
  prioridad: "Media",
  estado: "Idea",
};

export function IdeaFormSheet({
  open,
  onOpenChange,
  idea,
  userId,
  userName,
  userAvatarUrl,
}: IdeaFormSheetProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const isEditing = !!idea;

  useEffect(() => {
    if (idea) {
      setForm({
        plan_de_negocio: idea.plan_de_negocio,
        nombre: idea.nombre,
        idea: idea.idea,
        descripcion: idea.descripcion,
        estructura: idea.estructura,
        planificacion: idea.planificacion,
        costo: idea.costo,
        proyeccion: idea.proyeccion,
        inversion: idea.inversion,
        mercado_objetivo: idea.mercado_objetivo,
        diferenciador_clave: idea.diferenciador_clave,
        plazo_estimado: idea.plazo_estimado,
        competencia: idea.competencia,
        prioridad: idea.prioridad,
        estado: idea.estado,
      });
    } else {
      setForm(emptyForm);
    }
  }, [idea]);

  const updateField = (field: string, value: string | null) => {
    setForm((prev) => ({ ...prev, [field]: value || null }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.idea.trim()) {
      toast.error("Nombre e Idea son campos obligatorios");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    if (isEditing) {
      const updates: IdeaUpdate = { ...form };
      const { error } = await supabase
        .from("ideas")
        .update(updates)
        .eq("id", idea.id);
      if (error) {
        toast.error("Error al actualizar la idea");
      } else {
        toast.success("Idea actualizada");
      }
    } else {
      const insert: IdeaInsert = {
        ...form,
        user_id: userId,
        user_name: userName ?? null,
        user_avatar_url: userAvatarUrl ?? null,
      };
      const { error } = await supabase.from("ideas").insert(insert);
      if (error) {
        toast.error("Error al crear la idea");
      } else {
        toast.success("Idea creada");
      }
    }

    setLoading(false);
    onOpenChange(false);
    router.refresh();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{isEditing ? "Editar idea" : "Nueva idea"}</SheetTitle>
          <SheetDescription>
            {isEditing
              ? "Modifica los campos que necesites"
              : "Completa los campos para registrar tu idea"}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-4 pb-4">
          {/* Informacion Basica */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Informacion Basica
            </h3>
            <div className="space-y-2">
              <Label htmlFor="plan_de_negocio">Plan de Negocio</Label>
              <Input
                id="plan_de_negocio"
                value={form.plan_de_negocio ?? ""}
                onChange={(e) => updateField("plan_de_negocio", e.target.value)}
                placeholder="Ej: SaaS, E-commerce, Consultoria..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nombre">
                Nombre <span className="text-red-500">*</span>
              </Label>
              <Input
                id="nombre"
                value={form.nombre}
                onChange={(e) => updateField("nombre", e.target.value)}
                placeholder="Nombre de la idea"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="idea">
                Idea <span className="text-red-500">*</span>
              </Label>
              <Input
                id="idea"
                value={form.idea}
                onChange={(e) => updateField("idea", e.target.value)}
                placeholder="Descripcion corta de la idea"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripcion</Label>
              <Textarea
                id="descripcion"
                value={form.descripcion ?? ""}
                onChange={(e) => updateField("descripcion", e.target.value)}
                rows={3}
                placeholder="Detalle de la idea..."
              />
            </div>
          </section>

          <Separator />

          {/* Estructura y Planificacion */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Estructura y Planificacion
            </h3>
            <div className="space-y-2">
              <Label htmlFor="estructura">Estructura</Label>
              <Textarea
                id="estructura"
                value={form.estructura ?? ""}
                onChange={(e) => updateField("estructura", e.target.value)}
                rows={3}
                placeholder="Como se estructura el negocio..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="planificacion">Planificacion</Label>
              <Textarea
                id="planificacion"
                value={form.planificacion ?? ""}
                onChange={(e) => updateField("planificacion", e.target.value)}
                rows={3}
                placeholder="Pasos a seguir..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plazo_estimado">Plazo Estimado</Label>
              <Input
                id="plazo_estimado"
                value={form.plazo_estimado ?? ""}
                onChange={(e) => updateField("plazo_estimado", e.target.value)}
                placeholder="Ej: 3 meses, 1 anio..."
              />
            </div>
          </section>

          <Separator />

          {/* Mercado */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Analisis de Mercado
            </h3>
            <div className="space-y-2">
              <Label htmlFor="mercado_objetivo">Mercado Objetivo</Label>
              <Textarea
                id="mercado_objetivo"
                value={form.mercado_objetivo ?? ""}
                onChange={(e) => updateField("mercado_objetivo", e.target.value)}
                rows={2}
                placeholder="A quien va dirigido..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="competencia">Competencia</Label>
              <Textarea
                id="competencia"
                value={form.competencia ?? ""}
                onChange={(e) => updateField("competencia", e.target.value)}
                rows={2}
                placeholder="Competidores actuales..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="diferenciador_clave">Diferenciador Clave</Label>
              <Textarea
                id="diferenciador_clave"
                value={form.diferenciador_clave ?? ""}
                onChange={(e) =>
                  updateField("diferenciador_clave", e.target.value)
                }
                rows={2}
                placeholder="Que te hace diferente..."
              />
            </div>
          </section>

          <Separator />

          {/* Financiero */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Financiero
            </h3>
            <div className="space-y-2">
              <Label>Costo</Label>
              <Select
                value={form.costo ?? undefined}
                onValueChange={(val) => updateField("costo", val as string)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar costo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bajo">Bajo</SelectItem>
                  <SelectItem value="Medio">Medio</SelectItem>
                  <SelectItem value="Alto">Alto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="proyeccion">Proyeccion</Label>
              <Textarea
                id="proyeccion"
                value={form.proyeccion ?? ""}
                onChange={(e) => updateField("proyeccion", e.target.value)}
                rows={2}
                placeholder="Proyeccion de ingresos..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inversion">Inversion Inicial</Label>
              <Textarea
                id="inversion"
                value={form.inversion ?? ""}
                onChange={(e) => updateField("inversion", e.target.value)}
                rows={2}
                placeholder="Capital necesario..."
              />
            </div>
          </section>

          <Separator />

          {/* Clasificacion */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Clasificacion
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Prioridad</Label>
                <Select
                  value={form.prioridad}
                  onValueChange={(val) =>
                    updateField("prioridad", val as string)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Media">Media</SelectItem>
                    <SelectItem value="Baja">Baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Estado</Label>
                <Select
                  value={form.estado}
                  onValueChange={(val) => updateField("estado", val as string)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Idea">Idea</SelectItem>
                    <SelectItem value="En análisis">En analisis</SelectItem>
                    <SelectItem value="En desarrollo">En desarrollo</SelectItem>
                    <SelectItem value="Descartada">Descartada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <SheetFooter className="p-0">
            <Button type="submit" disabled={loading} className="w-full">
              {loading
                ? "Guardando..."
                : isEditing
                  ? "Guardar cambios"
                  : "Crear idea"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
