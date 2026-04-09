import type { Meta, StoryObj } from "@storybook/react";
import { DataCard } from "./DataCard";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof DataCard> = {
  title: "Components/Card/Data Card",
  component: DataCard,
  parameters: {
    layout: "centered",
    backgrounds: { default: "agaruda-dark" },
    docs: {
      description: {
        component: `
**Data Cards** — Agaruda Design System

Figma: \`↳ Card\` · Data section

資料視覺化卡片，套用完整 Glass 效果（cinta-glass.md 兩層結構）。

| Variant | 設計稿尺寸 | 說明 |
|---|---|---|
| \`Overview\` | 380×168px | 橫排指標總覽，帶趨勢箭頭 |
| \`Pie-Chart\` | 380×340px | SVG Donut Chart + 圖例 |
| \`Bar-Chart\` | 560×414px | 水平 Bar Chart，紫色漸層填色 |
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["Overview", "Pie-Chart", "Bar-Chart"],
    },
    title: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof DataCard>;

// ─── Overview ─────────────────────────────────────────────────────────────────

export const Overview: Story = {
  name: "Variant / Overview（380×168px）",
  args: { variant: "Overview", title: "Overview" },
  render: (args) => (
    <div style={{ width: 380, height: 168 }}>
      <DataCard {...args} className="h-full" />
    </div>
  ),
};

export const OverviewCustomStats: Story = {
  name: "Variant / Overview（custom stats）",
  render: () => (
    <div style={{ width: 380, height: 168 }}>
      <DataCard
        variant="Overview"
        title="This Month"
        stats={[
          { label: "Renders", value: "12.4K", trend: "up" },
          { label: "Exports", value: 348, trend: "up" },
          { label: "Errors", value: 2, trend: "down" },
          { label: "Uptime", value: "99.9%", trend: "neutral" },
        ]}
        className="h-full"
      />
    </div>
  ),
  parameters: { controls: { disable: true } },
};

// ─── Pie Chart ────────────────────────────────────────────────────────────────

export const PieChart: Story = {
  name: "Variant / Pie-Chart（380×340px）",
  args: { variant: "Pie-Chart", title: "Distribution" },
  render: (args) => (
    <div style={{ width: 380, height: 340 }}>
      <DataCard {...args} className="h-full" />
    </div>
  ),
};

export const PieChartCustom: Story = {
  name: "Variant / Pie-Chart（custom segments）",
  render: () => (
    <div style={{ width: 380, height: 340 }}>
      <DataCard
        variant="Pie-Chart"
        title="Asset Types"
        segments={[
          { label: "UI Kits", value: 45, color: "#8333f4" },
          { label: "Icon Sets", value: 30, color: "#ab87fe" },
          { label: "Templates", value: 15, color: "#c6b2ff" },
          { label: "Other", value: 10, color: "#ded4ff" },
        ]}
        className="h-full"
      />
    </div>
  ),
  parameters: { controls: { disable: true } },
};

// ─── Bar Chart ────────────────────────────────────────────────────────────────

export const BarChart: Story = {
  name: "Variant / Bar-Chart（560×414px）",
  args: { variant: "Bar-Chart", title: "Monthly Activity" },
  render: (args) => (
    <div style={{ width: 560, height: 414 }}>
      <DataCard {...args} className="h-full" />
    </div>
  ),
};

export const BarChartCustom: Story = {
  name: "Variant / Bar-Chart（custom data）",
  render: () => (
    <div style={{ width: 560, height: 414 }}>
      <DataCard
        variant="Bar-Chart"
        title="Workspace Usage"
        bars={[
          { label: "DS", value: 96 },
          { label: "DT", value: 78 },
          { label: "AI", value: 85 },
          { label: "MB", value: 62 },
          { label: "Web", value: 91 },
          { label: "BE", value: 44 },
        ]}
        barUnit="%"
        className="h-full"
      />
    </div>
  ),
  parameters: { controls: { disable: true } },
};

// ─── Dashboard Panel ──────────────────────────────────────────────────────────

export const DashboardPanel: Story = {
  name: "Overview / Dashboard Panel（全部 variants）",
  render: () => (
    <div className="flex flex-col gap-5" style={{ width: 560 }}>
      {/* Overview row */}
      <div style={{ width: 380, height: 168 }}>
        <DataCard variant="Overview" title="Overview" className="h-full" />
      </div>
      {/* Charts row */}
      <div className="flex gap-5">
        <div style={{ width: 380, height: 340 }}>
          <DataCard variant="Pie-Chart" title="Distribution" className="h-full" />
        </div>
      </div>
      {/* Bar chart */}
      <div style={{ width: 560, height: 414 }}>
        <DataCard variant="Bar-Chart" title="Monthly Activity" className="h-full" />
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    docs: { description: { story: "三種 DataCard variants 排列於 Dashboard Panel 中" } },
  },
};
