import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import type { ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
// Figma: ↳ Card · COMPONENT_SET Workspace-Card (40001826:1674)
// Variants: Left Info. Right IMG / Info / Top IMG. Down Info / Blank

export type CardVariant =
  | "Left Info. Right IMG"
  | "Info"
  | "Top IMG. Down Info"
  | "Blank";

export interface CardProps {
  variant?: CardVariant;
  /** 工作區標題 */
  title?: string;
  /** 創建者名稱 */
  author?: string;
  /** 工作區 ID / subtitle */
  subtitle?: string;
  /** 日期 */
  date?: string;
  /** 圖片 URL */
  imageSrc?: string;
  /** Blank 卡自訂內容 */
  children?: ReactNode;
  onEdit?: () => void;
  onView?: () => void;
  /** Blank variant 的 Upload 按鈕 */
  onUpload?: () => void;
  className?: string;
}

// ─── Glass Panel（cinta-glass.md + Figma 40001826:1674 實測） ─────────────────
// 外層：backdrop-blur(20px) + 漸層背景 + 三層 shadow + border
// 內層：absolute inset-0，rgba(0,0,0,0.004)，模擬 Figma GLASS 折射質感
//
// 注意：Left Info. Right IMG 漸層停止點略不同（9% / 90%），其餘為 9.135% / 89.904%

const glassBase: React.CSSProperties = {
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "1px solid rgba(13,5,44,0.1)",
  // cinta-glass.md 三層 shadow：均使用 rgba(36,18,66) 紫底色，不可替換為黑色
  boxShadow:
    "0px 5px 5px rgba(36,18,66,0.05), 0px 2px 2px rgba(36,18,66,0.04), 0px 1px 0px rgba(36,18,66,0.03)",
  borderRadius: 8,
};

// 標準漸層（Info / Top IMG / Blank）
// cinta-glass.md：rgba(255,255,255,0.6→0.5)
const glassPanelStyle: React.CSSProperties = {
  ...glassBase,
  background:
    "linear-gradient(to bottom, rgba(255,255,255,0.6) 9.135%, rgba(255,255,255,0.5) 89.904%)",
};

// Left Info. Right IMG 專用漸層（stops 9% / 90%）
const glassPanelStyleWide: React.CSSProperties = {
  ...glassBase,
  background:
    "linear-gradient(to bottom, rgba(255,255,255,0.6) 9%, rgba(255,255,255,0.5) 90%)",
};

// Glass 內層（opacity 0.004，模擬 Figma GLASS 折射 effect，見 cinta-glass.md）
const glassInnerStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  borderRadius: "inherit",
  background: "rgba(0,0,0,0.004)",
  pointerEvents: "none",
};

// ─── Buttons（Figma: 純文字，無 icon；opacity-0 hover:opacity-1） ─────────────
// Edit：bg-primary #f9fafb，text-title #171d1f，SemiBold 14px
// View：紫色漸層，to-[rgba(171,135,254,0.6)] 半透明頂端，text-on-color #f1f1f3

function EditButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative min-w-[80px] px-3 py-2 rounded-[8px] overflow-hidden
        flex items-center justify-center gap-1
        bg-[#f9fafb]
        font-[Urbanist] text-[14px] font-semibold leading-[20px] text-[#171d1f] whitespace-nowrap"
    >
      <div style={glassInnerStyle} aria-hidden="true" />
      <span className="relative px-1">Edit</span>
    </button>
  );
}

function ViewButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative min-w-[80px] px-3 py-2 rounded-[8px] overflow-hidden
        flex items-center justify-center gap-1
        font-[Urbanist] text-[14px] font-semibold leading-[20px] text-[#f1f1f3] whitespace-nowrap"
      style={{
        // from #7522e0 10.577% → #a573fa 67.308% → rgba(171,135,254,0.6) 100%
        background:
          "linear-gradient(to top, #7522e0 10.577%, #a573fa 67.308%, rgba(171,135,254,0.6) 100%)",
      }}
    >
      <div style={glassInnerStyle} aria-hidden="true" />
      <span className="relative px-1">View</span>
    </button>
  );
}

// ─── Upload Button（Blank 專用，Plus icon + "Upload"） ────────────────────────

function UploadButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative min-w-[80px] px-3 py-2 rounded-[8px] overflow-hidden
        flex items-center justify-center gap-1
        font-[Urbanist] text-[14px] font-semibold leading-[20px] text-[#f1f1f3] whitespace-nowrap"
      style={{
        background:
          "linear-gradient(to top, #7522e0 10.577%, #a573fa 67.308%, rgba(171,135,254,0.6) 100%)",
      }}
    >
      <div style={glassInnerStyle} aria-hidden="true" />
      <Plus size={16} className="relative shrink-0" />
      <span className="relative px-1">Upload</span>
    </button>
  );
}

