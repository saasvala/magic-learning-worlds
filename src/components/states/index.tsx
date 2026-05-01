import { ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Inbox, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

/* -------------------------------------------------------------------------- */
/*  LoadingState                                                              */
/* -------------------------------------------------------------------------- */

interface LoadingStateProps {
  /** Variant: "spinner" centered loader, or "skeleton" content placeholder. */
  variant?: "spinner" | "skeleton";
  /** Optional message shown under the spinner. */
  message?: string;
  /** Number of skeleton rows when variant="skeleton". */
  rows?: number;
  className?: string;
}

export function LoadingState({
  variant = "spinner",
  message = "Loading...",
  rows = 4,
  className = "",
}: LoadingStateProps) {
  if (variant === "skeleton") {
    return (
      <div className={`space-y-3 ${className}`} role="status" aria-busy="true" aria-label={message}>
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center py-16 text-center ${className}`}
      role="status"
      aria-busy="true"
      aria-label={message}
    >
      <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  EmptyState                                                                */
/* -------------------------------------------------------------------------- */

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  title = "Nothing here yet",
  description = "There's no data to display right now.",
  icon,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center text-center py-16 px-6 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
        {icon ?? <Inbox className="w-7 h-7 text-muted-foreground" />}
      </div>
      <h3 className="text-base font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-4">{description}</p>
      {action}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  ErrorState                                                                */
/* -------------------------------------------------------------------------- */

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this section. Please try again.",
  onRetry,
  retryLabel = "Try again",
  className = "",
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center text-center py-16 px-6 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-destructive/15 flex items-center justify-center mb-4">
        <AlertTriangle className="w-7 h-7 text-destructive" />
      </div>
      <h3 className="text-base font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-4">{description}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RefreshCw className="w-4 h-4" />
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
