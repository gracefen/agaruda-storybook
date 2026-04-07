import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
// Figma: ↳ Card · Library Assets section · Asset-Performance-Information
// Size: 214×116px（設計稿）

export interface AssetPerformanceStat {
  label: string;
  value: string | number;
}

export interface AssetPerformanceInfoProps {
  stats?: AssetPerformanceStat[];
  className?: string;
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

// ─── Stat Item ────────────────────────────────────────────────────────────────

function StatItem({ label, value }: AssetPerformanceStat) {
  return (
    <div className="flex flex-col items-center gap-0.5 flex-1">
      {/* value: size-m, Bold 700 */}
      <span className="font-[Urbanist] text-[16px] font-bold leading-[20px] text-[#171d1f]">
        {value}
      </span>
      {/* label: size-xs, Regular 400 */}
      <span className="font-[Urbanist] text-[12px] font-normal leading-[16px] text-[#91989e]">
        {label}
      </span>
    </div>
  );
}

// ─── AssetPerformanceInfo Component ──────────────────────────────────────────

const defaultStats: AssetPerformanceStat[] = [
  { label: "Views", value: "1.2K" },
  { label: "Downloads", value: 86 },
  { label: "Rating", value: "4.8" },
];

export function AssetPerformanceInfo({
  stats = defaultStats,
  className,
}: AssetPerformanceInfoProps) {
  return (
    <div
      className={cn("relative rounded-[8px] overflow-hidden", className)}
      style={glassPanelStyle}
    >
      {/* Glass 內層（cinta-glass.md 兩層結構） */}
      <div style={glassInnerStyle} aria-hidden="true" />

      <div className="relative flex flex-row items-center h-full px-4 py-3 gap-0">
        {stats.map((stat, i) => (
          <div key={i} className="contents">
            {i > 0 && (
              <div className="w-px self-stretch mx-1 bg-[rgba(13,5,44,0.08)]" />
            )}
            <StatItem label={stat.label} value={stat.value} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AssetPerformanceInfo;
