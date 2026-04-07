import { cn } from "@/lib/utils";
import { Upload, ImageIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
// Figma: ↳ Card · Library Assets section · Library-Asstes component set
// Variants: Type × State (Upload/Sample/Asset × Default/Hover)
// Size: 270×280px（設計稿）

export type LibraryAssetType = "Upload" | "Sample" | "Asset";

export interface LibraryAssetProps {
  type?: LibraryAssetType;
  name?: string;
  /** 類型標籤，如 "UI Kit"、"Icon Set" */
  meta?: string;
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

const glassInnerStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  borderRadius: "inherit",
  background: "rgba(0,0,0,0.004)",
  pointerEvents: "none",
};

// ─── Type Badge ───────────────────────────────────────────────────────────────

const typeLabelMap: Record<LibraryAssetType, string> = {
  Upload: "Upload",
  Sample: "Sample",
  Asset: "Asset",
};

const typeBadgeColor: Record<LibraryAssetType, string> = {
  Upload: "bg-[rgba(131,51,244,0.1)] text-[#7522e0]",
  Sample: "bg-[rgba(36,18,66,0.06)] text-[#30363a]",
  Asset: "bg-[rgba(36,18,66,0.06)] text-[#30363a]",
};

// ─── Thumbnail Area ───────────────────────────────────────────────────────────

function UploadThumbnail() {
  return (
    <div
      className="w-full h-full rounded-[6px] flex flex-col items-center justify-center gap-2
        border-2 border-dashed border-[rgba(13,5,44,0.15)]
        bg-[rgba(131,51,244,0.04)] group-hover:bg-[rgba(131,51,244,0.08)]
        transition-colors duration-200"
    >
      <div className="w-10 h-10 rounded-full bg-[rgba(131,51,244,0.1)] flex items-center justify-center">
        <Upload size={18} className="text-[#8333f4]" />
      </div>
      <p className="font-[Urbanist] text-[14px] font-semibold leading-[20px] text-[#30363a]">
        Upload Asset
      </p>
      <p className="font-[Urbanist] text-[12px] font-normal leading-[16px] text-[#91989e]">
        Drag & drop or click
      </p>
    </div>
  );
}

function PreviewThumbnail({ imageSrc, name }: { imageSrc?: string; name?: string }) {
  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt={name}
        className="w-full h-full object-cover rounded-[6px]"
      />
    );
  }
  return (
    <div className="w-full h-full rounded-[6px] bg-[rgba(131,51,244,0.06)] flex items-center justify-center
      group-hover:bg-[rgba(131,51,244,0.1)] transition-colors duration-200">
      <ImageIcon size={28} className="text-[#91989e]" />
    </div>
  );
}

// ─── LibraryAsset Component ───────────────────────────────────────────────────

export function LibraryAsset({
  type = "Asset",
  name = "Untitled Asset",
  meta,
  imageSrc,
  className,
  onClick,
}: LibraryAssetProps) {
  return (
    <div
      className={cn("relative group rounded-[8px] overflow-hidden cursor-pointer", className)}
      style={glassPanelStyle}
      onClick={onClick}
    >
      {/* Glass 內層（cinta-glass.md 兩層結構） */}
      <div style={glassInnerStyle} aria-hidden="true" />

      <div className="relative flex flex-col h-full">
        {/* 縮圖區（padding: 8px，image radius: 6px） */}
        <div className="flex-1 p-2 min-h-0">
          {type === "Upload" ? (
            <UploadThumbnail />
          ) : (
            <PreviewThumbnail imageSrc={imageSrc} name={name} />
          )}
        </div>

        {/* Info 區（Upload 不顯示 info bar） */}
        {type !== "Upload" && (
          <div className="px-3 py-2.5 border-t border-[rgba(13,5,44,0.06)] flex flex-col gap-1">
            <div className="flex items-center justify-between gap-2">
              {/* name: size-s, SemiBold 600 */}
              <p className="font-[Urbanist] text-[14px] font-semibold leading-[20px] text-[#171d1f] truncate flex-1 min-w-0">
                {name}
              </p>
              {/* type badge */}
              <span
                className={cn(
                  "shrink-0 inline-flex items-center px-1.5 py-0.5 rounded-[4px]",
                  "font-[Urbanist] text-[12px] font-semibold leading-[16px]",
                  typeBadgeColor[type]
                )}
              >
                {typeLabelMap[type]}
              </span>
            </div>
            {meta && (
              <p className="font-[Urbanist] text-[12px] font-normal leading-[16px] text-[#91989e] truncate">
                {meta}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default LibraryAsset;
