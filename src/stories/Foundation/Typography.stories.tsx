import type { Meta, StoryObj } from "@storybook/react";

// ─── Type Scale Data ──────────────────────────────────────────────────────────

const typeScales = [
  {
    token: "size-4xl",
    px: "40px",
    weight: "SemiBold 600",
    lineHeight: "60px / line-2xl",
    font: "Urbanist",
    usage: "Page Title",
    sample: "Workspaces",
  },
  {
    token: "size-2xl",
    px: "24px",
    weight: "Bold 700",
    lineHeight: "40px / line-l",
    font: "Urbanist",
    usage: "Card 項目名稱",
    sample: "Agaruda Design System",
  },
  {
    token: "size-m",
    px: "16px",
    weight: "Bold 700",
    lineHeight: "20px / line-s",
    font: "Urbanist",
    usage: "Card 作者姓名",
    sample: "Grace Chu",
  },
  {
    token: "size-m",
    px: "16px",
    weight: "Regular 400",
    lineHeight: "20px / line-s",
    font: "Urbanist",
    usage: "Card ID subtitle",
    sample: "#DS-001 • 2024",
  },
  {
    token: "size-s",
    px: "14px",
    weight: "SemiBold 600",
    lineHeight: "20px / line-s",
    font: "Urbanist",
    usage: "Button 文字 / Tab 文字",
    sample: "Create Workspace",
  },
  {
    token: "size-s",
    px: "14px",
    weight: "Regular 400",
    lineHeight: "20px / line-s",
    font: "Geist",
    usage: "Card 日期 / Breadcrumb（Geist）",
    sample: "Apr 4, 2026",
  },
  {
    token: "size-xs",
    px: "12px",
    weight: "Regular 400",
    lineHeight: "16px / line-xs",
    font: "Urbanist",
    usage: "Sidebar Section Title",
    sample: "WORKSPACES",
  },
  {
    token: "size-xs",
    px: "12px",
    weight: "SemiBold 600",
    lineHeight: "16px / line-xs",
    font: "Urbanist",
    usage: "Sort Button 文字",
    sample: "Sort by Date",
  },
];

// ─── Story Component ──────────────────────────────────────────────────────────

function TypographyPage() {
  return (
    <div className="font-[Urbanist] p-8 max-w-3xl">
      <h1 className="text-[40px] font-semibold leading-[60px] text-[#171d1f] mb-2">
        Typography
      </h1>
      <p className="text-[16px] leading-[20px] text-[#30363a] mb-10">
        主字型 <strong>Urbanist</strong>。Breadcrumb 與日期例外使用 <strong>Geist</strong>。
      </p>

      {/* Font showcase */}
      <div className="flex gap-6 mb-10">
        {["Urbanist", "Geist"].map((font) => (
          <div
            key={font}
            className="flex-1 rounded-[8px] p-6"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.5))",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(13,5,44,0.1)",
              boxShadow:
                "0px 5px 5px rgba(36,18,66,0.05), 0px 2px 2px rgba(36,18,66,0.04), 0px 1px 0px rgba(36,18,66,0.03)",
            }}
          >
            <p className="text-[12px] font-semibold text-[#91989e] uppercase tracking-widest mb-3">
              {font} {font === "Geist" ? "（Breadcrumb / Date）" : "（Primary）"}
            </p>
            <p
              className="text-[32px] font-bold text-[#171d1f] leading-tight"
              style={{ fontFamily: font }}
            >
              Aa Bb Cc
            </p>
            <p
              className="text-[14px] text-[#30363a] mt-2"
              style={{ fontFamily: font }}
            >
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
              <br />
              abcdefghijklmnopqrstuvwxyz
              <br />
              0123456789
            </p>
          </div>
        ))}
      </div>

      {/* Type scale */}
      <section>
        <h2 className="text-[16px] font-semibold leading-[20px] text-[#91989e] uppercase tracking-widest mb-4">
          Type Scale
        </h2>
        <div
          className="rounded-[8px] overflow-hidden"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.5))",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(13,5,44,0.1)",
            boxShadow:
              "0px 5px 5px rgba(36,18,66,0.05), 0px 2px 2px rgba(36,18,66,0.04), 0px 1px 0px rgba(36,18,66,0.03)",
          }}
        >
          {typeScales.map((scale, i) => (
            <div
              key={i}
              className="flex items-center gap-6 px-5 py-4 border-b border-[rgba(13,5,44,0.06)] last:border-0"
            >
              {/* Sample text */}
              <div className="flex-1 min-w-0">
                <p
                  style={{
                    fontFamily: scale.font,
                    fontSize: scale.px,
                    fontWeight: scale.weight.includes("700")
                      ? 700
                      : scale.weight.includes("600")
                      ? 600
                      : 400,
                    lineHeight: scale.lineHeight.split(" ")[0],
                    color: "#171d1f",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {scale.sample}
                </p>
              </div>

              {/* Meta */}
              <div className="shrink-0 text-right">
                <p className="font-[Urbanist] text-[12px] font-semibold text-[#7522e0]">
                  {scale.token}
                </p>
                <p className="font-mono text-[11px] text-[#91989e]">
                  {scale.px} · {scale.weight}
                </p>
                <p className="font-[Urbanist] text-[11px] text-[#91989e]">
                  {scale.font} · {scale.usage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Foundation/Typography",
  component: TypographyPage,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "agaruda-purple" },
    docs: {
      description: {
        component: "Cinta Design System 字型規範。主字型 Urbanist，Breadcrumb / 日期使用 Geist。",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Type Scale",
};
