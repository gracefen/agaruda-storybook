import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
// Figma: ↳ Card · Data section
// Variants:
//   Data-Overview  — 380×168px
//   Data-Pie-Chart — 380×340px
//   Data-Bar-Chart — 560×414px

export type DataCardVariant = "Overview" | "Pie-Chart" | "Bar-Chart";

// ─── Shared data types ────────────────────────────────────────────────────────

export interface DataStat {
  label: string;
  value: string | number;
  /** 選填：標示正負趨勢 */
  trend?: "up" | "down" | "neutral";
}

export interface PieSegment {
  label: string;
  value: number; // 0–100（百分比）
  color: string;
}

export interface BarItem {
  label: string;
  value: number;
  maxValue?: number;
}

export interface DataCardProps {
  variant?: DataCardVariant;
  title?: string;
  // Overview
  stats?: DataStat[];
  // Pie-Chart
  segments?: PieSegment[];
  // Bar-Chart
  bars?: BarItem[];
  barUnit?: string;
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

// ─── Card Section Header ──────────────────────────────────────────────────────

function CardHeader({ title }: { title: string }) {
  return (
    <div className="px-6 pt-5 pb-4 border-b border-[rgba(13,5,44,0.06)]">
      {/* title: size-s, SemiBold 600 */}
      <h4 className="font-[Urbanist] text-[14px] font-semibold leading-[20px] text-[#171d1f]">
        {title}
      </h4>
    </div>
  );
}

// ─── Data-Overview ────────────────────────────────────────────────────────────
// 380×168px：4 個指標橫排，帶趨勢箭頭

const trendColor = { up: "#22c55e", down: "#ef4444", neutral: "#91989e" };
const trendArrow = { up: "↑", down: "↓", neutral: "—" };

function TrendBadge({ trend }: { trend: "up" | "down" | "neutral" }) {
  return (
    <span
      className="font-[Urbanist] text-[12px] font-semibold leading-[16px]"
      style={{ color: trendColor[trend] }}
    >
      {trendArrow[trend]}
    </span>
  );
}

const defaultStats: DataStat[] = [
  { label: "Workspaces", value: 24, trend: "up" },
  { label: "Active Users", value: 18, trend: "up" },
  { label: "Projects", value: 142, trend: "neutral" },
  { label: "Completed", value: "89%", trend: "up" },
];

function DataOverview({ title = "Overview", stats = defaultStats }: DataCardProps) {
  return (
    <div className="flex flex-col h-full">
      <CardHeader title={title} />
      <div className="flex-1 flex flex-row items-center px-6 gap-0">
        {stats.map((stat, i) => (
          <div key={i} className="contents">
            {i > 0 && (
              <div className="w-px self-stretch mx-4 my-4 bg-[rgba(13,5,44,0.08)]" />
            )}
            <div className="flex flex-col gap-1 flex-1">
              {/* value: size-2xl, Bold 700 */}
              <div className="flex items-baseline gap-1">
                <span className="font-[Urbanist] text-[24px] font-bold leading-[40px] text-[#171d1f]">
                  {stat.value}
                </span>
                {stat.trend && <TrendBadge trend={stat.trend} />}
              </div>
              {/* label: size-xs, Regular 400 */}
              <span className="font-[Urbanist] text-[12px] font-normal leading-[16px] text-[#91989e]">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Data-Pie-Chart ───────────────────────────────────────────────────────────
// 380×340px：SVG Donut Chart + 圖例

const defaultSegments: PieSegment[] = [
  { label: "Design", value: 60, color: "#8333f4" },
  { label: "Development", value: 25, color: "#ab87fe" },
  { label: "Research", value: 15, color: "#ded4ff" },
];

function DonutChart({ segments }: { segments: PieSegment[] }) {
  const r = 60;
  const cx = 80;
  const cy = 80;
  const circumference = 2 * Math.PI * r;

  let cumulativePercent = 0;

  return (
    <svg width={160} height={160} viewBox="0 0 160 160">
      {/* 底圈 */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="rgba(13,5,44,0.06)"
        strokeWidth={18}
      />
      {segments.map((seg, i) => {
        const dashLen = (seg.value / 100) * circumference;
        const dashOffset = -cumulativePercent * circumference / 100 + circumference / 4;
        cumulativePercent += seg.value;
        return (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={18}
            strokeDasharray={`${dashLen} ${circumference}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="butt"
            style={{ transition: "stroke-dasharray 0.4s ease" }}
          />
        );
      })}
      {/* 中央總計標籤 */}
      <text
        x={cx} y={cy - 6}
        textAnchor="middle"
        fontFamily="Urbanist, sans-serif"
        fontSize="22"
        fontWeight="700"
        fill="#171d1f"
      >
        {segments.reduce((s, seg) => s + seg.value, 0)}%
      </text>
      <text
        x={cx} y={cy + 14}
        textAnchor="middle"
        fontFamily="Urbanist, sans-serif"
        fontSize="11"
        fill="#91989e"
      >
        Total
      </text>
    </svg>
  );
}

function PieLegend({ segments }: { segments: PieSegment[] }) {
  return (
    <div className="flex flex-col gap-2">
      {segments.map((seg, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: seg.color }} />
          <span className="font-[Urbanist] text-[12px] font-normal leading-[16px] text-[#30363a] flex-1">
            {seg.label}
          </span>
          <span className="font-[Urbanist] text-[12px] font-semibold leading-[16px] text-[#171d1f]">
            {seg.value}%
          </span>
        </div>
      ))}
    </div>
  );
}

function DataPieChart({ title = "Distribution", segments = defaultSegments }: DataCardProps) {
  return (
    <div className="flex flex-col h-full">
      <CardHeader title={title} />
      <div className="flex-1 flex flex-row items-center justify-between px-6 py-4 gap-4">
        <DonutChart segments={segments} />
        <div className="flex-1">
          <PieLegend segments={segments} />
        </div>
      </div>
    </div>
  );
}

// ─── Data-Bar-Chart ───────────────────────────────────────────────────────────
// 560×414px：水平 Bar Chart

const defaultBars: BarItem[] = [
  { label: "Jan", value: 42 },
  { label: "Feb", value: 58 },
  { label: "Mar", value: 75 },
  { label: "Apr", value: 61 },
  { label: "May", value: 88 },
  { label: "Jun", value: 96 },
];

function HorizontalBarChart({
  bars,
  unit = "",
}: {
  bars: BarItem[];
  unit?: string;
}) {
  const maxVal = Math.max(...bars.map((b) => b.maxValue ?? b.value), 100);

  return (
    <div className="flex flex-col gap-3 w-full">
      {bars.map((bar, i) => {
        const pct = (bar.value / maxVal) * 100;
        return (
          <div key={i} className="flex items-center gap-3">
            {/* Label */}
            <span className="font-[Urbanist] text-[12px] font-normal leading-[16px] text-[#91989e] w-8 shrink-0 text-right">
              {bar.label}
            </span>
            {/* Track */}
            <div className="flex-1 h-4 rounded-full bg-[rgba(13,5,44,0.06)] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${pct}%`,
                  background: "linear-gradient(to right, #8333f4, #ab87fe)",
                }}
              />
            </div>
            {/* Value */}
            <span className="font-[Urbanist] text-[12px] font-semibold leading-[16px] text-[#171d1f] w-10 shrink-0">
              {bar.value}{unit}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function DataBarChart({
  title = "Monthly Activity",
  bars = defaultBars,
  barUnit,
}: DataCardProps) {
  return (
    <div className="flex flex-col h-full">
      <CardHeader title={title} />
      <div className="flex-1 flex flex-col justify-center px-6 py-5">
        <HorizontalBarChart bars={bars} unit={barUnit} />
      </div>
    </div>
  );
}

// ─── DataCard Component ───────────────────────────────────────────────────────

export function DataCard({
  variant = "Overview",
  title,
  stats,
  segments,
  bars,
  barUnit,
  className,
}: DataCardProps) {
  const content = {
    Overview: <DataOverview title={title} stats={stats} />,
    "Pie-Chart": <DataPieChart title={title} segments={segments} />,
    "Bar-Chart": <DataBarChart title={title} bars={bars} barUnit={barUnit} />,
  }[variant];

  return (
    <div
      className={cn("relative rounded-[8px] overflow-hidden", className)}
      style={glassPanelStyle}
    >
      {/* Glass 內層（cinta-glass.md 兩層結構） */}
      <div style={glassInnerStyle} aria-hidden="true" />
      <div className="relative h-full">{content}</div>
    </div>
  );
}

export default DataCard;
