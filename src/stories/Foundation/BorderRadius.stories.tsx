import type { Meta, StoryObj } from "@storybook/react";

// ─── Token data ───────────────────────────────────────────────────────────────

const radiusTokens = [
  {
    token: "radius-l",
    px: "8px",
    usage: "容器（Card、Sidebar、Search Bar）",
  },
  {
    token: "radius-m",
    px: "6px",
    usage: "Card 內縮圖",
  },
  {
    token: "—",
    px: "9999px",
    usage: "Pill（Tag、Badge）",
  },
];

// ─── Page component ───────────────────────────────────────────────────────────

function BorderRadiusPage() {
  return (
    <div className="font-[Urbanist] p-8 max-w-3xl">
      <h1 className="text-[40px] font-semibold leading-[60px] text-[#171d1f] mb-2">
        Border Radius
      </h1>
      <p className="text-[16px] leading-[20px] text-[#30363a] mb-10">
        Cinta 使用兩個固定 radius token，以及 Pill 形態的全圓角。
        所有容器元件應套用對應 token，禁止使用任意數值。
      </p>

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
        {radiusTokens.map((r) => (
          <div
            key={r.token + r.px}
            className="flex items-center gap-4 py-3 border-b border-[rgba(13,5,44,0.06)] last:border-0"
          >
            {/* Visual swatch */}
            <div
              className="w-12 h-12 bg-[rgba(117,34,224,0.12)] shrink-0 border border-[rgba(13,5,44,0.1)]"
              style={{ borderRadius: r.px === "9999px" ? 9999 : parseInt(r.px) }}
            />
            {/* Token info */}
            <div>
              <p className="text-[13px] font-semibold text-[#7522e0]">{r.token}</p>
              <p className="font-mono text-[12px] text-[#91989e]">{r.px}</p>
              <p className="text-[12px] text-[#30363a]">{r.usage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Foundation/Spacing/Border Radius",
  component: BorderRadiusPage,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "agaruda-purple" },
    docs: {
      description: {
        component:
          "Cinta Design System 的 Border Radius Token 規範。radius-l（8px）用於容器，radius-m（6px）用於內縮圖，9999px 用於 Pill 形態。",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Border Radius Tokens",
};
