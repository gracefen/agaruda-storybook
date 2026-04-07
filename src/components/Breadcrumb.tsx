import { cn } from "@/lib/utils";
import { ChevronRight, ChevronDown, Ellipsis } from "lucide-react";
import type { ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type BreadcrumbItemType = "Default" | "Active-Hover" | "Dropdown" | "Ellipsis";

export interface BreadcrumbItem {
  label?: string;
  type?: BreadcrumbItemType;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

// ─── BreadcrumbItem Component ─────────────────────────────────────────────────

// Figma: Type=Default 79×20px, Active-Hover 81×20px, Dropdown 101×20px, Ellipsis 24×24px
// Font: Geist 14px Regular 400, line-height 20px
// Separator: chevron-right 16×16px

function BreadcrumbItemNode({
  label = "Breadcrumb",
  type = "Default",
  href,
  onClick,
}: BreadcrumbItem) {
  const baseClass =
    "inline-flex items-center gap-1 font-[Geist,'Geist',sans-serif] text-[14px] leading-[20px] select-none transition-colors";

  if (type === "Ellipsis") {
    return (
      <span
        className={cn(
          baseClass,
          "w-6 h-6 justify-center text-[#91989e] hover:text-[#30363a] cursor-pointer"
        )}
        onClick={onClick}
        role="button"
        aria-label="More items"
      >
        <Ellipsis size={16} />
      </span>
    );
  }

  const isActive = type === "Active-Hover";
  const isDropdown = type === "Dropdown";

  const textClass = isActive
    ? "text-[#171d1f] font-medium cursor-default"
    : "text-[#30363a] hover:text-[#171d1f] cursor-pointer";

  const content: ReactNode = (
    <>
      <span>{label}</span>
      {isDropdown && <ChevronDown size={16} className="shrink-0" />}
    </>
  );

  if (href && !isActive) {
    return (
      <a href={href} className={cn(baseClass, textClass)}>
        {content}
      </a>
    );
  }

  return (
    <span
      className={cn(baseClass, textClass)}
      onClick={!isActive ? onClick : undefined}
      role={!isActive ? "button" : undefined}
    >
      {content}
    </span>
  );
}

// ─── Breadcrumb Component ─────────────────────────────────────────────────────

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)}>
      <ol className="flex items-center gap-0">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <BreadcrumbItemNode {...item} />
            {index < items.length - 1 && (
              <ChevronRight
                size={16}
                className="mx-1 text-[#91989e] shrink-0"
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