// ─── Card-Base/Header（共用） ──────────────────────────────────────────────────
// p-6, gap-1
// title：Urbanist Bold 24px line-l/40px text-title #171d1f
// subtitle：Urbanist Regular 16px line-s/20px
//   ← Left Info. Right IMG 使用 text-secondary #30363a
//   ← 其餘 variant 使用 utility-grey-300 #91989e

function CardHeader({
  title,
  subtitle,
  subtitleColor = "#91989e",
}: {
  title?: string;
  subtitle?: string;
  subtitleColor?: string;
}) {
  return (
    <div className="flex flex-col gap-1 p-6 shrink-0 w-full">
      <p className="font-[Urbanist] text-[24px] font-bold leading-[40px] text-[#171d1f] w-full truncate">
        {title ?? "Workspace Title"}
      </p>
      <p
        className="font-[Urbanist] text-[16px] font-normal leading-[20px] w-full truncate"
        style={{ color: subtitleColor }}
      >
        {subtitle ?? "workspace ID number"}
      </p>
    </div>
  );
}

// ─── Content（Creator • Date，共用） ─────────────────────────────────────────
// pb-6 px-6，flex-wrap，gap-x-1 gap-y-2
// Creator Name：Urbanist Bold 16px text-title
// • ：Bold
// Date：Urbanist Regular 16px

function CardContent({ author, date }: { author?: string; date?: string }) {
  return (
    <div className="flex flex-wrap items-start gap-x-1 gap-y-2 pb-6 px-6 whitespace-nowrap">
      <span className="font-[Urbanist] text-[16px] font-bold leading-[20px] text-[#171d1f]">
        {author ?? "Creator Name"}
      </span>
      <span className="font-[Urbanist] text-[16px] font-bold leading-[20px] text-[#171d1f]">•</span>
      <span className="font-[Urbanist] text-[16px] font-normal leading-[20px] text-[#171d1f]">
        {date ?? "Date"}
      </span>
    </div>
  );
}

// ─── Variant: Info ────────────────────────────────────────────────────────────
// Figma node 40001826:1709
// 外層：flex-row h-[200px] items-start justify-end
// Metadata（flex-1 h-full justify-between） + Footer（shrink-0 w-[348px] pb-6 pl-6 pr-6 pt-6）

function CardInfo({ title, author, subtitle, date, onEdit, onView }: CardProps) {
  return (
    <div className="flex flex-row h-full items-start justify-end">

      {/* Metadata：左側，flex-1，上下推開 */}
      <div className="flex flex-col flex-[1_0_0] h-full min-w-0 min-h-px justify-between">
        <CardHeader title={title} subtitle={subtitle} subtitleColor="#91989e" />
        <CardContent author={author} date={date} />
      </div>

      {/* Card-Base/Footer：右欄，固定 w-348px，垂直置中 */}
      {/* opacity-0 → group-hover:opacity-100（cinta-interaction.md） */}
      <div
        className="shrink-0 flex items-center justify-end gap-4
          pb-6 pl-6 pr-6 pt-6
          opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ width: 348 }}
      >
        <EditButton onClick={onEdit} />
        <ViewButton onClick={onView} />
      </div>

    </div>
  );
}

// ─── Variant: Left Info. Right IMG ────────────────────────────────────────────
// Figma node 40001826:1675
// 外層：flex-row items-start
// Info（flex-1）+ IMG（flex-1 max-w-[500px] min-w-[350px] p-2）
// Footer 是 ABSOLUTE 疊在 IMG 區右上角，w-[500px] pt-6 pl-6 pr-6 pb-6

function CardLeftInfoRightImg({ title, author, subtitle, date, imageSrc, onEdit, onView }: CardProps) {
  return (
    <div className="flex flex-row h-full items-start">

      {/* Info 左側 */}
      <div className="flex flex-col flex-[1_0_0] h-full min-w-0 min-h-px justify-between">
        {/* subtitle 用 text-secondary #30363a（Left Info. Right IMG 專屬） */}
        <CardHeader title={title} subtitle={subtitle} subtitleColor="#30363a" />
        <CardContent author={author} date={date} />
      </div>

      {/* IMG 右側，flex-1，max-w-500px min-w-350px，p-2 */}
      <div
        className="relative flex flex-col flex-[1_0_0] min-w-0 min-h-px p-2"
        style={{ maxWidth: 500, minWidth: 350 }}
      >
        {/* 圖片：h-260px fixed，rounded-6px，object-cover */}
        <div className="h-[260px] relative rounded-[6px] overflow-hidden shrink-0 w-full">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover rounded-[6px]"
            />
          ) : (
            <div className="w-full h-full bg-[rgba(131,51,244,0.06)] flex items-center justify-center rounded-[6px]">
              <span className="font-[Urbanist] text-[12px] text-[#91989e]">Image</span>
            </div>
          )}
        </div>

        {/* Card-Base/Footer：ABSOLUTE 疊圖右上角，w-[500px] */}
        {/* opacity-0 → group-hover:opacity-100 */}
        <div
          className="absolute top-0 right-0 flex items-center justify-end gap-4
            pb-6 pl-6 pr-6 pt-6
            opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ width: 500 }}
        >
          <EditButton onClick={onEdit} />
          <ViewButton onClick={onView} />
        </div>
      </div>

    </div>
  );
}

