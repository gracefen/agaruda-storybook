import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
// Figma: ↳ Table · COMPONENT_SETs:
//   Table Base/Cell, Table-Base/Header, Table Cell,
//   Table-Base/Pagination, Table-Base/List-Header

export type SortDirection = "asc" | "desc" | "none";

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string | number;
  render?: (value: unknown, row: T) => ReactNode;
}

export interface TableProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  sortKey?: string;
  sortDirection?: SortDirection;
  onSort?: (key: string) => void;
  /** Pagination */
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  /** Caption / title */
  caption?: string;
  className?: string;
}

// ─── Sort Icon ────────────────────────────────────────────────────────────────

function SortIcon({ direction }: { direction: SortDirection }) {
  if (direction === "asc")  return <ChevronUp size={14} className="text-[#7522e0]" />;
  if (direction === "desc") return <ChevronDown size={14} className="text-[#7522e0]" />;
  return <ChevronsUpDown size={14} className="text-[#91989e]" />;
}

// ─── Pagination ───────────────────────────────────────────────────────────────

function Pagination({
  page = 1,
  totalPages = 1,
  onPageChange,
}: Pick<TableProps, "page" | "totalPages" | "onPageChange">) {
  return (
    // Figma: Table-Base/Pagination [1040×128]
    <div className="flex items-center justify-between px-4 py-3 border-t border-[rgba(13,5,44,0.08)]">
      <span className="font-[Urbanist] text-[12px] text-[#91989e]">
        Page {page} of {totalPages}
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange?.(page - 1)}
          disabled={page <= 1}
          className="inline-flex items-center justify-center w-8 h-8 rounded-[6px]
            font-[Urbanist] text-[12px] text-[#30363a]
            border border-[rgba(13,5,44,0.1)] bg-[rgba(250,252,252,0.6)]
            hover:bg-[rgba(13,5,44,0.04)] disabled:opacity-40 disabled:cursor-not-allowed
            transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft size={14} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => onPageChange?.(p)}
            className={cn(
              "inline-flex items-center justify-center w-8 h-8 rounded-[6px]",
              "font-[Urbanist] text-[12px] transition-colors",
              p === page
                ? "bg-[#7522e0] text-[#f1f1f3] border border-[#7522e0]"
                : "text-[#30363a] border border-[rgba(13,5,44,0.1)] bg-[rgba(250,252,252,0.6)] hover:bg-[rgba(13,5,44,0.04)]"
            )}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => onPageChange?.(page + 1)}
          disabled={page >= totalPages}
          className="inline-flex items-center justify-center w-8 h-8 rounded-[6px]
            font-[Urbanist] text-[12px] text-[#30363a]
            border border-[rgba(13,5,44,0.1)] bg-[rgba(250,252,252,0.6)]
            hover:bg-[rgba(13,5,44,0.04)] disabled:opacity-40 disabled:cursor-not-allowed
            transition-colors"
          aria-label="Next page"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
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

// ─── Table Component ──────────────────────────────────────────────────────────

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  sortKey,
  sortDirection = "none",
  onSort,
  page,
  totalPages,
  onPageChange,
  caption,
  className,
}: TableProps<T>) {
  return (
    <div
      className={cn("relative rounded-[8px] overflow-hidden w-full", className)}
      style={glassPanelStyle}
    >
      <div style={glassInnerStyle} aria-hidden="true" />
      {caption && (
        // Figma: Table-Base-Caption [700×52]
        <div className="px-4 py-3 border-b border-[rgba(13,5,44,0.08)]">
          <p className="font-[Urbanist] text-[16px] font-bold leading-[20px] text-[#171d1f]">
            {caption}
          </p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Header — Figma: Table-Base/Header [348×403] */}
          <thead>
            <tr className="border-b border-[rgba(13,5,44,0.08)]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-4 py-3 text-left",
                    "font-[Urbanist] text-[12px] font-semibold leading-[16px] text-[#91989e] uppercase tracking-wider",
                    col.sortable ? "cursor-pointer select-none hover:text-[#171d1f] transition-colors" : ""
                  )}
                  style={col.width ? { width: col.width } : undefined}
                  onClick={() => col.sortable && onSort?.(col.key)}
                >
                  <div className="flex items-center gap-1">
                    <span>{col.header}</span>
                    {col.sortable && (
                      <SortIcon direction={sortKey === col.key ? sortDirection : "none"} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body — Figma: Table Base/Cell, Table Cell */}
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center font-[Urbanist] text-[14px] text-[#91989e]"
                >
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="border-b border-[rgba(13,5,44,0.06)] last:border-0 hover:bg-[rgba(13,5,44,0.02)] transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-4 py-3 font-[Urbanist] text-[14px] leading-[20px] text-[#171d1f]"
                    >
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key] ?? "—")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages && totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </div>
  );
}

export default Table;
