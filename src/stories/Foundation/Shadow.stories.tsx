import type { Meta, StoryObj } from "@storybook/react";

// ─── CSS helpers ──────────────────────────────────────────────────────────────

const P = (a: number) => `rgba(36,18,66,${a})`;
const BK = (a: number) => `rgba(0,0,0,${a})`;

// ─── Light-mode shadow tokens ─────────────────────────────────────────────────

const lightShadowGroups = [
  {
    group: "Shadow-Blur-Subtle",
    description: "輕量玻璃陰影，backdrop-blur 20px。用於低層元件（Input、Chip）。",
    blur: 20,
    tokens: [
      { size: "sm", token: "Shadow-Blur-Subtle/sm", boxShadow: `0px 5px 5px ${P(0.05)}, 0px 2px 2px ${P(0.03)}, 0px 1px 0px ${P(0.03)}` },
      { size: "md", token: "Shadow-Blur-Subtle/md", boxShadow: `0px 8px 8px ${P(0.05)}, 0px 4px 4px ${P(0.05)}, 0px 1px 0px ${P(0.03)}` },
      { size: "lg", token: "Shadow-Blur-Subtle/lg", boxShadow: `0px 10px 10px ${P(0.05)}, 0px 6px 6px ${P(0.05)}, 0px 1px 0px ${P(0.03)}` },
      { size: "xl", token: "Shadow-Blur-Subtle/xl", boxShadow: `0px 12px 12px ${P(0.06)}, 0px 8px 8px ${P(0.05)}, 0px 1px 0px ${P(0.03)}` },
    ],
  },
  {
    group: "Shadow-Blur",
    description: "標準玻璃陰影，backdrop-blur 35px。用於 Card、Bottom Sheet。",
    blur: 35,
    tokens: [
      { size: "sm", token: "Shadow-Blur/sm", boxShadow: `0px 10px 10px ${P(0.10)}, 0px 4px 4px ${P(0.05)}, 0px 1px 0px ${P(0.05)}` },
      { size: "md", token: "Shadow-Blur/md", boxShadow: `0px 15px 30px ${P(0.15)}, 0px 5px 10px ${P(0.10)}, 0px 2px 4px ${P(0.10)}` },
      { size: "lg", token: "Shadow-Blur/lg", boxShadow: `0px 15px 30px ${P(0.15)}, 0px 10px 20px ${P(0.10)}, 0px 3px 6px ${P(0.10)}` },
      { size: "xl", token: "Shadow-Blur/xl", boxShadow: `0px 20px 40px ${P(0.15)}, 0px 15px 30px ${P(0.10)}, 0px 5px 10px ${P(0.10)}` },
    ],
  },
  {
    group: "Shadow-Blur-Strong",
    description: "強力玻璃陰影，backdrop-blur 25px。用於 Sidebar、Dialog、Menu。",
    blur: 25,
    tokens: [
      { size: "sm", token: "Shadow-Blur-Strong/sm", boxShadow: `0px 10px 10px ${P(0.15)}, 0px 4px 4px ${P(0.10)}, 0px 1px 0px ${P(0.05)}` },
      { size: "md", token: "Shadow-Blur-Strong/md", boxShadow: `0px 10px 20px ${P(0.20)}, 0px 5px 10px ${P(0.10)}, 0px 2px 4px ${P(0.10)}` },
      { size: "lg", token: "Shadow-Blur-Strong/lg", boxShadow: `0px 15px 30px ${P(0.20)}, 0px 10px 20px ${P(0.15)}, 0px 3px 6px ${P(0.10)}` },
      { size: "xl", token: "Shadow-Blur-Strong/xl", boxShadow: `0px 20px 40px ${P(0.25)}, 0px 15px 30px ${P(0.15)}, 0px 5px 10px ${P(0.05)}` },
    ],
  },
];

// ─── Dark-mode shadow tokens ──────────────────────────────────────────────────

