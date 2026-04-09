import type { Meta, StoryObj } from "@storybook/react";

// ─── Token data ───────────────────────────────────────────────────────────────

const paddingTokens = [
  { token: "space-xs",  px: 8,  usage: "Sidebar Section padding top / bottom" },
  { token: "space-m",   px: 16, usage: "Sidebar Section padding left / right" },
  { token: "space-xl",  px: 24, usage: "Sidebar Header padding" },
  { token: "space-2xl", px: 32, usage: "Content Area padding（四邊）" },
  { token: "space-3xl", px: 40, usage: "（保留）" },
];

const maxPx = Math.max(...paddingTokens.map((t) => t.px));

const glassStyle: React.CSSProperties = {
  background: "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.5))",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "1px solid rgba(13,5,44,0.1)",
  boxShadow: "0px 5px 5px rgba(36,18,66,0.05), 0px 2px 2px rgba(36,18,66,0.04), 0px 1px 0px rgba(36,18,66,0.03)",
  borderRadius: 8,
};

// ─── Page component ───────────────────────────────────────────────────────────

function PaddingPage() {
  return (
    <div className="font-[Urbanist] p-8 max-w-3xl">
      <h1 className="text-[40px] font-semibold leading-[60px] text-[#171d1f] mb-2">
        Padding
      </h1>
      <p className="text-[16px] leading-[20px] text-[#30363a] mb-10">
        容器的內部留白（padding）。
        所有 padding 值使用 Space Token，禁止直接寫 px 數值。
      </p>

      {/* Token scale */}
      <section className="mb-10">
        <h2 className="text-[16px] font-semibold leading-[20px] text-[#91989e] uppercase tracking-widest mb-4">
          Padding Token Scale
        </h2>
        <div className="rounded-[8px] px-5" style={glassStyle}>
          {paddingTokens.map((t) => (
            <div
              key={t.token}
              className="flex items-center gap-4 py-3 border-b border-[rgba(13,5,44,0.06)] last:border-0"
            >
              <div className="w-40 shrink-0 bg-[rgba(13,5,44,0.04)] rounded-sm h-5 flex items-center">
                <div
                  className="h-full rounded-sm bg-[linear-gradient(to_right,#7522e0,#a473f9)]"
                  style={{ width: `${(t.px / maxPx) * 100}%`, minWidth: 4 }}
                />
              </div>
              <div className="flex items-baseline gap-3 min-w-0">
                <span className="font-semibold text-[14px] text-[#7522e0] w-20 shrink-0">
                  {t.token}
                </span>
                <span className="font-mono text-[13px] text-[#91989e] w-10 shrink-0">
                  {t.px}px
                </span>
                <span className="text-[12px] text-[#30363a] truncate">{t.usage}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Usage example */}
      <section>
        <h2 className="text-[16px] font-semibold leading-[20px] text-[#91989e] uppercase tracking-widest mb-4">
          Usage Example
        </h2>
        <div className="rounded-[8px] p-5" style={glassStyle}>
          <p className="text-[14px] font-semibold text-[#171d1f] mb-1">Content Area</p>
          <p className="text-[12px] text-[#91989e] mb-4">四邊 padding：space-2xl（32px）</p>
          <div
            className="relative rounded-md bg-[rgba(117,34,224,0.06)] border border-[rgba(13,5,44,0.08)]"
            style={{ padding: 32 }}
          >
            <div className="rounded bg-[rgba(117,34,224,0.1)] h-12 flex items-center justify-center">
              <span className="text-[11px] text-[#7522e0]">Content</span>
            </div>
            {/* Padding annotations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="text-[9px] font-semibold text-[#7522e0] bg-white/80 px-1 rounded whitespace-nowrap">
                32px
              </span>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
              <span className="text-[9px] font-semibold text-[#7522e0] bg-white/80 px-1 rounded whitespace-nowrap">
                32px
              </span>
            </div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
              <span className="text-[9px] font-semibold text-[#7522e0] bg-white/80 px-1 rounded whitespace-nowrap">
                32px
              </span>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
              <span className="text-[9px] font-semibold text-[#7522e0] bg-white/80 px-1 rounded whitespace-nowrap">
                32px
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Foundation/Spacing/Padding",
  component: PaddingPage,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "agaruda-purple" },
    docs: {
      description: {
        component: "Cinta Design System Padding Token 規範。space-xs（8px）至 space-3xl（40px）的 padding 用途對照。",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Padding Tokens",
};
