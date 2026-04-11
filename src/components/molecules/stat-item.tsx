import { ReactNode } from "react";

interface StatItemProps {
  label: string;
  count: number;
  badge: ReactNode;
}

export function StatItem({ label, count, badge }: StatItemProps) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div className="flex items-center gap-2">
        {badge}
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <span className="text-sm font-semibold">{count}</span>
    </div>
  );
}
