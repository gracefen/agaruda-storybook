import type { Meta, StoryObj } from "@storybook/react";

// ─── Token data ───────────────────────────────────────────────────────────────

const focusRingsLight = [
  { name: "Focus ring/2px - Primary",     boxShadow: "0 0 0 3px rgba(59,17,112,1), 0 0 0 2px rgba(230,228,237,1)",  usage: "主要動作按鈕" },
  { name: "Focus ring/2px - Ring",        boxShadow: "0 0 0 3px rgba(104,115,120,1), 0 0 0 2px rgba(255,255,255,1)", usage: "通用互動元件" },
  { name: "Focus ring/2px - Destructive", boxShadow: "0 0 0 3px rgba(197,48,78,1), 0 0 0 2px rgba(255,255,255,1)",  usage: "危險操作（刪除等）" },
  { name: "Focus ring/1px - Primary",     boxShadow: "0 0 0 1px rgba(59,17,112,1)",                                  usage: "緊湊版主要焦點" },
  { name: "Focus ring/1px - Ring",        boxShadow: "0 0 0 1px rgba(104,115,120,1)",                                usage: "緊湊版通用焦點" },
  { name: "Focus ring/1px - Destructive", boxShadow: "0 0 0 1px rgba(197,48,78,1)",                                  usage: "緊湊版危險焦點" },
];

const focusRingsDark = [
  { name: "Focus ring-Dark/2px - Primary",     boxShadow: "0 0 0 3px rgba(145,86,252,1), 0 0 0 2px rgba(13,5,32,1)",   usage: "主要動作按鈕（Dark）" },
  { name: "Focus ring-Dark/2px - Ring",        boxShadow: "0 0 0 3px rgba(104,115,120,1), 0 0 0 2px rgba(21,22,24,1)", usage: "通用互動元件（Dark）" },
  { name: "Focus ring-Dark/2px - Destructive", boxShadow: "0 0 0 3px rgba(197,48,78,1), 0 0 0 2px rgba(26,10,14,1)",   usage: "危險操作（Dark）" },
  { name: "Focus ring-Dark/1px - Primary",     boxShadow: "0 0 0 1px rgba(145,86,252,1)",                               usage: "緊湊版主要焦點（Dark）" },
  { name: "Focus ring-Dark/1px - Ring",        boxShadow: "0 0 0 1px rgba(104,115,120,1)",                              usage: "緊湊版通用焦點（Dark）" },
  { name: "Focus ring-Dark/1px - Destructive", boxShadow: "0 0 0 1px rgba(197,48,78,1)",                               usage: "緊湊版危險焦點（Dark）" },
];

const glassStyle: React.CSSProperties = {
  background: "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.5))",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "1px solid rgba(13,5,44,0.1)",
  boxShadow: "0px 5px 5px rgba(36,18,66,0.05), 0px 2px 2px rgba(36,18,66,0.04), 0px 1px 0px rgba(36,18,66,0.03)",
  borderRadius: 8,
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function FocusRingSection({
  rings,
  dark,
}: {
  rings: { name: string; boxShadow: string; usage: string }[];
  dark?: boolean;
}) {
  const containerStyle: React.CSSProperties = dark
    ? {
        background: "rgba(13,5,44,0.6)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 8,
      }
    : glassStyle;

  const divider = dark ? "rgba(255,255,255,0.07)" : "rgba(13,5,44,0.06)";
  const tokenColor = dark ? "rgba(145,86,252,0.9)" : "#7522e0";
  const usageColor = dark ? "rgba(255,255,255,0.55)" : "#30363a";
  const monoColor = dark ? "rgba(255,255,255,0.35)" : "#91989e";
  const buttonBg = dark ? "#31353A" : "#ffffff";
  const buttonBorder = dark ? "rgba(255,255,255,0.12)" : "rgba(13,5,44,0.10)";
  const buttonText = dark ? "rgba(255,255,255,0.8)" : "#171d1f";

  return (
    <div className="rounded-[8px] px-5" style={containerStyle}>
      {rings.map((ring, i) => (
        <div
          key={ring.name}
          className="flex items-center gap-4 py-3"
          style={{ borderBottom: i < rings.length - 1 ? `1px solid ${divider}` : undefined }}
        >
          {/* Demo button */}
          <div
            className="rounded-[6px] px-3 py-2 shrink-0 text-[12px] font-medium select-none text-center"
            style={{
              background: buttonBg,
              border: `1px solid ${buttonBorder}`,
              color: buttonText,
              boxShadow: ring.boxShadow,
              minWidth: 72,
            }}
          >
            Focus
          </div>
          {/* Token info */}
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold mb-0.5" style={{ color: tokenColor }}>
              {ring.name}
            </p>
            <p className="text-[12px] mb-1" style={{ color: usageColor }}>{ring.usage}</p>
            <p className="font-mono text-[11px] break-all" style={{ color: monoColor }}>
              {ring.boxShadow}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────

function FocusRingPage() {
  return (
    <div className="font-[Urbanist] p-8 max-w-3xl">
      <h1 className="text-[40px] font-semibold leading-[60px] text-[#171d1f] mb-2">
        Focus Ring
      </h1>
      <p className="text-[16px] leading-[20px] text-[#30363a] mb-10">
        鍵盤導航時顯示的焦點輪廓。分 1px / 2px 兩種厚度，三種語意（Primary、Ring、Destructive），
        Light / Dark 各一套，共 12 個 Effect Style。
      </p>

      <section className="mb-10">
        <h2 className="text-[16px] font-semibold leading-[20px] text-[#91989e] uppercase tracking-widest mb-4">
          Light Mode
        </h2>
        <FocusRingSection rings={focusRingsLight} dark={false} />
      </section>

      <section>
        <h2 className="text-[16px] font-semibold leading-[20px] text-[#91989e] uppercase tracking-widest mb-4">
          Dark Mode
        </h2>
        <FocusRingSection rings={focusRingsDark} dark={true} />
      </section>
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Foundation/Elevation/Focus Ring",
  component: FocusRingPage,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "agaruda-purple" },
    docs: {
      description: {
        component:
          "從 Figma Effect Styles 同步的 Focus Ring Token。1px / 2px × Primary / Ring / Destructive × Light / Dark，共 12 個樣式。",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Focus Ring Tokens",
};