// ─── Variant: Top IMG. Down Info ──────────────────────────────────────────────
// Figma node 40001826:1718
// 外層：flex-col items-start
// IMG（shrink-0 pt-2 px-2，h-260px 固定，parallax overflow 效果）
// View 按鈕：ABSOLUTE top-[24px] right-[24px]（僅 View，無 Edit）
// Info：Header + Content

function CardTopImgDownInfo({ title, author, subtitle, date, imageSrc, onView }: CardProps) {
  return (
    <div className="flex flex-col h-full items-start">

      {/* IMG 區：shrink-0，pt-2 px-2，gap-[10px] */}
      <div className="shrink-0 pt-2 px-2 flex flex-col gap-[10px] w-full">
        {/* 圖片容器：h-260px 固定，overflow-hidden rounded-6px */}
        <div className="h-[260px] relative rounded-[6px] overflow-hidden shrink-0 w-full">
          {imageSrc ? (
            // Figma: 圖片稍微縮放溢出（h-[124.33%] top-[-12.17%]），產生裁切感
            <img
              src={imageSrc}
              alt={title}
              className="absolute left-0 w-full max-w-none pointer-events-none"
              style={{ height: "124.33%", top: "-12.17%" }}
            />
          ) : (
            <div className="w-full h-full bg-[rgba(131,51,244,0.06)] flex items-center justify-center">
              <span className="font-[Urbanist] text-[12px] text-[#91989e]">Image</span>
            </div>
          )}
        </div>
      </div>

      {/* View 按鈕：ABSOLUTE 疊圖右上角 top-24px right-24px，僅 View（無 Edit） */}
      {/* opacity-0 → group-hover:opacity-100 */}
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <ViewButton onClick={onView} />
      </div>

      {/* Info 區 */}
      <div className="flex flex-col shrink-0 w-full">
        {/* subtitle 用 utility-grey-300 #91989e */}
        <CardHeader title={title} subtitle={subtitle} subtitleColor="#91989e" />
        <CardContent author={author} date={date} />
      </div>

    </div>
  );
}

// ─── Variant: Blank ───────────────────────────────────────────────────────────
// Figma node 40001826:1703
// 外層：flex-col h-[240px] items-center justify-center
// Header（text-center）：title "Insert Title Here" + desc（#91989e）
// Footer：Upload 按鈕（Plus icon + "Upload"），pb-6 pt-0 px-4

function CardBlank({ title, subtitle, onUpload, children }: CardProps) {
  if (children) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        {children}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">

      {/* Card-Base/Header：text-center，p-6，gap-1 */}
      <div className="flex flex-col items-start gap-1 p-6 text-center w-full shrink-0">
        <p className="font-[Urbanist] text-[24px] font-bold leading-[40px] text-[#171d1f] w-full">
          {title ?? "Insert Title Here"}
        </p>
        <p className="font-[Urbanist] text-[16px] font-normal leading-[20px] text-[#91989e] w-full">
          {subtitle ?? "Start by uploading your first file to visualize your data center."}
        </p>
      </div>

      {/* Card-Base/Footer：pb-6 pt-0 px-4，Upload 按鈕 */}
      <div className="flex items-center justify-center pb-6 pt-0 px-4 shrink-0 w-full">
        <UploadButton onClick={onUpload} />
      </div>

    </div>
  );
}

// ─── Card Component ───────────────────────────────────────────────────────────

export function Card({
  variant = "Info",
  title,
  author,
  subtitle,
  date,
  imageSrc,
  children,
  onEdit,
  onView,
  onUpload,
  className,
}: CardProps) {
  const isLeftInfo = variant === "Left Info. Right IMG";

  const content = {
    "Left Info. Right IMG": (
      <CardLeftInfoRightImg
        title={title} author={author} subtitle={subtitle} date={date}
        imageSrc={imageSrc} onEdit={onEdit} onView={onView}
      />
    ),
    Info: (
      <CardInfo
        title={title} author={author} subtitle={subtitle} date={date}
        onEdit={onEdit} onView={onView}
      />
    ),
    "Top IMG. Down Info": (
      <CardTopImgDownInfo
        title={title} author={author} subtitle={subtitle} date={date}
        imageSrc={imageSrc} onView={onView}
      />
    ),
    Blank: (
      <CardBlank title={title} subtitle={subtitle} onUpload={onUpload}>
        {children}
      </CardBlank>
    ),
  }[variant];

  return (
    <div
      className={cn("relative group rounded-[8px] overflow-hidden min-w-[320px]", className)}
      style={isLeftInfo ? glassPanelStyleWide : glassPanelStyle}
    >
      {/* Glass 內層（cinta-glass.md 兩層結構） */}
      <div style={glassInnerStyle} aria-hidden="true" />
      {content}
    </div>
  );
}

export default Card;
