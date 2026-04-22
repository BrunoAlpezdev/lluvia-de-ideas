import { IdeasTable } from "@/components/organisms/ideas-table";
import { getAllIdeas } from "@/lib/firebase/ideas";

export default async function IdeasPage() {
  const ideas = await getAllIdeas();

  return <IdeasTable ideas={ideas} />;
}
