import { cn } from "@/lib/utils";
import { Pencil, Eye } from "lucide-react";
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
  /** Card 標題（項目名稱） */
  title?: string;
  /** 作者姓名 */
  author?: string;
  /** 編號 / subtitle */
  subtitle?: string;
  /** 日期（Geist 字型） */
  date?: string;
  /** 圖片 URL（variant 含圖時使用） */
  imageSrc?: string;
  /** 自訂內容（Blank variant 用） */
  children?: ReactNode;
  /** Edit 點擊 */
  onEdit?: () => void;
  /** View 點擊 */
  onView?: () => void;
  className?: string;
}

// ─── Glass style（cinta-glass.md） ────────────────────────────────────────────
// 兩層結構：
//   外層 Panel → 漸層背景 + backdrop-blur + 三層 shadow + border
//   內層 Glass → absolute 覆蓋，near-transparent fill，模擬 Figma GLASS 折射質感
//
// ⚠️ blur 數值：CSS 規範 10px；DS Effect Style 實測（Shadow-Blur-Subtle/sm）為 20px。
//    Figma 端以 Style Key 綁定為準；此處暫用 20px（對齊 DS 實測），待官方確認後統一。

const glassPanelStyle: React.CSSProperties = {
  background: "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.5))",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(13,5,44,0.1)",
  boxShadow:
    "0px 5px 5px rgba(36,18,66,0.05), 0px 2px 2px rgba(36,18,66,0.04), 0px 1px 0px rgba(36,18,66,0.03)",
};

// 內層：模擬 Figma GLASS type effect（折射質感），CSS 以近透明底色近似
const glassInnerStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  borderRadius: "inherit",
  background: "rgba(0,0,0,0.004)",
  pointerEvents: "none",
};

// ─── Card Actions（hover shows Edit / View） ───────────────────────────────────

