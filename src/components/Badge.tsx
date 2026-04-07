import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type BadgeType = "Default" | "Secondary" | "Destructive" | "Outline";
export type BadgeState = "Default" | "Hover" | "Focus";

export interface BadgeProps {
  /** 樣式類型 */
  type?: BadgeType;
  /** Pill 圓角（true）或方角（false） */
  rounded?: boolean;
  /** 互動狀態（用於 Storybook 展示） */
  state?: BadgeState;
  /** Badge 文字 */
  children?: ReactNode;
  className?: string;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

// Figma: 55×20px, text 35×16px → px-[10px] py-[2px]
const baseStyles =
  "inline-flex items-center justify-center px-[10px] py-[2px] " +
  "font-[Urbanist] text-[12px] font-semibold leading-[16px] " +
  "select-none transition-all duration-150";

const typeStyles: Record<BadgeType, { default: string; hover: string; focus: string }> = {
  Default: {
    default: "bg-[#7522e0] text-[#f1f1f3]",
    hover:   "bg-[#451485] text-[#f1f1f3]",
    focus:   "bg-[#7522e0] text-[#f1f1f3] ring-2 ring-[#7522e0] ring-offset-1",
  },
  Secondary: {
    default: "bg-[#f9fafb] text-[#171d1f]",
    hover:   "bg-[#eef0f1] text-[#171d1f]",
    focus:   "bg-[#f9fafb] text-[#171d1f] ring-2 ring-[rgba(13,5,44,0.2)] ring-offset-1",
  },
  Destructive: {
    default: "bg-[#c5304e] text-[#f1f1f3]",
    hover:   "bg-[#a82540] text-[#f1f1f3]",
    focus:   "bg-[#c5304e] text-[#f1f1f3] ring-2 ring-[#c5304e] ring-offset-1",
  },
  Outline: {
    default: "bg-transparent text-[#171d1f] border border-[rgba(13,5,44,0.15)]",
    hover:   "bg-[rgba(13,5,44,0.04)] text-[#171d1f] border border-[rgba(13,5,44,0.2)]",
    focus:   "bg-transparent text-[#171d1f] border border-[rgba(13,5,44,0.15)] ring-2 ring-[rgba(13,5,44,0.15)] ring-offset-1",
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Badge({
  type = "Default",
  rounded = true,
  state = "Default",
  children = "Badge",
  className,
}: BadgeProps) {
  const colors = typeStyles[type][state === "Hover" ? "hover" : state === "Focus" ? "focus" : "default"];
  const radius = rounded ? "rounded-full" : "rounded-[4px]";

  return (
    <span className={cn(baseStyles, colors, radius, className)}>
      {children}
    </span>
  );
}

export default Badge;
