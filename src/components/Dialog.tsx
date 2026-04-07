import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "./Button";
import type { ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
// Figma: ↳ Dialog · COMPONENT_SET Card-Base/Footer (4 variants)
// Footer: Buttons=One/BTN × Align=Left/Center/Right × Padding=p-6

export type DialogFooterButtons = "One" | "Two";
export type DialogFooterAlign = "Left" | "Center" | "Right";

export interface DialogProps {
  open?: boolean;
  title?: string;
  description?: ReactNode;
  children?: ReactNode;
  /** 幾個 Footer 按鈕 */
  footerButtons?: DialogFooterButtons;
  /** Footer 按鈕對齊 */
  footerAlign?: DialogFooterAlign;
  /** 主要按鈕文字 */
  confirmLabel?: string;
  /** 次要按鈕文字 */
  cancelLabel?: string;
  /** 危險操作 */
  destructive?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  className?: string;
}

// ─── Glass style（cinta-glass.md） ────────────────────────────────────────────
// 兩層結構：外層 Panel（背景 + blur + shadow）+ 內層 Glass（折射質感）
// ⚠️ blur 暫用 20px（DS Effect Style 實測值），待官方確認後統一。

const glassPanelStyle: React.CSSProperties = {
  background: "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.5))",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(13,5,44,0.1)",
  boxShadow:
    "0px 5px 5px rgba(36,18,66,0.05), 0px 2px 2px rgba(36,18,66,0.04), 0px 1px 0px rgba(36,18,66,0.03)",
};

const glassInnerStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  borderRadius: "inherit",
  background: "rgba(0,0,0,0.004)",
  pointerEvents: "none",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Dialog({
  open = true,
  title = "Dialog Title",
  description,
  children,
  footerButtons = "Two",
  footerAlign = "Right",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  onConfirm,
  onCancel,
  onClose,
  className,
}: DialogProps) {
  if (!open) return null;

  const alignClass: Record<DialogFooterAlign, string> = {
    Left: "justify-start",
    Center: "justify-center",
    Right: "justify-end",
  };

  return (
    /* Overlay */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(13,5,44,0.3)] backdrop-blur-sm">
      {/* Panel */}
      <div
        className={cn("relative w-full max-w-md rounded-[8px] overflow-hidden", className)}
        style={glassPanelStyle}
        role="dialog"
        aria-modal
        aria-labelledby="dialog-title"
      >
        <div style={glassInnerStyle} aria-hidden="true" />
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div className="flex flex-col gap-1 flex-1 min-w-0 pr-4">
            <h2
              id="dialog-title"
              className="font-[Urbanist] text-[24px] font-bold leading-[40px] text-[#171d1f]"
            >
              {title}
            </h2>
            {description && (
              <p className="font-[Urbanist] text-[14px] leading-[20px] text-[#30363a]">
                {description}
              </p>
            )}
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="shrink-0 text-[#91989e] hover:text-[#30363a] transition-colors"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Body */}
        {children && (
          <div className="px-6 pb-4 font-[Urbanist] text-[14px] leading-[20px] text-[#30363a]">
            {children}
          </div>
        )}

        {/* Divider */}
        <hr className="border-0 border-t border-[rgba(13,5,44,0.08)] mx-0" />

        {/* Footer（p-6 四邊，gap: 16px） */}
        <div className={cn("flex gap-4 p-6", alignClass[footerAlign])}>
          {footerButtons === "Two" && (
            <Button type="Secondary" onClick={onCancel}>
              {cancelLabel}
            </Button>
          )}
          <Button
            type="Primary"
            destructive={destructive}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
