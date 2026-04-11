import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const palette = [
  "bg-rose-200 text-rose-800",
  "bg-pink-200 text-pink-800",
  "bg-fuchsia-200 text-fuchsia-800",
  "bg-purple-200 text-purple-800",
  "bg-violet-200 text-violet-800",
  "bg-indigo-200 text-indigo-800",
  "bg-blue-200 text-blue-800",
  "bg-sky-200 text-sky-800",
  "bg-cyan-200 text-cyan-800",
  "bg-teal-200 text-teal-800",
  "bg-emerald-200 text-emerald-800",
  "bg-green-200 text-green-800",
  "bg-lime-200 text-lime-800",
  "bg-amber-200 text-amber-800",
  "bg-orange-200 text-orange-800",
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

interface UserAvatarProps {
  name?: string | null;
  avatarUrl?: string | null;
  className?: string;
}

export function UserAvatar({ name, avatarUrl, className }: UserAvatarProps) {
  const displayName = name ?? "?";
  const initials = displayName === "?" ? "?" : getInitials(displayName);
  const colorClass = palette[hashString(displayName) % palette.length];

  return (
    <Avatar className={cn("h-7 w-7", className)}>
      <AvatarImage src={avatarUrl ?? undefined} alt={displayName} />
      <AvatarFallback className={cn("text-xs font-semibold", colorClass)}>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
