import type { Meta, StoryObj } from "@storybook/react";

// ─── Color Token Data ─────────────────────────────────────────────────────────

const colorGroups = [
  {
    group: "Brand — Purple Scale",
    tokens: [
      { name: "utility-purple-50",  value: "#e6e4ed", usage: "最淺紫（= 舊 utility-purple-950 誤植值）" },
      { name: "utility-purple-100", value: "#ded4ff", usage: "" },
      { name: "utility-purple-200", value: "#c6b2ff", usage: "" },
      { name: "utility-purple-300", value: "#ab87fe", usage: "Primary Button 漸層頂端" },
      { name: "utility-purple-400", value: "#a473f9", usage: "Primary Button 漸層中段" },
      { name: "utility-purple-500", value: "#8333f4", usage: "Primary Button 漸層起點（主品牌色）" },
      { name: "utility-purple-600", value: "#7522e0", usage: "Primary Button 漸層終點" },
      { name: "utility-purple-700", value: "#52189d", usage: "" },
      { name: "utility-purple-800", value: "#3b1170", usage: "" },
      { name: "utility-purple-900", value: "#230e4d", usage: "" },
      { name: "utility-purple-950", value: "#0d052c", usage: "整體頁面背景色（Glass 效果必要條件）" },
    ],
  },
  {
    group: "Brand — Alpha",
    tokens: [
      { name: "utility-purple-a10", value: "rgba(13,5,44,0.1)",  usage: "邊框、Active 背景、Tab Selected" },
      { name: "utility-purple-a20", value: "rgba(13,5,44,0.2)",  usage: "Scrollbar Thumb" },
    ],
  },
  {
    group: "Text",
    tokens: [
      { name: "text-title",      value: "#171d1f", usage: "主標題、Card 標題、Button 文字" },
      { name: "text-secondary",  value: "#30363a", usage: "Sidebar label、Breadcrumb、Placeholder" },
      { name: "utility-grey-300",value: "#91989e", usage: "Card ID subtitle（次要說明文字）" },
      { name: "text-on-color",   value: "#f1f1f3", usage: "有色背景上的文字（Primary Button）" },
    ],
  },
  {
    group: "Surface",
    tokens: [
      { name: "bg-primary",          value: "#f9fafb",                  usage: "Secondary Button 背景" },
      { name: "overlay-inverse-60",  value: "rgba(250,252,252,0.6)",    usage: "Glass 漸層起點（Card、Sidebar）" },
      { name: "overlay-inverse-50",  value: "rgba(250,252,252,0.5)",    usage: "Glass 漸層終點" },
    ],
  },
  {
    group: "Overlay — Main（深紫遮罩）",
    tokens: [
      { name: "overlay-main-10", value: "rgba(13,5,44,0.1)",  usage: "" },
      { name: "overlay-main-20", value: "rgba(13,5,44,0.2)",  usage: "" },
      { name: "overlay-main-30", value: "rgba(13,5,44,0.3)",  usage: "Dialog Overlay" },
      { name: "overlay-main-40", value: "rgba(13,5,44,0.4)",  usage: "" },
      { name: "overlay-main-50", value: "rgba(13,5,44,0.5)",  usage: "" },
      { name: "overlay-main-60", value: "rgba(13,5,44,0.6)",  usage: "" },
      { name: "overlay-main-70", value: "rgba(13,5,44,0.7)",  usage: "" },
      { name: "overlay-main-80", value: "rgba(13,5,44,0.8)",  usage: "" },
      { name: "overlay-main-90", value: "rgba(13,5,44,0.9)",  usage: "" },
    ],
  },
  {
    group: "Overlay — Inverse（淺色遮罩）",
    tokens: [
      { name: "overlay-inverse-10", value: "rgba(250,252,252,0.1)", usage: "" },
      { name: "overlay-inverse-20", value: "rgba(250,252,252,0.2)", usage: "" },
      { name: "overlay-inverse-30", value: "rgba(250,252,252,0.3)", usage: "" },
      { name: "overlay-inverse-40", value: "rgba(250,252,252,0.4)", usage: "" },
      { name: "overlay-inverse-50", value: "rgba(250,252,252,0.5)", usage: "Glass 漸層終點" },
      { name: "overlay-inverse-60", value: "rgba(250,252,252,0.6)", usage: "Glass 漸層起點、Search Bar、Tabs" },
      { name: "overlay-inverse-70", value: "rgba(250,252,252,0.7)", usage: "" },
      { name: "overlay-inverse-80", value: "rgba(250,252,252,0.8)", usage: "" },
      { name: "overlay-inverse-90", value: "rgba(250,252,252,0.9)", usage: "" },
    ],
  },
  {
    group: "Dark Mode — Surface Elevation",
    tokens: [
      { name: "elevation-0", value: "#0A0F12", usage: "最深底層" },
      { name: "elevation-1", value: "#171D1F", usage: "Primary Surface（基準面）" },
      { name: "elevation-2", value: "#181C20", usage: "Level 2" },
      { name: "elevation-3", value: "#1C2024", usage: "Level 3" },
      { name: "elevation-4", value: "#262A2F", usage: "Level 4" },
      { name: "elevation-5", value: "#31353A", usage: "最淺層（最高 Elevation）" },
    ],
  },
  {
    group: "Dark Mode — Text",
    tokens: [
      { name: "color/text/text-primary",   value: "#232c2f", usage: "主要文字" },
      { name: "color/text/text-secondary",  value: "#30363a", usage: "次要文字" },
      { name: "color/text/text-tertiary",   value: "#adafb2", usage: "輔助說明文字" },
    ],
  },
];

