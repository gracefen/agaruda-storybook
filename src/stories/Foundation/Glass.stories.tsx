import type { Meta, StoryObj } from "@storybook/react";

// ─── Glass spec ───────────────────────────────────────────────────────────────

const glassStyle: React.CSSProperties = {
  background: "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.5))",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "1px solid rgba(13,5,44,0.1)",
  boxShadow:
    "0px 5px 5px rgba(36,18,66,0.05), 0px 2px 2px rgba(36,18,66,0.04), 0px 1px 0px rgba(36,18,66,0.03)",
  borderRadius: 8,
};

const specRows = [
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
];

// ─── Page component ───────────────────────────────────────────────────────────

function GlassPage() {
  return (
    <div className="font-[Urbanist] p-8 max-w-3xl">
      <h1 className="text-[40px] font-semibold leading-[60px] text-[#171d1f] mb-2">
        Glass Effect
      </h1>
      <p className="text-[16px] leading-[20px] text-[#30363a] mb-10">
        Cinta 使用 <strong>Glassmorphism</strong> 作為容器的視覺識別。
        三層 shadow 數值為核心規範，不可自行調整。
        需要頁面背景有顏色（utility-purple-950）才能顯示效果。
      </p>

      {/* Demo container */}
      <div style={glassStyle} className="p-6 mb-4">
        <p className="text-[14px] font-semibold text-[#171d1f] mb-1">Glass Container</p>
        <p className="text-[12px] text-[#30363a]">
          Card、Sidebar、Search Bar 均套用此效果。
        </p>
      </div>

      {/* Spec breakdown */}
      <div className="rounded-[8px] px-5" style={glassStyle}>
        {specRows.map((row) => (
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
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Foundation/Elevation/Glass",
  component: GlassPage,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "agaruda-purple" },
    docs: {
      description: {
        component:
          "Cinta Design System 的 Glassmorphism 規範。三層 shadow + backdrop-blur + 半透明漸層背景構成 Glass 容器，數值不可自行調整。",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Glass Effect",
};
