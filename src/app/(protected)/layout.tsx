import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/organisms/navbar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar
        email={user.email ?? ""}
        avatarUrl={user.user_metadata?.avatar_url}
        name={user.user_metadata?.full_name}
      />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6">
        {children}
      </main>
    </div>
  );
}
