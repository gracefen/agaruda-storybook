import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
// Figma: ↳ Input · COMPONENT_SET Input (80 variants)
// Size: md / sm
// Type: Text / File
// State: Default / Focus-Empty / Focus-Filled / Disabled
// Destructive: True / False
// Horizontal: True（label 左）/ False（label 上）

export type InputSize = "md" | "sm";
export type InputType = "text" | "file" | "email" | "password" | "number" | "search" | "url";
export type InputState = "Default" | "Focus-Empty" | "Focus-Filled" | "Disabled";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** 輸入框尺寸 */
  size?: InputSize;
  /** Input type */
  inputType?: InputType;
  /** Label 文字 */
  label?: string;
  /** Placeholder 提示 */
  placeholder?: string;
  /** Helper / error 說明文字 */
  helperText?: string;
  /** 危險狀態（紅色邊框） */
  destructive?: boolean;
  /** Label 與 Input 水平排列（label 在左） */
  horizontal?: boolean;
  /** 左側前綴 icon */
  prefixIcon?: ReactNode;
  /** 右側後綴 icon */
  suffixIcon?: ReactNode;
  /** 互動狀態（Storybook 展示用） */
  state?: InputState;
  className?: string;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

// Figma: md=40px, sm=36px height; width fills container (384px in Figma)
const sizeStyles: Record<InputSize, { input: string; text: string }> = {
  md: { input: "h-[40px] px-3",   text: "text-[14px] leading-[20px]" },
  sm: { input: "h-[36px] px-2.5", text: "text-[14px] leading-[20px]" },
};

function getInputBorderClass(destructive: boolean, state: InputState) {
  if (destructive) return "border-[#c5304e] focus:ring-2 focus:ring-[rgba(197,48,78,0.2)] focus:border-[#c5304e]";
  if (state === "Disabled") return "border-[rgba(13,5,44,0.1)] opacity-50 cursor-not-allowed";
  return "border-[rgba(13,5,44,0.1)] focus:ring-2 focus:ring-[rgba(117,34,224,0.2)] focus:border-[#7522e0]";
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Input({
  size = "md",
  inputType = "text",
  label,
  placeholder,
  helperText,
  destructive = false,
  horizontal = false,
  prefixIcon,
  suffixIcon,
  state = "Default",
  className,
  disabled,
  ...rest
}: InputProps) {
  const isDisabled = disabled || state === "Disabled";
  const { input: inputSizeClass, text: textClass } = sizeStyles[size];
  const borderClass = getInputBorderClass(destructive, state);

  const inputEl = (
    <div className="relative flex items-center flex-1 min-w-0">
      {prefixIcon && (
        <span className="absolute left-3 text-[#91989e] pointer-events-none shrink-0">
          {prefixIcon}
        </span>
      )}
      <input
        type={inputType}
        placeholder={placeholder}
        disabled={isDisabled}
        className={cn(
          "w-full rounded-[8px] outline-none transition-all duration-150",
          "font-[Urbanist] text-[#171d1f] placeholder:text-[#91989e]",
          "bg-[rgba(250,252,252,0.6)]",
          "border",
          inputSizeClass,
          textClass,
          borderClass,
          prefixIcon ? "pl-9" : "",
          suffixIcon ? "pr-9" : "",
          className
        )}
        {...rest}
      />
      {suffixIcon && (
        <span className="absolute right-3 text-[#91989e] pointer-events-none shrink-0">
          {suffixIcon}
        </span>
      )}
    </div>
  );

  // No label
  if (!label) return inputEl;

  const labelEl = (
    <label
      className={cn(
        "font-[Urbanist] text-[14px] font-semibold leading-[20px] shrink-0",
        destructive ? "text-[#c5304e]" : "text-[#171d1f]",
        isDisabled ? "opacity-50" : ""
      )}
    >
      {label}
    </label>
  );

  const helperEl = helperText && (
    <p
      className={cn(
        "font-[Urbanist] text-[12px] leading-[16px] mt-1",
        destructive ? "text-[#c5304e]" : "text-[#91989e]"
      )}
    >
      {helperText}
    </p>
  );

  if (horizontal) {
    // Label 在左，Input 在右
    return (
      <div className="flex items-start gap-4">
        <div className="pt-[10px]">{labelEl}</div>
        <div className="flex flex-col flex-1 min-w-0">
          {inputEl}
          {helperEl}
        </div>
      </div>
    );
  }

  // Label 在上（default）
  return (
    <div className="flex flex-col">
      <div className="mb-1.5">{labelEl}</div>
      {inputEl}
      {helperEl}
    </div>
  );
}

export default Input;
