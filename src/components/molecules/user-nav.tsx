"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { UserAvatar } from "@/components/atoms/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

interface UserNavProps {
  email: string;
  avatarUrl?: string;
  name?: string;
}

export function UserNav({ email, avatarUrl, name }: UserNavProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-primary cursor-pointer rounded-full outline-none focus-visible:ring-2">
        <UserAvatar
          name={name ?? email}
          avatarUrl={avatarUrl}
          className="h-8 w-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <p className="text-sm font-medium">{name ?? "Mi cuenta"}</p>
            <p className="text-muted-foreground text-xs">{email}</p>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar sesion
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
