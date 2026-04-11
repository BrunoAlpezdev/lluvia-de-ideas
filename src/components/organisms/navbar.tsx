"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserNav } from "@/components/molecules/user-nav";
import { Lightbulb, LayoutDashboard, List } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  email: string;
  avatarUrl?: string;
  name?: string;
}

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/ideas", label: "Ideas", icon: List },
];

export function Navbar({ email, avatarUrl, name }: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold">
            <Lightbulb className="h-5 w-5 text-indigo-600" />
            <span className="hidden sm:inline">Lluvia de Ideas</span>
          </Link>
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <UserNav email={email} avatarUrl={avatarUrl} name={name} />
      </div>
    </header>
  );
}
