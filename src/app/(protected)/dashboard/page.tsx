import { StatsGrid } from "@/components/organisms/stats-grid";
import { RecentIdeasTable } from "@/components/organisms/recent-ideas-table";
import { getAllIdeas } from "@/lib/firebase/ideas";

export default async function DashboardPage() {
  const ideas = await getAllIdeas();

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
      <StatsGrid ideas={ideas} />
      <RecentIdeasTable ideas={ideas} />
    </div>
  );
}