function CardActions({ onEdit, onView }: { onEdit?: () => void; onView?: () => void }) {
  return (
    // opacity-0 → group-hover:opacity-100, 禁止用 display:none（cinta-interaction.md）
    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <button
        onClick={onEdit}
        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg
          font-[Urbanist] text-[14px] font-semibold leading-[20px] text-[#171d1f]
          bg-[#f9fafb] hover:bg-[#eef0f1] transition-colors"
      >
        <Pencil size={16} />
        <span>Edit</span>
      </button>
      <button
        onClick={onView}
        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg
          font-[Urbanist] text-[14px] font-semibold leading-[20px] text-[#f1f1f3]
          bg-[linear-gradient(to_top,#7522e0_11%,#a473f9_67%,#ab87fe_100%)]
          hover:bg-none hover:bg-[#451485] transition-all"
      >
        <Eye size={16} />
        <span>View</span>
      </button>
    </div>
  );
}

// ─── Card Metadata ─────────────────────────────────────────────────────────────

function CardMeta({
  title = "Workspace Title",
  author = "Author Name",
  subtitle = "#WS-001",
  date,
}: Pick<CardProps, "title" | "author" | "subtitle" | "date">) {
  return (
    <div className="flex flex-col gap-1 flex-1 min-w-0">
      {/* title: size-2xl, Bold 700, line-l */}
      <h3 className="font-[Urbanist] text-[24px] font-bold leading-[40px] text-[#171d1f] truncate">
        {title}
      </h3>
      {/* author: size-m, Bold 700, line-s */}
      <p className="font-[Urbanist] text-[16px] font-bold leading-[20px] text-[#171d1f]">
        {author}
      </p>
      {/* subtitle: size-m, Regular 400, line-s */}
      <p className="font-[Urbanist] text-[16px] font-normal leading-[20px] text-[#91989e]">
        {subtitle}
      </p>
      {/* date: size-s, Regular 400, Geist */}
      {date && (
        <p className="font-[Geist,'Geist',sans-serif] text-[14px] font-normal leading-[20px] text-[#91989e] mt-1">
          {date}
        </p>
      )}
    </div>
  );
}

// ─── Card Footer（padding: 24px 四邊，gap: 16px） ────────────────────────────────

function CardFooter({ onEdit, onView }: Pick<CardProps, "onEdit" | "onView">) {
  return (
    <div className="flex items-center justify-end p-6 gap-4 border-t border-[rgba(13,5,44,0.06)]">
      <CardActions onEdit={onEdit} onView={onView} />
    </div>
  );
}

// ─── Variants ─────────────────────────────────────────────────────────────────

function CardLeftInfoRightImg({ title, author, subtitle, date, imageSrc, onEdit, onView }: CardProps) {
  return (
    // Figma: HORIZONTAL, 1068×276px 設計稿；實際 365×340px Dashboard Grid
    <div className="flex flex-row h-full">
      {/* Info 區 */}
      <div className="flex flex-col flex-1 justify-between min-w-0">
        <div className="p-6">
          <CardMeta title={title} author={author} subtitle={subtitle} date={date} />
        </div>
        <CardFooter onEdit={onEdit} onView={onView} />
      </div>
      {/* IMG 區 */}
      {imageSrc && (
        <div className="w-[40%] shrink-0 p-2">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover rounded-[6px]"
          />
        </div>
      )}
    </div>
  );
}

function CardInfo({ title, author, subtitle, date, onEdit, onView }: CardProps) {
  // Figma: HORIZONTAL, 1068×200px
  return (
    <div className="flex flex-row h-full items-stretch">
      <div className="flex flex-col flex-1 justify-between min-w-0">
        <div className="p-6">
          <CardMeta title={title} author={author} subtitle={subtitle} date={date} />
        </div>
        <CardFooter onEdit={onEdit} onView={onView} />
      </div>
    </div>
  );
}

function CardTopImgDownInfo({ title, author, subtitle, date, imageSrc, onEdit, onView }: CardProps) {
  // Figma: VERTICAL, 534×424px
  return (
    <div className="flex flex-col h-full">
      {/* IMG 區 */}
      <div className="flex-1 p-2">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover rounded-[6px]"
          />
        ) : (
          <div className="w-full h-full rounded-[6px] bg-[rgba(117,34,224,0.06)] flex items-center justify-center">
            <span className="text-[12px] text-[#91989e] font-[Urbanist]">Image</span>
          </div>
        )}
      </div>
      {/* Info 區 */}
      <div className="flex flex-col">
        <div className="px-6 pt-4">
          <CardMeta title={title} author={author} subtitle={subtitle} date={date} />
        </div>
        <CardFooter onEdit={onEdit} onView={onView} />
      </div>
    </div>
  );
}

function CardBlank({ children }: CardProps) {
  // Figma: VERTICAL, 1068×240px
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 gap-3">
      {children ?? (
        <>
          <div className="w-10 h-10 rounded-full bg-[rgba(117,34,224,0.08)] flex items-center justify-center">
            <span className="text-[#7522e0] text-xl font-light">+</span>
          </div>
          <p className="font-[Urbanist] text-[14px] font-semibold text-[#30363a]">
            New Workspace
          </p>
        </>
      )}
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
  className,
}: CardProps) {
  const content = {
    "Left Info. Right IMG": (
      <CardLeftInfoRightImg title={title} author={author} subtitle={subtitle} date={date} imageSrc={imageSrc} onEdit={onEdit} onView={onView} />
    ),
    Info: (
      <CardInfo title={title} author={author} subtitle={subtitle} date={date} onEdit={onEdit} onView={onView} />
    ),
    "Top IMG. Down Info": (
      <CardTopImgDownInfo title={title} author={author} subtitle={subtitle} date={date} imageSrc={imageSrc} onEdit={onEdit} onView={onView} />
    ),
    Blank: <CardBlank>{children}</CardBlank>,
  }[variant];

  return (
    <div
      className={cn("relative group rounded-[8px] overflow-hidden", className)}
      style={glassPanelStyle}
    >
      {/* Glass 內層：折射質感（對應 Figma GLASS effect，CSS 近似） */}
      <div style={glassInnerStyle} aria-hidden="true" />
      {content}
    </div>
  );
}

export default Card;