const darkShadowGroups = [
  {
    group: "Shadow-Blur-Subtle-Dark",
    description: "Dark mode 輕量玻璃陰影，backdrop-blur 20px。",
    blur: 20,
    tokens: [
      { size: "sm", token: "Shadow-Blur-Subtle-Dark/sm", boxShadow: `0px 5px 5px ${BK(0.12)}, 0px 2px 2px ${BK(0.08)}, 0px 1px 0px ${BK(0.06)}` },
      { size: "md", token: "Shadow-Blur-Subtle-Dark/md", boxShadow: `0px 8px 8px ${BK(0.15)}, 0px 4px 4px ${BK(0.10)}, 0px 1px 0px ${BK(0.06)}` },
      { size: "lg", token: "Shadow-Blur-Subtle-Dark/lg", boxShadow: `0px 10px 10px ${BK(0.15)}, 0px 6px 6px ${BK(0.10)}, 0px 1px 0px ${BK(0.06)}` },
      { size: "xl", token: "Shadow-Blur-Subtle-Dark/xl", boxShadow: `0px 12px 12px ${BK(0.18)}, 0px 8px 8px ${BK(0.12)}, 0px 1px 0px ${BK(0.06)}` },
    ],
  },
  {
    group: "Shadow-Blur-Dark",
    description: "Dark mode 標準玻璃陰影，backdrop-blur 35px。",
    blur: 35,
    tokens: [
      { size: "sm", token: "Shadow-Blur-Dark/sm", boxShadow: `0px 10px 10px ${BK(0.25)}, 0px 4px 4px ${BK(0.15)}, 0px 1px 0px ${BK(0.10)}` },
      { size: "md", token: "Shadow-Blur-Dark/md", boxShadow: `0px 15px 30px ${BK(0.30)}, 0px 5px 10px ${BK(0.20)}, 0px 2px 4px ${BK(0.15)}` },
      { size: "lg", token: "Shadow-Blur-Dark/lg", boxShadow: `0px 15px 30px ${BK(0.30)}, 0px 10px 20px ${BK(0.20)}, 0px 3px 6px ${BK(0.15)}` },
      { size: "xl", token: "Shadow-Blur-Dark/xl", boxShadow: `0px 20px 40px ${BK(0.35)}, 0px 15px 30px ${BK(0.25)}, 0px 5px 10px ${BK(0.15)}` },
    ],
  },
  {
    group: "Shadow-Blur-Strong-Dark",
    description: "Dark mode 強力玻璃陰影，backdrop-blur 25px。",
    blur: 25,
    tokens: [
      { size: "sm", token: "Shadow-Blur-Strong-Dark/sm", boxShadow: `0px 10px 10px ${BK(0.35)}, 0px 4px 4px ${BK(0.20)}, 0px 1px 0px ${BK(0.12)}` },
      { size: "md", token: "Shadow-Blur-Strong-Dark/md", boxShadow: `0px 10px 20px ${BK(0.40)}, 0px 5px 10px ${BK(0.25)}, 0px 2px 4px ${BK(0.18)}` },
      { size: "lg", token: "Shadow-Blur-Strong-Dark/lg", boxShadow: `0px 15px 30px ${BK(0.40)}, 0px 10px 20px ${BK(0.30)}, 0px 3px 6px ${BK(0.20)}` },
      { size: "xl", token: "Shadow-Blur-Strong-Dark/xl", boxShadow: `0px 20px 40px ${BK(0.50)}, 0px 15px 30px ${BK(0.35)}, 0px 5px 10px ${BK(0.15)}` },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const sectionHeading = (text: string, dark?: boolean) => (
  <h2
    className="text-[16px] font-semibold leading-[20px] uppercase tracking-widest mb-6"
    style={{ color: dark ? "rgba(255,255,255,0.35)" : "#91989e" }}
  >
    {text}
  </h2>
);

function ShadowGroupCard({
  group,
  description,
  blur,
  tokens,
  dark,
}: {
  group: string;
  description: string;
  blur: number;
  tokens: { size: string; token: string; boxShadow: string }[];
  dark?: boolean;
}) {
  const textColor = dark ? "rgba(255,255,255,0.7)" : "#30363a";
  const tokenColor = dark ? "rgba(145,86,252,0.9)" : "#7522e0";
  const monoColor = dark ? "rgba(255,255,255,0.45)" : "#91989e";
  const divider = dark ? "rgba(255,255,255,0.07)" : "rgba(13,5,44,0.06)";
  const cardBg = dark ? "#262A2F" : "#f9fafb";
  const cardBorder = dark ? "rgba(255,255,255,0.08)" : "rgba(13,5,44,0.08)";

  return (
    <div className="mb-10">
      <div className="flex items-baseline gap-3 mb-1">
        <h3 className="text-[15px] font-semibold" style={{ color: textColor }}>
          {group}
        </h3>
        <span className="font-mono text-[11px]" style={{ color: monoColor }}>
          backdrop-blur: {blur}px
        </span>
      </div>
      <p className="text-[13px] mb-4" style={{ color: monoColor }}>
        {description}
      </p>

      <div className="grid grid-cols-4 gap-4">
        {tokens.map(({ size, token, boxShadow }) => (
          <div key={token}>
            <div
              className="rounded-[8px] flex items-center justify-center mb-3"
              style={{
                height: 80,
                background: dark ? "#171D1F" : "#e6e4ed",
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
              }}
            >
              <div
                className="rounded-[6px]"
                style={{
                  width: 56,
                  height: 48,
                  background: cardBg,
                  border: `1px solid ${cardBorder}`,
                  boxShadow,
                }}
              />
            </div>
            <p className="text-[12px] font-semibold mb-1" style={{ color: tokenColor }}>
              {size.toUpperCase()}
            </p>
            <p className="font-mono text-[10px] leading-[14px] break-all" style={{ color: monoColor }}>
              {token}
            </p>
            <div className="mt-2 pt-2" style={{ borderTop: `1px solid ${divider}` }}>
              <p className="font-mono text-[9px] leading-[13px] break-all" style={{ color: monoColor }}>
                {boxShadow}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────

function ShadowPage() {
  return (
    <div className="font-[Urbanist] p-8 max-w-3xl">
      <h1 className="text-[40px] font-semibold leading-[60px] text-[#171d1f] mb-2">
        Shadow
      </h1>
      <p className="text-[16px] leading-[20px] text-[#30363a] mb-10">
        Cinta 的陰影系統由三層 Drop Shadow 疊加而成，搭配 backdrop-blur 產生玻璃質感。
        所有數值直接從 Figma Effect Styles 同步，請勿手動調整。
      </p>

      {/* ── Light Mode ── */}
      <section className="mb-10">
        {sectionHeading("Light Mode — Shadow Tokens", false)}
        {lightShadowGroups.map((g) => (
          <ShadowGroupCard key={g.group} {...g} dark={false} />
        ))}
      </section>

      {/* ── Dark Mode：收入深色容器保持文字對比 ── */}
      <section>
        {sectionHeading("Dark Mode — Shadow Tokens", false)}
        <div className="rounded-[12px] p-6" style={{ background: "#0D052C" }}>
          {darkShadowGroups.map((g) => (
            <ShadowGroupCard key={g.group} {...g} dark={true} />
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Foundation/Elevation/Shadow",
  component: ShadowPage,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "agaruda-purple" },
    docs: {
      description: {
        component:
          "從 Figma Effect Styles 同步的 Shadow Token 規範。涵蓋 Light / Dark 三強度（Subtle / Standard / Strong）各四尺寸（sm/md/lg/xl）。",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "All Shadow Tokens",
};
