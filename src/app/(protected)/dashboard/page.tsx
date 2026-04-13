import { createClient } from "@/lib/supabase/server";
import { StatsGrid } from "@/components/organisms/stats-grid";
import { RecentIdeasTable } from "@/components/organisms/recent-ideas-table";
import type { Idea } from "@/lib/types/database";

export default async function DashboardPage() {
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
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Resumen general de tu ecosistema de ideas
        </p>
      </div>
      <StatsGrid ideas={allIdeas} />
      <RecentIdeasTable ideas={allIdeas} />
    </div>
  );
}
