import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";
import type { ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
// Figma: ↳ Checkbox · COMPONENT_SETs:
//   Checkbox-Base (9 variants): State × Selected
//   Checkbox (18 variants): Type × Disabled × Destructive × Left/Right
//   Checkbox-Group (3 variants)

export type CheckboxSelected = "True" | "False" | "Intermediate";
export type CheckboxState = "Default" | "Focus" | "Disabled";
export type CheckboxType = "Default" | "Group item" | "Outlined";

export interface CheckboxProps {
  /** 勾選狀態 */
  selected?: CheckboxSelected;
  /** 互動狀態 */
  state?: CheckboxState;
  /** 元件類型 */
  type?: CheckboxType;
  /** Destructive 模式 */
  destructive?: boolean;
  /** Label 在左（true）還是右（false，預設） */
  labelLeft?: boolean;
  /** Label 文字 */
  label?: string;
  /** 說明文字（Description variant） */
  description?: string;
  /** onChange callback */
  onChange?: (selected: CheckboxSelected) => void;
  className?: string;
}

// ─── Checkbox-Base（16×16px box） ─────────────────────────────────────────────

function CheckboxBase({
  selected = "False",
  state = "Default",
  destructive = false,
  onChange,
}: Pick<CheckboxProps, "selected" | "state" | "destructive" | "onChange">) {
  const isDisabled = state === "Disabled";
  const isFocus = state === "Focus";
  const isChecked = selected === "True";
  const isIntermediate = selected === "Intermediate";

  const handleClick = () => {
    if (isDisabled || !onChange) return;
    const next: CheckboxSelected =
      selected === "False" ? "True" : selected === "True" ? "Intermediate" : "False";
    onChange(next);
  };

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isChecked ? true : isIntermediate ? "mixed" : false}
      disabled={isDisabled}
      onClick={handleClick}
      className={cn(
        "w-4 h-4 rounded-[4px] flex items-center justify-center shrink-0 transition-all duration-150",
        "border",
        isChecked || isIntermediate
          ? destructive
            ? "bg-[#c5304e] border-[#c5304e]"
            : "bg-[#7522e0] border-[#7522e0]"
          : destructive
          ? "bg-transparent border-[#c5304e]"
          : "bg-transparent border-[rgba(13,5,44,0.2)]",
        isFocus && !isDisabled
          ? destructive
            ? "ring-2 ring-[rgba(197,48,78,0.2)]"
            : "ring-2 ring-[rgba(117,34,224,0.2)]"
          : "",
        isDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:border-[#7522e0]"
      )}
    >
      {isChecked && <Check size={10} className="text-white" strokeWidth={3} />}
      {isIntermediate && <Minus size={10} className="text-white" strokeWidth={3} />}
    </button>
  );
}

// ─── Full Checkbox ─────────────────────────────────────────────────────────────

export function Checkbox({
  selected = "False",
  state = "Default",
  type = "Default",
  destructive = false,
  labelLeft = false,
  label,
  description,
  onChange,
  className,
}: CheckboxProps) {
  const isDisabled = state === "Disabled";

  const box = (
    <CheckboxBase
      selected={selected}
      state={state}
      destructive={destructive}
      onChange={onChange}
    />
  );

  const textContent = (label || description) && (
    <div className="flex flex-col gap-0.5 min-w-0 flex-1">
      {label && (
        <span
          className={cn(
            "font-[Urbanist] text-[14px] font-semibold leading-[20px]",
            destructive ? "text-[#c5304e]" : "text-[#171d1f]",
            isDisabled ? "opacity-50" : ""
          )}
        >
          {label}
        </span>
      )}
      {description && (
        <span
          className={cn(
            "font-[Urbanist] text-[12px] leading-[16px]",
            destructive ? "text-[rgba(197,48,78,0.7)]" : "text-[#91989e]",
            isDisabled ? "opacity-50" : ""
          )}
        >
          {description}
        </span>
      )}
    </div>
  );

  if (type === "Outlined") {
    return (
      <div
        className={cn(
          "flex items-start gap-3 rounded-[8px] p-3 border transition-all",
          selected === "True"
            ? destructive
              ? "border-[#c5304e] bg-[rgba(197,48,78,0.04)]"
              : "border-[#7522e0] bg-[rgba(117,34,224,0.04)]"
            : "border-[rgba(13,5,44,0.1)] bg-transparent",
          isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          className
        )}
        onClick={() => !isDisabled && onChange?.(selected === "False" ? "True" : "False")}
      >
        {labelLeft ? (
          <>
            {textContent}
            {box}
          </>
        ) : (
          <>
            {box}
            {textContent}
          </>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex items-start gap-3", isDisabled ? "cursor-not-allowed" : "cursor-pointer", className)}>
      {labelLeft ? (
        <>
          {textContent}
          {box}
        </>
      ) : (
        <>
          {box}
          {textContent}
        </>
      )}
    </div>
  );
}

// ─── Checkbox Group ───────────────────────────────────────────────────────────

export interface CheckboxGroupProps {
  items: Array<{ label: string; description?: string; selected?: CheckboxSelected }>;
  disabled?: boolean;
  destructive?: boolean;
  className?: string;
}

export function CheckboxGroup({ items, disabled, destructive, className }: CheckboxGroupProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item, i) => (
        <Checkbox
          key={i}
          label={item.label}
          description={item.description}
          selected={item.selected ?? "False"}
          state={disabled ? "Disabled" : "Default"}
          destructive={destructive}
          type="Group item"
        />
      ))}
    </div>
  );
}

export default Checkbox;
