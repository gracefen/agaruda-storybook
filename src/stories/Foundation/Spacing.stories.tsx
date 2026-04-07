import type { Meta, StoryObj } from "@storybook/react";

// ─── Token Data ───────────────────────────────────────────────────────────────

const spaceTokens = [
  { token: "space-2xs", px: 4,  usage: "Card Header：title ↔ id gap" },
  { token: "space-xs",  px: 8,  usage: "Sidebar Section padding top/bottom、Section 間 gap、Breadcrumb ↔ Title" },
  { token: "space-m",   px: 16, usage: "Sidebar Section padding left/right、Card Footer button 間 gap" },
  { token: "space-l",   px: 20, usage: "Card Grid gap（每列 Card 間距）" },
  { token: "space-xl",  px: 24, usage: "Content Area 區塊間 gap、Sidebar Header padding" },
  { token: "space-2xl", px: 32, usage: "Content Area padding（四邊）" },
  { token: "space-3xl", px: 40, usage: "（保留）" },
];

const usageExamples = [
  {
    label: "Content Area",
    description: "padding 四邊均 space-2xl（32px），區塊間 gap space-xl（24px）",
    preview: (
      <div className="relative rounded-[8px] p-8 bg-[rgba(255,255,255,0.3)] border border-[rgba(13,5,44,0.1)]">
        <div className="rounded-md bg-[rgba(117,34,224,0.08)] h-6 mb-6 flex items-center px-2">
          <span className="text-[11px] text-[#7522e0] font-semibold">Page Title</span>
        </div>
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
        {/* Annotations */}
        <div className="absolute top-0 left-0 w-full h-8 flex items-center justify-center">
          <span className="text-[10px] text-[#7522e0] font-semibold bg-white/70 px-1 rounded">
            padding: 32px (space-2xl)
          </span>
        </div>
        <div className="absolute top-1/2 left-[calc(33.33%+8px)] -translate-y-1/2">
          <span className="text-[10px] text-[#7522e0] font-semibold bg-white/70 px-1 rounded">
            gap: 20px (space-l)
          </span>
        </div>
      </div>
    ),
  },
  {
    label: "Sidebar",
    description: "Header padding space-xl（24px），Section padding left/right space-m（16px）",
    preview: (
      <div className="w-40 rounded-[8px] overflow-hidden bg-[rgba(255,255,255,0.4)] border border-[rgba(13,5,44,0.1)]">
        <div className="px-6 py-6 border-b border-[rgba(13,5,44,0.06)]">
          <span className="text-[11px] font-semibold text-[#171d1f]">Logo</span>
          <div className="text-[10px] text-[#7522e0] mt-1">← 24px (space-xl) →</div>
        </div>
        <div className="px-4 py-2">
          <div className="text-[10px] text-[#91989e] mb-1">← 16px (space-m) →</div>
          {["Dashboard", "Workspaces", "Settings"].map((item) => (
            <div key={item} className="text-[11px] text-[#30363a] py-1">
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

// ─── Story Component ──────────────────────────────────────────────────────────

function SpacingPage() {
  const maxPx = Math.max(...spaceTokens.map((t) => t.px));

  return (
    <div className="font-[Urbanist] p-8 max-w-3xl">
      <h1 className="text-[40px] font-semibold leading-[60px] text-[#171d1f] mb-2">
        Spacing
      </h1>
      <p className="text-[16px] leading-[20px] text-[#30363a] mb-10">
        所有間距使用 Space Token，禁止直接寫 px 數值。
      </p>

      {/* Token scale */}
      <section className="mb-10">
        <h2 className="text-[16px] font-semibold leading-[20px] text-[#91989e] uppercase tracking-widest mb-4">
          Space Token Scale
        </h2>
        <div
          className="rounded-[8px] px-5"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.5))",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(13,5,44,0.1)",
            boxShadow:
              "0px 5px 5px rgba(36,18,66,0.05), 0px 2px 2px rgba(36,18,66,0.04), 0px 1px 0px rgba(36,18,66,0.03)",
          }}
        >
          {spaceTokens.map((t) => (
            <div
              key={t.token}
              className="flex items-center gap-4 py-3 border-b border-[rgba(13,5,44,0.06)] last:border-0"
            >
              {/* Bar */}
              <div className="w-48 shrink-0 bg-[rgba(13,5,44,0.04)] rounded-sm h-5 flex items-center">
                <div
                  className="h-full rounded-sm bg-[linear-gradient(to_right,#7522e0,#a473f9)]"
                  style={{ width: `${(t.px / maxPx) * 100}%`, minWidth: 4 }}
                />
              </div>
              {/* Labels */}
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

      {/* Usage examples */}
      <section>
        <h2 className="text-[16px] font-semibold leading-[20px] text-[#91989e] uppercase tracking-widest mb-4">
          Usage Examples
        </h2>
        <div className="flex flex-col gap-6">
          {usageExamples.map((ex) => (
            <div
              key={ex.label}
              className="rounded-[8px] p-5"
              style={{
                background: "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.5))",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(13,5,44,0.1)",
                boxShadow:
                  "0px 5px 5px rgba(36,18,66,0.05), 0px 2px 2px rgba(36,18,66,0.04), 0px 1px 0px rgba(36,18,66,0.03)",
              }}
            >
              <p className="text-[14px] font-semibold text-[#171d1f] mb-1">{ex.label}</p>
              <p className="text-[12px] text-[#91989e] mb-4">{ex.description}</p>
              {ex.preview}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Agaruda DS/Foundation/Spacing",
  component: SpacingPage,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "agaruda-purple" },
    docs: {
      description: {
        component: "Cinta Design System 間距 Token 規範。space-2xs（4px）至 space-3xl（40px）。",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Space Tokens",
};
