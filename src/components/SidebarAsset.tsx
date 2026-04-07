import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
// Figma: ↳ Card · Library Assets section · Sidebar-Asset component set
// States: Default / Selected
// Size: 150×147px（設計稿）

export type SidebarAssetState = "Default" | "Selected";

export interface SidebarAssetProps {
  state?: SidebarAssetState;
  name?: string;
  imageSrc?: string;
  className?: string;
  onClick?: () => void;
}

// ─── Glass style（cinta-glass.md） ────────────────────────────────────────────
const glassPanelStyle: React.CSSProperties = {
  background: "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.5))",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(13,5,44,0.1)",
  boxShadow:
    "0px 5px 5px rgba(36,18,66,0.05), 0px 2px 2px rgba(36,18,66,0.04), 0px 1px 0px rgba(36,18,66,0.03)",
};

const glassPanelSelectedStyle: React.CSSProperties = {
  background: "linear-gradient(to bottom, rgba(131,51,244,0.18), rgba(131,51,244,0.12))",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(131,51,244,0.35)",
  boxShadow:
    "0px 5px 5px rgba(36,18,66,0.08), 0px 2px 2px rgba(36,18,66,0.06), 0px 1px 0px rgba(36,18,66,0.04)",
};

const glassInnerStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  borderRadius: "inherit",
  background: "rgba(0,0,0,0.004)",
  pointerEvents: "none",
};

// ─── SidebarAsset Component ───────────────────────────────────────────────────

export function SidebarAsset({
  state = "Default",
  name = "Asset",
  imageSrc,
  className,
  onClick,
}: SidebarAssetProps) {
  const isSelected = state === "Selected";

  return (
    <div
      className={cn("relative group rounded-[8px] overflow-hidden cursor-pointer", className)}
      style={isSelected ? glassPanelSelectedStyle : glassPanelStyle}
      onClick={onClick}
    >
      {/* Glass 內層（cinta-glass.md 兩層結構） */}
      <div style={glassInnerStyle} aria-hidden="true" />

      <div className="relative flex flex-col h-full">
        {/* 縮圖區（padding: 6px，image radius: 6px） */}
        <div className="flex-1 p-1.5 min-h-0">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={name}
              className="w-full h-full object-cover rounded-[6px]"
            />
          ) : (
            <div
              className={cn(
                "w-full h-full rounded-[6px] flex items-center justify-center transition-colors duration-200",
                isSelected
                  ? "bg-[rgba(131,51,244,0.15)]"
                  : "bg-[rgba(131,51,244,0.06)] group-hover:bg-[rgba(131,51,244,0.1)]"
              )}
            >
              <ImageIcon
                size={22}
                className={isSelected ? "text-[#8333f4]" : "text-[#91989e]"}
              />
            </div>
          )}
        </div>

        {/* 名稱區（padding: 6px 8px） */}
        <div
          className={cn(
            "px-2 py-1.5 border-t",
            isSelected ? "border-[rgba(131,51,244,0.2)]" : "border-[rgba(13,5,44,0.06)]"
          )}
        >
          {/* size-xs, SemiBold 600 */}
          <p
            className={cn(
              "font-[Urbanist] text-[12px] font-semibold leading-[16px] truncate",
              isSelected ? "text-[#7522e0]" : "text-[#171d1f]"
            )}
          >
            {name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SidebarAsset;
