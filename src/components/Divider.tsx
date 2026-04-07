import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type DividerOrientation = "Horizontal" | "Vertical";
export type DividerSize = "Small" | "Default";

export interface DividerProps {
  orientation?: DividerOrientation;
  size?: DividerSize;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

// Figma: ↳ Divider · COMPONENT_SET 40000105:84917
// Size=Small, Type=Horizontal: 1×16px vertical line / 1px horizontal rule
// Color: utility-purple-a10 = rgba(13,5,44,0.1)

export function Divider({
  orientation = "Horizontal",
  size = "Default",
  className,
}: DividerProps) {
  if (orientation === "Vertical") {
    return (
      <div
        aria-hidden
        className={cn(
          "w-px bg-[rgba(13,5,44,0.1)] shrink-0",
          size === "Small" ? "h-4" : "h-full",
          className
        )}
      />
    );
  }

  return (
    <hr
      aria-hidden
      className={cn(
        "w-full border-0 border-t border-[rgba(13,5,44,0.1)]",
        size === "Small" ? "my-0" : "my-0",
        className
      )}
    />
  );
}

export default Divider;
