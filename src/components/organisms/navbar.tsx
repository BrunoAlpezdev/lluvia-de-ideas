"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { UserNav } from "@/components/molecules/user-nav";
import {
  Lightbulb,
  LayoutDashboard,
  List,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
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
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  return (
    <header className="glass sticky top-0 z-50">
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold">
            <Lightbulb className="text-primary h-5 w-5" />
            <span className="font-heading text-primary hidden tracking-tighter sm:inline">
              Lluvia de Ideas
            </span>
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
                    "hover:bg-surface-bright flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-surface-bright text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (!mounted) return;
              const next =
                theme === "system"
                  ? "light"
                  : theme === "light"
                    ? "dark"
                    : "system";
              setTheme(next);
            }}
            className="text-muted-foreground hover:bg-surface-bright hover:text-foreground inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors"
            title={
              !mounted
                ? "Cambiar tema"
                : theme === "system"
                  ? "Tema: Sistema"
                  : theme === "light"
                    ? "Tema: Claro"
                    : "Tema: Oscuro"
            }
          >
            {!mounted || theme === "system" ? (
              <Monitor className="h-4 w-4" />
            ) : theme === "dark" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
            <span className="sr-only">Cambiar tema</span>
          </button>
          <UserNav email={email} avatarUrl={avatarUrl} name={name} />
        </div>
      </div>
    </header>
  );
}
