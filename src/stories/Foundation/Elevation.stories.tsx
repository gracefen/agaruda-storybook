import type { Meta, StoryObj } from "@storybook/react";

// ─── Glass Spec ───────────────────────────────────────────────────────────────

const glassStyle: React.CSSProperties = {
  background: "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.5))",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "1px solid rgba(13,5,44,0.1)",
  boxShadow:
    "0px 5px 5px rgba(36,18,66,0.05), 0px 2px 2px rgba(36,18,66,0.04), 0px 1px 0px rgba(36,18,66,0.03)",
  borderRadius: 8,
};

// ─── Radius tokens ────────────────────────────────────────────────────────────

const radiusTokens = [
  { token: "radius-l", px: "8px",     usage: "容器（Card、Sidebar、Search Bar）" },
  { token: "radius-m", px: "6px",     usage: "Card 內縮圖" },
  { token: "—",        px: "9999px",  usage: "Pill（Tag、Badge）" },
];

// ─── Dark Mode surfaces ───────────────────────────────────────────────────────

const darkSurfaces = [
  { level: "Level 0", value: "#0A0F12", label: "最深底層" },
  { level: "Level 1", value: "#171D1F", label: "Primary Surface（基準面）" },
  { level: "Level 2", value: "#181C20", label: "" },
  { level: "Level 3", value: "#1C2024", label: "" },
  { level: "Level 4", value: "#262A2F", label: "" },
  { level: "Level 5", value: "#31353A", label: "最淺層（最高 Elevation）" },
];

// ─── Story Component ──────────────────────────────────────────────────────────

function ElevationPage() {
  return (
    <div className="font-[Urbanist] p-8 max-w-3xl">
      <h1 className="text-[40px] font-semibold leading-[60px] text-[#171d1f] mb-2">
        Elevation
      </h1>
      <p className="text-[16px] leading-[20px] text-[#30363a] mb-10">
        Cinta 使用 <strong>Glassmorphism</strong> 作為容器的視覺識別。
        三層 shadow 數值為核心規範，不可自行調整。
      </p>

      {/* Glass demo */}
      <section className="mb-10">
        <h2 className="text-[16px] font-semibold leading-[20px] text-[#91989e] uppercase tracking-widest mb-4">
          Glass Effect
        </h2>
        <div style={glassStyle} className="p-6 mb-4">
          <p className="text-[14px] font-semibold text-[#171d1f] mb-1">Glass Container</p>
          <p className="text-[12px] text-[#30363a]">
            Card、Sidebar、Search Bar 均套用此效果。
            需要頁面背景有顏色（utility-purple-950）才能顯示。
          </p>
        </div>

        {/* Spec breakdown */}
        <div
          className="rounded-[8px] px-5"
          style={{ ...glassStyle, borderRadius: 8 }}
        >
          {[
            {
              label: "Background",
              value: "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.5))",
            },
            {
              label: "Backdrop Filter",
              value: "blur(10px)  ·  需加 -webkit- 前綴",
            },
            {
              label: "Border",
              value: "1px solid rgba(13,5,44,0.1)  [utility-purple-a10]",
            },
            {
              label: "Shadow — Layer 1",
              value: "0px 5px 5px rgba(36,18,66,0.05)",
            },
            {
              label: "Shadow — Layer 2",
              value: "0px 2px 2px rgba(36,18,66,0.04)",
            },
            {
              label: "Shadow — Layer 3",
              value: "0px 1px 0px rgba(36,18,66,0.03)",
            },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-start gap-4 py-3 border-b border-[rgba(13,5,44,0.06)] last:border-0"
            >
              <span className="text-[13px] font-semibold text-[#7522e0] w-36 shrink-0">
                {row.label}
              </span>
              <span className="font-mono text-[12px] text-[#30363a] break-all">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Border radius */}
      <section className="mb-10">
        <h2 className="text-[16px] font-semibold leading-[20px] text-[#91989e] uppercase tracking-widest mb-4">
          Border Radius Tokens
        </h2>
        <div style={glassStyle} className="px-5">
          {radiusTokens.map((r) => (
            <div
              key={r.token + r.px}
              className="flex items-center gap-4 py-3 border-b border-[rgba(13,5,44,0.06)] last:border-0"
            >
              <div
                className="w-12 h-12 bg-[rgba(117,34,224,0.12)] shrink-0 border border-[rgba(13,5,44,0.1)]"
                style={{ borderRadius: r.px === "9999px" ? 9999 : parseInt(r.px) }}
              />
              <div>
                <p className="text-[13px] font-semibold text-[#7522e0]">{r.token}</p>
                <p className="font-mono text-[12px] text-[#91989e]">{r.px}</p>
                <p className="text-[12px] text-[#30363a]">{r.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dark mode surfaces */}
      <section>
        <h2 className="text-[16px] font-semibold leading-[20px] text-[#91989e] uppercase tracking-widest mb-4">
          Dark Mode — Surface Elevation
        </h2>
        <p className="text-[13px] text-[#30363a] mb-4">
          Seed Color：#8333F4 · Base：#171D1F · Material Design 3 Tonal Elevation 系統
        </p>
        <div className="rounded-[8px] overflow-hidden border border-[rgba(255,255,255,0.1)]">
          {darkSurfaces.map((s) => (
            <div
              key={s.level}
              className="flex items-center gap-4 px-5 py-3"
              style={{ backgroundColor: s.value }}
            >
              <div
                className="w-8 h-8 rounded-md shrink-0 border border-white/10"
                style={{ backgroundColor: s.value }}
              />
              <div>
                <p className="text-[13px] font-semibold text-white/80">{s.level}</p>
                <p className="font-mono text-[11px] text-white/50">{s.value}</p>
              </div>
              {s.label && (
                <p className="ml-auto text-[11px] text-white/50 text-right">{s.label}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Agaruda DS/Foundation/Elevation",
  component: ElevationPage,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "agaruda-purple" },
    docs: {
      description: {
        component:
          "Cinta Design System 的 Glass 視覺效果與 Elevation 規範。三層 shadow 數值為核心識別，不可調整。",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Glass & Elevation",
};
