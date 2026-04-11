import { createClient } from "@/lib/supabase/server";
import { IdeasTable } from "@/components/organisms/ideas-table";
import type { Idea } from "@/lib/types/database";

export default async function IdeasPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: ideas } = await supabase
    .from("ideas")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <IdeasTable
      ideas={(ideas ?? []) as Idea[]}
      userId={user?.id ?? ""}
      userName={user?.user_metadata?.full_name}
      userAvatarUrl={user?.user_metadata?.avatar_url}
    />
  );
}
