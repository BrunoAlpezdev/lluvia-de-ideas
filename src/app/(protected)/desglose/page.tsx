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
        <h1 className="text-2xl font-bold">Desglose de Ideas</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Vista completa con todos los campos de cada idea
        </p>
      </div>
      <IdeasDetailTable ideas={allIdeas} />
    </div>
  );
}
