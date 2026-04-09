import type { Meta, StoryObj } from "@storybook/react";

// ─── Token data ───────────────────────────────────────────────────────────────

const gapTokens = [
  { token: "space-2xs", px: 4,  usage: "Card Header：title ↔ id 間距" },
  { token: "space-xs",  px: 8,  usage: "Sidebar Section 間 gap、Breadcrumb ↔ Title" },
  { token: "space-m",   px: 16, usage: "Card Footer button 間 gap" },
  { token: "space-l",   px: 20, usage: "Card Grid gap（每列 Card 間距）" },
  { token: "space-xl",  px: 24, usage: "Content Area 區塊間 gap" },
];

const maxPx = Math.max(...gapTokens.map((t) => t.px));

const glassStyle: React.CSSProperties = {
  background: "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.5))",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "1px solid rgba(13,5,44,0.1)",
  boxShadow: "0px 5px 5px rgba(36,18,66,0.05), 0px 2px 2px rgba(36,18,66,0.04), 0px 1px 0px rgba(36,18,66,0.03)",
  borderRadius: 8,
};

// ─── Page component ───────────────────────────────────────────────────────────

function GapPage() {
  return (
    <div className="font-[Urbanist] p-8 max-w-3xl">
      <h1 className="text-[40px] font-semibold leading-[60px] text-[#171d1f] mb-2">
        Gap
      </h1>
      <p className="text-[16px] leading-[20px] text-[#30363a] mb-10">
        元件與元件之間的間距（flex gap、grid gap）。
        所有 gap 值使用 Space Token，禁止直接寫 px 數值。
      </p>

      {/* Token scale */}
      <section className="mb-10">
        <h2 className="text-[16px] font-semibold leading-[20px] text-[#91989e] uppercase tracking-widest mb-4">
          Gap Token Scale
        </h2>
        <div className="rounded-[8px] px-5" style={glassStyle}>
          {gapTokens.map((t) => (
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
          <p className="text-[14px] font-semibold text-[#171d1f] mb-1">Card Grid</p>
          <p className="text-[12px] text-[#91989e] mb-4">Card 之間 gap：space-l（20px）</p>
          <div className="flex gap-5">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="flex-1 rounded-md bg-[rgba(117,34,224,0.06)] h-16 flex items-center justify-center"
              >
                <span className="text-[11px] text-[#7522e0]">Card {n}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#7522e0] font-semibold mt-2 text-center">
            gap: 20px (space-l)
          </p>
        </div>
      </section>
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Foundation/Spacing/Gap",
  component: GapPage,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "agaruda-purple" },
    docs: {
      description: {
        component: "Cinta Design System Gap Token 規範。space-2xs（4px）至 space-xl（24px）的 gap 用途對照。",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Gap Tokens",
};