// ─── Glass wrapper styles（cinta-glass.md，兩層結構）────────────────────────

const glassPanelStyle: React.CSSProperties = {
  background: "linear-gradient(to bottom, rgba(250,252,252,0.6), rgba(250,252,252,0.5))",
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

// ─── Swatch Component ─────────────────────────────────────────────────────────

function ColorSwatch({ name, value, usage }: { name: string; value: string; usage: string }) {
  const isTransparent =
    value.startsWith("rgba") && parseFloat(value.split(",")[3]) < 0.5;

  return (
    <div className="flex items-center gap-4 py-3 border-b border-[rgba(13,5,44,0.06)] last:border-0">
      <div
        className="w-14 h-14 rounded-lg shrink-0 border border-[rgba(13,5,44,0.1)]"
        style={{
          background: value,
          backgroundImage: isTransparent
            ? `linear-gradient(45deg, #ccc 25%, transparent 25%),
               linear-gradient(-45deg, #ccc 25%, transparent 25%),
               linear-gradient(45deg, transparent 75%, #ccc 75%),
               linear-gradient(-45deg, transparent 75%, #ccc 75%)`
            : undefined,
          backgroundSize: isTransparent ? "8px 8px" : undefined,
          backgroundPosition: isTransparent
            ? "0 0, 0 4px, 4px -4px, -4px 0px"
            : undefined,
        }}
      />
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="font-[Urbanist] text-[14px] font-semibold leading-[20px] text-[#171d1f]">
          {name}
        </span>
        <span className="font-mono text-[12px] leading-[16px] text-[#91989e]">
          {value}
        </span>
        {usage && (
          <span className="font-[Urbanist] text-[12px] leading-[16px] text-[#30363a]">
            {usage}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Story Component ──────────────────────────────────────────────────────────

function ColorsPage() {
  return (
    <div className="font-[Urbanist] p-8 max-w-3xl">
      <h1 className="text-[40px] font-semibold leading-[60px] text-[#171d1f] mb-2">
        Color Tokens
      </h1>
      <p className="text-[16px] leading-[20px] text-[#30363a] mb-10">
        Cinta Design System 顏色規範。所有顏色均使用 Token 名稱，禁止直接寫 hex 值。
      </p>

      {colorGroups.map((group) => (
        <section key={group.group} className="mb-10">
          <h2 className="text-[16px] font-semibold leading-[20px] text-[#91989e] uppercase tracking-widest mb-4">
            {group.group}
          </h2>
          <div
            className="relative rounded-[8px] px-5 overflow-hidden"
            style={glassPanelStyle}
          >
            <div style={glassInnerStyle} aria-hidden="true" />
            {group.tokens.map((token) => (
              <ColorSwatch key={token.name} {...token} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Foundation/Color",
  component: ColorsPage,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "agaruda-purple" },
    docs: {
      description: {
        component: "Cinta Design System 完整色彩 Token 規範。",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Color Tokens",
};
