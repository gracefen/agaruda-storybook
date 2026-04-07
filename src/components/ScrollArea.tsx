import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
// Figma: ↳ Scroll Area（頁面為空，依 cinta-glass.md Scrollbar 規範實作）
// Scrollbar: 8px thumb, pill(9999px), utility-purple-a20, position absolute

export interface ScrollAreaProps {
  children?: ReactNode;
  /** 最大高度 */
  maxHeight?: string | number;
  /** 最大寬度 */
  maxWidth?: string | number;
  className?: string;
}

// ─── Glass style（cinta-glass.md） ────────────────────────────────────────────
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

export function ScrollArea({ children, maxHeight = 300, maxWidth, className }: ScrollAreaProps) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-[8px]", className)}
      style={glassPanelStyle}
    >
      <div style={glassInnerStyle} aria-hidden="true" />
      {/* Scroll container */}
      <div
        className="overflow-y-auto overflow-x-hidden"
        style={{
          maxHeight,
          maxWidth,
          // Custom scrollbar — cinta-glass.md
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(13,5,44,0.2) transparent",
        }}
      >
        {/* WebKit scrollbar styles via inline style tag workaround */}
        <style>{`
          .cinta-scroll::-webkit-scrollbar { width: 8px; }
          .cinta-scroll::-webkit-scrollbar-track { background: transparent; }
          .cinta-scroll::-webkit-scrollbar-thumb {
            background: rgba(13,5,44,0.2);
            border-radius: 9999px;
          }
          .cinta-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(13,5,44,0.3);
          }
        `}</style>
        <div className="cinta-scroll overflow-y-auto" style={{ maxHeight, maxWidth }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default ScrollArea;
