export type Idea = {
  id: string;
  user_id: string;
  plan_de_negocio: string | null;
  nombre: string;
  idea: string;
  descripcion: string | null;
  estructura: string | null;
  planificacion: string | null;
  costo: "Bajo" | "Medio" | "Alto" | null;
  complejidad:
    | "Muy fácil"
    | "Fácil"
    | "Moderado"
    | "Complejo"
    | "Transversal"
    | null;
  proyeccion: string | null;
  inversion: string | null;
  mercado_objetivo: string | null;
  diferenciador_clave: string | null;
  plazo_estimado: string | null;
  competencia: string | null;
  prioridad: "Alta" | "Media" | "Baja";
  estado: "Idea" | "En análisis" | "En desarrollo" | "Descartada";
  user_name: string | null;
  user_avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type IdeaInsert = Omit<Idea, "id" | "created_at" | "updated_at">;

export type IdeaUpdate = Partial<
  Omit<Idea, "id" | "user_id" | "created_at" | "updated_at">
>;

export type IdeaFormFields = Omit<
  IdeaInsert,
  "user_id" | "user_name" | "user_avatar_url"
>;
