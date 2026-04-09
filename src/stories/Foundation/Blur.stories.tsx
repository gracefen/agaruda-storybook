import type { Meta, StoryObj } from "@storybook/react";

// ─── Token data ───────────────────────────────────────────────────────────────

const blurTokens = [
  { size: "sm", token: "Blur/sm", radius: 10 },
  { size: "md", token: "Blur/md", radius: 20 },
  { size: "lg", token: "Blur/lg", radius: 30 },
  { size: "xl", token: "Blur/xl", radius: 40 },
];

// ─── Background ───────────────────────────────────────────────────────────────
// Layered radial gradients — provides enough visual detail for blur to read

const demoBg: React.CSSProperties = {
  background: [
    "radial-gradient(circle 520px at 10% 20%,  rgba(131,51,244,0.90) 0%, transparent 100%)",
    "radial-gradient(circle 460px at 90% 80%,  rgba(22,163,74,0.85)  0%, transparent 100%)",
    "radial-gradient(circle 380px at 55% 55%,  rgba(234,179,8,0.80)  0%, transparent 100%)",
    "radial-gradient(circle 360px at 80% 12%,  rgba(59,130,246,0.85) 0%, transparent 100%)",
    "radial-gradient(circle 360px at 22% 82%,  rgba(239,68,68,0.80)  0%, transparent 100%)",
    "radial-gradient(circle 300px at 48% 30%,  rgba(168,85,247,0.75) 0%, transparent 100%)",
    "radial-gradient(circle 300px at 65% 75%,  rgba(14,165,233,0.80) 0%, transparent 100%)",
    "#e8e4f8",
  ].join(", "),
};

// ─── Blur demo card ───────────────────────────────────────────────────────────

function BlurCard({
  radius,
  overlayColor,
  labelColor,
}: {
  radius: number;
  overlayColor: string;
  labelColor: string;
}) {
  return (
    <div
      className="rounded-[12px] overflow-hidden flex items-center justify-center"
      style={{
        aspectRatio: "1 / 1",
        backdropFilter: `blur(${radius}px)`,
        WebkitBackdropFilter: `blur(${radius}px)`,
        background: overlayColor,
      }}
    >
      <span
        className="text-[28px] font-medium"
        style={{ color: labelColor, fontFamily: "Urbanist, sans-serif" }}
      >
        blur({radius}px)
      </span>
    </div>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────

const glassStyle: React.CSSProperties = {
  background: "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.5))",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "1px solid rgba(13,5,44,0.1)",
  boxShadow: "0px 5px 5px rgba(36,18,66,0.05), 0px 2px 2px rgba(36,18,66,0.04), 0px 1px 0px rgba(36,18,66,0.03)",
  borderRadius: 8,
};

function BlurPage() {
  return (
    <div className="font-[Urbanist] p-8 max-w-3xl">
      <h1 className="text-[40px] font-semibold leading-[60px] text-[#171d1f] mb-2">
        Blur
      </h1>
      <p className="text-[16px] leading-[20px] text-[#30363a] mb-10">
        Cinta 使用 <code className="font-mono text-[#7522e0]">backdrop-filter: blur()</code> 為
        Glass 容器提供視覺深度。共分四級，從 sm（10px）至 xl（40px）。
      </p>

      {/* ── Visual demo：漸層容器內展示兩列 blur 卡片 ── */}
      <section className="mb-10">
        <h2 className="text-[16px] font-semibold leading-[20px] text-[#91989e] uppercase tracking-widest mb-4">
          Visual Demo
        </h2>
        <div className="rounded-[12px] overflow-hidden p-6" style={demoBg}>
          {/* Light overlay row */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            {blurTokens.map(({ token, radius }) => (
              <BlurCard
                key={`light-${token}`}
                radius={radius}
                overlayColor="rgba(255,255,255,0.6)"
                labelColor="#171d1f"
              />
            ))}
          </div>
          {/* Dark overlay row */}
          <div className="grid grid-cols-4 gap-4">
            {blurTokens.map(({ token, radius }) => (
              <BlurCard
                key={`dark-${token}`}
                radius={radius}
                overlayColor="rgba(0,0,0,0.6)"
                labelColor="#f1f1f3"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Token table ── */}
      <section>
        <h2 className="text-[16px] font-semibold leading-[20px] text-[#91989e] uppercase tracking-widest mb-4">
          Blur Tokens
        </h2>
        <div className="rounded-[8px] px-5" style={glassStyle}>
          {blurTokens.map(({ size, token, radius }, i) => (
            <div
              key={token}
              className="flex items-start gap-4 py-3 border-b border-[rgba(13,5,44,0.06)] last:border-0"
            >
              <span className="text-[13px] font-semibold text-[#7522e0] w-8 shrink-0">
                {size}
              </span>
              <span className="font-mono text-[12px] text-[#30363a] w-24 shrink-0">
                {token}
              </span>
              <span className="font-mono text-[12px] text-[#91989e]">
                backdrop-filter: blur({radius}px)
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Foundation/Elevation/Blur",
  component: BlurPage,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "agaruda-purple" },
    docs: {
      description: {
        component:
          "從 Figma Effect Styles 同步的 Blur Token 規範。backdrop-filter: blur() 搭配半透明背景產生 Glassmorphism 效果。",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Blur Tokens",
};
