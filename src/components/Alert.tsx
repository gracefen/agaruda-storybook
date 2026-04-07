import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info, XCircle, X } from "lucide-react";
import type { ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
// Figma: ↳ Alert（頁面為空，依 Cinta 設計語言實作）

export type AlertVariant = "Info" | "Success" | "Warning" | "Error";

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  description?: ReactNode;
  /** 是否顯示關閉按鈕 */
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

// ─── Variant config ───────────────────────────────────────────────────────────

const variantConfig: Record<
  AlertVariant,
  { icon: ReactNode; bg: string; border: string; iconColor: string }
> = {
  Info: {
    icon: <Info size={16} />,
    bg: "rgba(117,34,224,0.06)",
    border: "rgba(117,34,224,0.2)",
    iconColor: "#7522e0",
  },
  Success: {
    icon: <CheckCircle2 size={16} />,
    bg: "rgba(34,197,94,0.06)",
    border: "rgba(34,197,94,0.25)",
    iconColor: "#16a34a",
  },
  Warning: {
    icon: <AlertCircle size={16} />,
    bg: "rgba(234,179,8,0.07)",
    border: "rgba(234,179,8,0.3)",
    iconColor: "#ca8a04",
  },
  Error: {
    icon: <XCircle size={16} />,
    bg: "rgba(197,48,78,0.06)",
    border: "rgba(197,48,78,0.2)",
    iconColor: "#c5304e",
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Alert({
  variant = "Info",
  title,
  description,
  dismissible = false,
  onDismiss,
  className,
}: AlertProps) {
  const { icon, bg, border, iconColor } = variantConfig[variant];

  return (
    <div
      role="alert"
      className={cn("relative flex gap-3 rounded-[8px] p-4", className)}
      style={{
        background: bg,
        border: `1px solid ${border}`,
        boxShadow:
          "0px 5px 5px rgba(36,18,66,0.05), 0px 2px 2px rgba(36,18,66,0.04), 0px 1px 0px rgba(36,18,66,0.03)",
      }}
    >
      {/* Icon */}
      <span className="shrink-0 mt-0.5" style={{ color: iconColor }}>
        {icon}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-[Urbanist] text-[14px] font-semibold leading-[20px] text-[#171d1f]">
            {title}
          </p>
        )}
        {description && (
          <p className="font-[Urbanist] text-[14px] font-normal leading-[20px] text-[#30363a] mt-0.5">
            {description}
          </p>
        )}
      </div>

      {/* Dismiss */}
      {dismissible && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          className="shrink-0 text-[#91989e] hover:text-[#30363a] transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export default Alert;
