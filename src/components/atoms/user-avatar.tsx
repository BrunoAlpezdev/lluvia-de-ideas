import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const palette = [
  "bg-rose-500/20 text-rose-300",
  "bg-pink-500/20 text-pink-300",
  "bg-fuchsia-500/20 text-fuchsia-300",
  "bg-purple-500/20 text-purple-300",
  "bg-violet-500/20 text-violet-300",
  "bg-indigo-500/20 text-indigo-300",
  "bg-blue-500/20 text-blue-300",
  "bg-sky-500/20 text-sky-300",
  "bg-cyan-500/20 text-cyan-300",
  "bg-teal-500/20 text-teal-300",
  "bg-emerald-500/20 text-emerald-300",
  "bg-green-500/20 text-green-300",
  "bg-lime-500/20 text-lime-300",
  "bg-amber-500/20 text-amber-300",
  "bg-orange-500/20 text-orange-300",
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
