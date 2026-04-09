import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { type ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonType =
  | "Primary"
  | "Secondary"
  | "Outline"
  | "Ghost"
  | "Link"
  | "Link Secondary";

export type ButtonSize = "md" | "sm";
export type ButtonState = "Normal" | "Hover" | "Disabled" | "Focused" | "Loading";

export interface ButtonProps {
  /** 按鈕樣式類型 */
  type?: ButtonType;
  /** 按鈕尺寸 */
  size?: ButtonSize;
  /** 互動狀態（通常由原生 HTML 狀態處理，此 prop 用於 Storybook 展示） */
  state?: ButtonState;
  /** 危險操作模式 */
  destructive?: boolean;
  /** 左側 icon */
  iconLeading?: ReactNode;
  /** 右側 icon */
  iconTrailing?: ReactNode;
  /** 按鈕文字 */
  children?: ReactNode;
  /** 額外 className */
  className?: string;
  /** 點擊事件 */
  onClick?: () => void;
  /** 禁用 */
  disabled?: boolean;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const baseStyles =
  "inline-flex items-center justify-center gap-1 rounded-lg font-semibold font-[Urbanist] text-[14px] leading-[20px] transition-all duration-150 select-none cursor-pointer " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8333f4] focus-visible:ring-offset-2";

const sizeStyles: Record<ButtonSize, string> = {
  md: "px-3 py-2",   // 12px / 8px
  sm: "px-2 py-1.5", // 8px / 6px
};

const typeStyles: Record<ButtonType, string> = {
  // Primary：紫色漸層，文字白色
  Primary:
    "bg-[linear-gradient(to_top,#7522e0_11%,#a473f9_67%,#ab87fe_100%)] text-[#f1f1f3] " +
    "hover:bg-none hover:bg-[#451485] " +
    "disabled:bg-none disabled:bg-[#566065] disabled:opacity-50 disabled:cursor-not-allowed",

  // Secondary：白底，無邊框
  Secondary:
    "bg-[#f9fafb] text-[#171d1f] " +
    "hover:bg-[#eef0f1] " +
    "disabled:opacity-50 disabled:cursor-not-allowed",

  // Outline：白底 + 深紫邊框
  Outline:
    "bg-[#f9fafb] text-[#171d1f] border border-[#0d052c] " +
    "hover:bg-[#f1f0f5] " +
    "disabled:opacity-50 disabled:cursor-not-allowed",

  // Ghost：透明背景
  Ghost:
    "bg-transparent text-[#171d1f] rounded-md " +
    "hover:bg-[rgba(13,5,44,0.06)] " +
    "disabled:opacity-50 disabled:cursor-not-allowed",

  // Link：底線
  Link:
    "bg-transparent text-[#7522e0] underline underline-offset-2 " +
    "hover:text-[#451485] " +
    "disabled:opacity-50 disabled:cursor-not-allowed",

  // Link Secondary
  "Link Secondary":
    "bg-transparent text-[#30363a] underline underline-offset-2 " +
    "hover:text-[#171d1f] " +
    "disabled:opacity-50 disabled:cursor-not-allowed",
};

// ─── Destructive Styles（所有 type 皆有 Destructive 變體）─────────────────────

const destructiveStyles: Record<ButtonType, string> = {
  Primary:
    "bg-[#c5304e] text-[#f1f1f3] " +
    "hover:bg-[#a82540] " +
    "disabled:opacity-50 disabled:cursor-not-allowed",

  Secondary:
    "bg-[#fef0f2] text-[#c5304e] " +
    "hover:bg-[#fde3e8] " +
    "disabled:opacity-50 disabled:cursor-not-allowed",

  Outline:
    "bg-[#f9fafb] text-[#c5304e] border border-[#c5304e] " +
    "hover:bg-[#fef0f2] " +
    "disabled:opacity-50 disabled:cursor-not-allowed",

  Ghost:
    "bg-transparent text-[#c5304e] rounded-md " +
    "hover:bg-[rgba(197,48,78,0.08)] " +
    "disabled:opacity-50 disabled:cursor-not-allowed",

  Link:
    "bg-transparent text-[#c5304e] underline underline-offset-2 " +
    "hover:text-[#a82540] " +
    "disabled:opacity-50 disabled:cursor-not-allowed",

  "Link Secondary":
    "bg-transparent text-[#c5304e] underline underline-offset-2 " +
    "hover:text-[#a82540] " +
    "disabled:opacity-50 disabled:cursor-not-allowed",
};

// ─── Forced State Classes（供 state prop 強制呈現，用於 Storybook 展示）────────

const forcedHoverStyles: Record<ButtonType, string> = {
  Primary:    "bg-none bg-[#451485] text-[#f1f1f3]",
  Secondary:  "bg-[#eef0f1] text-[#171d1f]",
  Outline:    "bg-[#f1f0f5] text-[#171d1f] border border-[#0d052c]",
  Ghost:      "bg-[rgba(13,5,44,0.06)] text-[#171d1f]",
  Link:       "text-[#451485]",
  "Link Secondary": "text-[#171d1f]",
};

const forcedHoverDestructiveStyles: Record<ButtonType, string> = {
  Primary:    "bg-[#a82540] text-[#f1f1f3]",
  Secondary:  "bg-[#fde3e8] text-[#c5304e]",
  Outline:    "bg-[#fef0f2] text-[#c5304e] border border-[#c5304e]",
  Ghost:      "bg-[rgba(197,48,78,0.08)] text-[#c5304e]",
  Link:       "text-[#a82540]",
  "Link Secondary": "text-[#a82540]",
};

const focusedRingStyle = "outline-none ring-2 ring-[#8333f4] ring-offset-2";

// ─── Component ────────────────────────────────────────────────────────────────

export function Button({
  type = "Primary",
  size = "md",
  state = "Normal",
  destructive = false,
  iconLeading,
  iconTrailing,
  children = "Button",
  className,
  onClick,
  disabled,
}: ButtonProps) {
  const isDisabled = disabled || state === "Disabled";
  const isLoading = state === "Loading";
  const isForcedHover = state === "Hover";
  const isForcedFocused = state === "Focused";

  // 根據 destructive 選擇 base type style
  const baseTypeClass = destructive ? destructiveStyles[type] : typeStyles[type];

  // state prop 強制 override（供 Storybook 展示靜態狀態）
  const stateOverrideClass = isForcedHover
    ? (destructive ? forcedHoverDestructiveStyles[type] : forcedHoverStyles[type])
    : isForcedFocused
    ? focusedRingStyle
    : "";

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], baseTypeClass, stateOverrideClass, className)}
      onClick={onClick}
      disabled={isDisabled || isLoading}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={size === "sm" ? 14 : 16} />
      ) : (
        iconLeading && (
          <span className="shrink-0 [&>svg]:size-4">{iconLeading}</span>
        )
      )}

      {children && <span>{children}</span>}

      {!isLoading && iconTrailing && (
        <span className="shrink-0 [&>svg]:size-4">{iconTrailing}</span>
      )}
    </button>
  );
}

export default Button;
