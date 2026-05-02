import { Sparkles } from "lucide-react";

/**
 * Marks a section as showing demo / placeholder content because no real
 * backing table exists yet. Keep it small, tonally neutral, and consistent
 * across every dashboard that still mixes real and mock data.
 */
export function DemoBadge({ label = "Demo data" }: { label?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-[10px] font-medium text-muted-foreground border border-border/50"
      title="This section uses placeholder data — no backing table yet."
    >
      <Sparkles className="w-3 h-3" />
      {label}
    </span>
  );
}
