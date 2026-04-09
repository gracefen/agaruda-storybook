import { cn } from "@/lib/utils";
import { Plus, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
// Figma: ↳ Sidebar（頁面為空，依 cinta-layout.md 實作）
// 寬度：240px 固定；Glass 效果；Header + Section × N

export interface SidebarItem {
  label: string;
  icon?: ReactNode;
  active?: boolean;
  /** 預設是否展開（有 subItems 時有效） */
  expanded?: boolean;
  onClick?: () => void;
  /** 子分類清單 */
  subItems?: SidebarItem[];
}

export interface SidebarSection {
  title: string;
  /** action=true → 右側顯示 + icon */
  action?: boolean;
  onAction?: () => void;
  items: SidebarItem[];
}

export interface SidebarProps {
  /** Logo / brand area */
  logo?: ReactNode;
  sections?: SidebarSection[];
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

// ─── Sidebar Item（cinta-interaction.md） ─────────────────────────────────────

function SidebarItemNode({ label, icon, active, expanded: defaultExpanded = false, onClick, subItems }: SidebarItem) {
  const hasSubItems = !!(subItems && subItems.length > 0);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleClick = () => {
    if (hasSubItems) setIsExpanded((v) => !v);
    onClick?.();
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={cn(
          "w-full flex items-center gap-2 px-3 py-2 rounded-[6px] text-left transition-colors",
          "font-[Urbanist] text-[14px] font-medium leading-[20px]",
          active
            ? "bg-[rgba(13,5,44,0.1)] text-[#171d1f]"
            : "text-[#30363a] hover:bg-[rgba(13,5,44,0.04)]"
        )}
      >
        {icon && <span className="shrink-0 w-4 h-4 [&>svg]:size-4">{icon}</span>}
        <span className="flex-1 truncate">{label}</span>
        {hasSubItems && (
          isExpanded
            ? <ChevronDown size={14} className="shrink-0 text-[#91989e]" />
            : <ChevronRight size={14} className="shrink-0 text-[#91989e]" />
        )}
      </button>

      {/* 子分類清單 */}
      {hasSubItems && isExpanded && (
        <div className="flex flex-col gap-px pl-2 mt-px">
          {subItems!.map((sub, i) => (
            <button
              key={i}
              onClick={sub.onClick}
              className={cn(
                "w-full flex items-center text-left rounded-[4px] transition-colors",
                "font-[Urbanist] text-[13px] leading-[20px] px-2 py-1",
                "border-l-2",
                sub.active
                  ? "border-[#7522e0] bg-[rgba(117,34,224,0.06)] font-medium text-[#171d1f]"
                  : "border-transparent font-normal text-[#30363a] hover:bg-[rgba(13,5,44,0.04)]"
              )}
            >
              <span className="truncate">{sub.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Sidebar Section ──────────────────────────────────────────────────────────

// cinta-layout.md: paddingTop/Bottom 8px, Left/Right 16px; Section gap 8px

function SidebarSectionNode({ title, action, onAction, items }: SidebarSection) {
  return (
    <div className="flex flex-col gap-0 px-4 py-2">
      {/* Section title: size-xs 12px, Regular 400, line-xs 16px */}
      <div className="flex items-center justify-between mb-1">
        <span className="font-[Urbanist] text-[12px] font-normal leading-[16px] text-[#91989e] uppercase tracking-wider">
          {title}
        </span>
        {action && (
          <button
            onClick={onAction}
            className="text-[#91989e] hover:text-[#30363a] transition-colors"
            aria-label={`Add to ${title}`}
          >
            <Plus size={14} />
          </button>
        )}
      </div>
      {/* Items */}
      <div className="flex flex-col gap-0.5">
        {items.map((item, i) => (
          <SidebarItemNode key={i} {...item} />
        ))}
      </div>
    </div>
  );
}

// ─── Sidebar Component ────────────────────────────────────────────────────────

export function Sidebar({ logo, sections = [], className }: SidebarProps) {
  return (
    // cinta-layout.md: 240px fixed, FILL height
    <div
      className={cn("relative flex flex-col w-[240px] h-full rounded-[8px] overflow-hidden", className)}
      style={glassPanelStyle}
    >
      <div style={glassInnerStyle} aria-hidden="true" />
      {/* Header: padding 24px 四邊 */}
      <div className="flex items-center gap-2 p-6 shrink-0 border-b border-[rgba(13,5,44,0.06)]">
        {logo ?? (
          <>
            <div className="w-6 h-6 rounded-md bg-[linear-gradient(to_top,#7522e0,#a473f9)] shrink-0" />
            <span className="font-[Urbanist] text-[16px] font-bold leading-[20px] text-[#171d1f]">
              Cinta
            </span>
          </>
        )}
      </div>

      {/* Content: paddingBottom 8px, gap 8px between sections */}
      <nav className="flex flex-col gap-2 flex-1 overflow-y-auto py-2">
        {sections.map((section, i) => (
          <SidebarSectionNode key={i} {...section} />
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
