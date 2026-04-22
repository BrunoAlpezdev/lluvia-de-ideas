import { redirect } from "next/navigation";
import { Navbar } from "@/components/organisms/navbar";
import { getCurrentUser } from "@/lib/firebase/session";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar
        email={user.email ?? ""}
        avatarUrl={user.picture}
        name={user.name as string | undefined}
      />
      <main className="w-full flex-1 px-6 py-4">{children}</main>
    </div>
  );
}
