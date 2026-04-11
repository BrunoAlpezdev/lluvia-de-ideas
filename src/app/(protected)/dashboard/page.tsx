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
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <StatsGrid ideas={allIdeas} />
      <RecentIdeasTable ideas={allIdeas} />
    </div>
  );
}
