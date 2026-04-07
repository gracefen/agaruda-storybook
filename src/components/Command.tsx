import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import type { ReactNode, KeyboardEvent } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
// Figma: ↳ Command（頁面為空，依 Cinta 設計語言實作）
// 功能：搜尋 + 鍵盤導覽的 Command Palette

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  group?: string;
  onSelect?: () => void;
}

export interface CommandProps {
  items: CommandItem[];
  placeholder?: string;
  emptyText?: string;
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

export function Command({
  items,
  placeholder = "Search...",
  emptyText = "No results found.",
  className,
}: CommandProps) {
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        i.description?.toLowerCase().includes(q) ||
        i.group?.toLowerCase().includes(q)
    );
  }, [items, query]);

  // Group items
  const groups = useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    for (const item of filtered) {
      const g = item.group ?? "";
      if (!map.has(g)) map.set(g, []);
      map.get(g)!.push(item);
    }
    return map;
  }, [filtered]);

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      filtered[activeIdx]?.onSelect?.();
    }
  };

  let flatIdx = 0;

  return (
    <div
      className={cn("relative w-full rounded-[8px] overflow-hidden", className)}
      style={glassPanelStyle}
      onKeyDown={handleKey}
    >
      <div style={glassInnerStyle} aria-hidden="true" />
      {/* Search Input */}
      <div className="flex items-center gap-2 px-3 py-3 border-b border-[rgba(13,5,44,0.08)]">
        <Search size={16} className="text-[#91989e] shrink-0" />
        <input
          autoFocus
          value={query}
          onChange={(e) => { setQuery(e.target.value); setActiveIdx(0); }}
          placeholder={placeholder}
          className="flex-1 bg-transparent font-[Urbanist] text-[14px] leading-[20px] text-[#171d1f] placeholder:text-[#91989e] outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="text-[#91989e] hover:text-[#30363a] text-[12px] font-[Urbanist]"
          >
            ✕
          </button>
        )}
      </div>

      {/* Results */}
      <div className="max-h-64 overflow-y-auto py-1">
        {filtered.length === 0 ? (
          <p className="px-4 py-6 text-center font-[Urbanist] text-[14px] text-[#91989e]">
            {emptyText}
          </p>
        ) : (
          Array.from(groups.entries()).map(([group, groupItems]) => (
            <div key={group}>
              {group && (
                <p className="px-3 pt-2 pb-1 font-[Urbanist] text-[12px] font-semibold leading-[16px] text-[#91989e] uppercase tracking-wider">
                  {group}
                </p>
              )}
              {groupItems.map((item) => {
                const idx = flatIdx++;
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={item.id}
                    onClick={item.onSelect}
                    onMouseEnter={() => setActiveIdx(idx)}
                    className={cn(
                      "w-full flex items-start gap-3 px-3 py-2 text-left transition-colors",
                      isActive ? "bg-[rgba(13,5,44,0.06)]" : "hover:bg-[rgba(13,5,44,0.03)]"
                    )}
                  >
                    {item.icon && (
                      <span className="shrink-0 mt-0.5 text-[#91989e] [&>svg]:size-4">
                        {item.icon}
                      </span>
                    )}
                    <div className="flex flex-col gap-0 min-w-0">
                      <span className="font-[Urbanist] text-[14px] font-semibold leading-[20px] text-[#171d1f] truncate">
                        {item.label}
                      </span>
                      {item.description && (
                        <span className="font-[Urbanist] text-[12px] leading-[16px] text-[#91989e] truncate">
                          {item.description}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Command;
