import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
// Figma: ↳ Switch · COMPONENT_SETs:
//   Switch-Base (12): Selected × State × Size
//   Switch (18): Type × Disabled × Destructive × Left/Right

export type SwitchSize = "md" | "sm";
export type SwitchState = "Default" | "Focus" | "Disabled";
export type SwitchType = "Default" | "Description";

export interface SwitchProps {
  /** 開關狀態 */
  selected?: boolean;
  /** 尺寸 */
  size?: SwitchSize;
  /** 互動狀態 */
  state?: SwitchState;
  /** 元件類型 */
  type?: SwitchType;
  /** Destructive 模式 */
  destructive?: boolean;
  /** Label 在左（true）/ 右（false，預設） */
  labelLeft?: boolean;
  /** Label 文字 */
  label?: string;
  /** 說明文字（type=Description 時使用） */
  description?: string;
  /** onChange callback */
  onChange?: (selected: boolean) => void;
  className?: string;
}

// ─── Switch-Base（toggle only） ───────────────────────────────────────────────

// Figma: md track 240×24px（含 label），Switch-Base md ≈ 40×24px
// Thumb: white circle, slides left/right

function SwitchBase({
  selected = false,
  size = "md",
  state = "Default",
  destructive = false,
  onChange,
}: Pick<SwitchProps, "selected" | "size" | "state" | "destructive" | "onChange">) {
  const isDisabled = state === "Disabled";
  const isFocus = state === "Focus";

  const trackSize = size === "md"
    ? "w-[40px] h-[24px]"
    : "w-[34px] h-[20px]";

  const thumbSize = size === "md"
    ? "w-[18px] h-[18px]"
    : "w-[14px] h-[14px]";

  const thumbTranslate = selected
    ? size === "md" ? "translate-x-[18px]" : "translate-x-[15px]"
    : "translate-x-[3px]";

  const trackColor = selected
    ? destructive ? "bg-[#c5304e]" : "bg-[#7522e0]"
    : "bg-[rgba(13,5,44,0.15)]";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={selected}
      disabled={isDisabled}
      onClick={() => !isDisabled && onChange?.(!selected)}
      className={cn(
        "relative inline-flex items-center rounded-full shrink-0 transition-all duration-200",
        trackSize,
        trackColor,
        isFocus && !isDisabled
          ? destructive
            ? "ring-2 ring-[rgba(197,48,78,0.2)]"
            : "ring-2 ring-[rgba(117,34,224,0.2)]"
          : "",
        isDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
      )}
    >
      <span
        className={cn(
          "absolute rounded-full bg-white shadow-sm transition-transform duration-200",
          thumbSize,
          thumbTranslate
        )}
      />
    </button>
  );
}

// ─── Full Switch ──────────────────────────────────────────────────────────────

export function Switch({
  selected = false,
  size = "md",
  state = "Default",
  type = "Default",
  destructive = false,
  labelLeft = false,
  label,
  description,
  onChange,
  className,
}: SwitchProps) {
  const isDisabled = state === "Disabled";

  const toggle = (
    <SwitchBase
      selected={selected}
      size={size}
      state={state}
      destructive={destructive}
      onChange={onChange}
    />
  );

  const textContent = (label || description) && (
    <div
      className={cn("flex flex-col gap-0.5 flex-1 min-w-0", isDisabled ? "opacity-50" : "", "cursor-pointer")}
      onClick={() => !isDisabled && onChange?.(!selected)}
    >
      {label && (
        <span
          className={cn(
            "font-[Urbanist] text-[14px] font-semibold leading-[20px]",
            destructive ? "text-[#c5304e]" : "text-[#171d1f]"
          )}
        >
          {label}
        </span>
      )}
      {type === "Description" && description && (
        <span
          className={cn(
            "font-[Urbanist] text-[12px] leading-[16px]",
            destructive ? "text-[rgba(197,48,78,0.7)]" : "text-[#91989e]"
          )}
        >
          {description}
        </span>
      )}
    </div>
  );

  return (
    <div className={cn("flex items-start gap-3", className)}>
      {labelLeft ? (
        <>
          {textContent}
          {toggle}
        </>
      ) : (
        <>
          {toggle}
          {textContent}
        </>
      )}
    </div>
  );
}

export default Switch;
