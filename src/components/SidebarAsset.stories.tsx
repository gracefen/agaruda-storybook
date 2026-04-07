import type { Meta, StoryObj } from "@storybook/react";
import { SidebarAsset } from "./SidebarAsset";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof SidebarAsset> = {
  title: "Agaruda DS/Sidebar Asset",
  component: SidebarAsset,
  parameters: {
    layout: "centered",
    backgrounds: { default: "agaruda-dark" },
    docs: {
      description: {
        component: `
**Sidebar-Asset** — Agaruda Design System

Figma: \`↳ Card\` · Library Assets section · \`Sidebar-Asset\` 元件集

Sidebar 中的小型資產縮圖卡，設計稿尺寸 **150×147px**。
套用完整 Glass 效果（cinta-glass.md）。

| State | 說明 |
|---|---|
| \`Default\` | 一般狀態，白色漸層 Glass 背景 |
| \`Selected\` | 選中狀態，紫色漸層背景 + 紫色邊框，文字變紫色 |
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    state: {
      control: "select",
      options: ["Default", "Selected"],
    },
    name: { control: "text" },
    imageSrc: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof SidebarAsset>;

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: 150, height: 147 }}>{children}</div>
);

// ─── State Stories ────────────────────────────────────────────────────────────

export const Default: Story = {
  name: "State / Default",
  args: { state: "Default", name: "Cinta Kit" },
  render: (args) => (
    <Wrapper>
      <SidebarAsset {...args} className="h-full" />
    </Wrapper>
  ),
};

export const Selected: Story = {
  name: "State / Selected",
  args: { state: "Selected", name: "Cinta Kit" },
  render: (args) => (
    <Wrapper>
      <SidebarAsset {...args} className="h-full" />
    </Wrapper>
  ),
};

export const WithImage: Story = {
  name: "State / With Thumbnail",
  args: {
    state: "Default",
    name: "Icon Set",
    imageSrc: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&q=80",
  },
  render: (args) => (
    <Wrapper>
      <SidebarAsset {...args} className="h-full" />
    </Wrapper>
  ),
};

// ─── Overview ─────────────────────────────────────────────────────────────────

export const BothStates: Story = {
  name: "Overview / Default vs Selected",
  render: () => (
    <div className="flex gap-3">
      {(["Default", "Selected"] as const).map((state) => (
        <div key={state} style={{ width: 150, height: 147 }}>
          <SidebarAsset state={state} name="Cinta Kit" className="h-full" />
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const SidebarGrid: Story = {
  name: "Overview / Sidebar Grid（2 欄）",
  render: () => (
    <div className="grid grid-cols-2 gap-3" style={{ width: 318 }}>
      {[
        { name: "Cinta Kit", state: "Selected" as const },
        { name: "Icon Set", state: "Default" as const },
        { name: "DS Components", state: "Default" as const },
        { name: "Brand Assets", state: "Default" as const },
      ].map((item, i) => (
        <div key={i} style={{ height: 147 }}>
          <SidebarAsset {...item} className="h-full" />
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};
