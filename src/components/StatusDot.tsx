import { cn } from "@/lib/utils";

export type SlotStatus = "free" | "reserved" | "occupied";

const statusMap: Record<SlotStatus, string> = {
  free: "bg-[hsl(var(--status-free))]",
  reserved: "bg-[hsl(var(--status-reserved))]",
  occupied: "bg-[hsl(var(--status-occupied))]",
};

export function StatusDot({ status, className }: { status: SlotStatus; className?: string }) {
  return (
    <span
      aria-label={status}
      className={cn(
        "inline-block size-2.5 rounded-full shadow-sm",
        statusMap[status],
        className
      )}
    />
  );
}

export default StatusDot;
