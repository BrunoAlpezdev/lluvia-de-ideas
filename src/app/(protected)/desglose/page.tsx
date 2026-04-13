import { createClient } from "@/lib/supabase/server";
import { IdeasDetailTable } from "@/components/organisms/ideas-detail-table";
import type { Idea } from "@/lib/types/database";

export default async function DesglosePage() {
  const supabase = await createClient();
  const { data: ideas } = await supabase
    .from("ideas")
    .select("*")
    .order("created_at", { ascending: false });

  const allIdeas = (ideas ?? []) as Idea[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-4xl font-bold tracking-tighter uppercase italic">
          Desglose
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Vista detallada de alta densidad para gestion integral
        </p>
      </div>
      <IdeasDetailTable ideas={allIdeas} />
    </div>
  );
}
