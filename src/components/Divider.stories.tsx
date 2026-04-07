import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Divider> = {
  title: "Agaruda DS/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
    backgrounds: { default: "agaruda-purple" },
    docs: {
      description: {
        component: `
**Divider** — Agaruda Design System

Figma: \`↳ Divider\` · COMPONENT_SET \`40000105:84917\`

顏色：\`utility-purple-a10\` = \`rgba(13,5,44,0.1)\`

| Prop | 說明 |
|---|---|
| \`orientation\` | Horizontal（預設）/ Vertical |
| \`size\` | Default（全寬/全高）/ Small（Vertical 時 16px 高） |
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["Horizontal", "Vertical"],
    },
    size: {
      control: "radio",
      options: ["Default", "Small"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Horizontal: Story = {
  render: (args) => (
    <div className="w-80">
      <p className="font-[Urbanist] text-[14px] text-[#171d1f] mb-3">Above the divider</p>
      <Divider {...args} />
      <p className="font-[Urbanist] text-[14px] text-[#30363a] mt-3">Below the divider</p>
    </div>
  ),
  args: { orientation: "Horizontal" },
};

export const Vertical: Story = {
  render: (args) => (
    <div className="flex items-center gap-3 h-8">
      <span className="font-[Urbanist] text-[14px] text-[#171d1f]">Left</span>
      <Divider {...args} />
      <span className="font-[Urbanist] text-[14px] text-[#30363a]">Right</span>
    </div>
  ),
  args: { orientation: "Vertical", size: "Small" },
};

export const InContent: Story = {
  name: "In Context — Card Section",
  render: () => (
    <div
      className="relative w-72 rounded-[8px] p-5 flex flex-col gap-0 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.5))",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(13,5,44,0.1)",
        boxShadow: "0px 5px 5px rgba(36,18,66,0.05), 0px 2px 2px rgba(36,18,66,0.04), 0px 1px 0px rgba(36,18,66,0.03)",
      }}
    >
      <div style={{ position: "absolute", inset: 0, borderRadius: "inherit", background: "rgba(0,0,0,0.004)", pointerEvents: "none" }} aria-hidden="true" />
      <div className="py-3">
        <p className="font-[Urbanist] text-[14px] font-semibold text-[#171d1f]">Section A</p>
        <p className="font-[Urbanist] text-[12px] text-[#30363a] mt-0.5">Some content here</p>
      </div>
      <Divider />
      <div className="py-3">
        <p className="font-[Urbanist] text-[14px] font-semibold text-[#171d1f]">Section B</p>
        <p className="font-[Urbanist] text-[12px] text-[#30363a] mt-0.5">More content below</p>
      </div>
      <Divider />
      <div className="py-3">
        <p className="font-[Urbanist] text-[14px] font-semibold text-[#171d1f]">Section C</p>
        <p className="font-[Urbanist] text-[12px] text-[#30363a] mt-0.5">Last section</p>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const AllVariants: Story = {
  name: "Overview / All Variants",
  render: () => (
    <div className="flex flex-col gap-8 p-6 w-80">
      {/* Horizontal */}
      <div>
        <p className="font-[Urbanist] text-[12px] text-[#91989e] mb-3">Horizontal</p>
        <div>
          <p className="font-[Urbanist] text-[14px] text-[#171d1f] mb-2">Above</p>
          <Divider orientation="Horizontal" />
          <p className="font-[Urbanist] text-[14px] text-[#30363a] mt-2">Below</p>
        </div>
      </div>
      {/* Vertical */}
      <div>
        <p className="font-[Urbanist] text-[12px] text-[#91989e] mb-3">Vertical / Small</p>
        <div className="flex items-center gap-3 h-8">
          <span className="font-[Urbanist] text-[14px] text-[#171d1f]">Left</span>
          <Divider orientation="Vertical" size="Small" />
          <span className="font-[Urbanist] text-[14px] text-[#30363a]">Right</span>
        </div>
      </div>
      {/* In card */}
      <div>
        <p className="font-[Urbanist] text-[12px] text-[#91989e] mb-3">In Glass Card</p>
        <div
          className="relative rounded-[8px] px-4 overflow-hidden"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.5))",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(13,5,44,0.1)",
            boxShadow: "0px 5px 5px rgba(36,18,66,0.05), 0px 2px 2px rgba(36,18,66,0.04), 0px 1px 0px rgba(36,18,66,0.03)",
          }}
        >
          <div style={{ position: "absolute", inset: 0, borderRadius: "inherit", background: "rgba(0,0,0,0.004)", pointerEvents: "none" }} aria-hidden="true" />
          {["Section A", "Section B", "Section C"].map((s, i, arr) => (
            <div key={s}>
              <p className="font-[Urbanist] text-[14px] font-semibold text-[#171d1f] py-3">{s}</p>
              {i < arr.length - 1 && <Divider />}
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};
