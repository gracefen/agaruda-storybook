import type { Meta, StoryObj } from "@storybook/react";
import { AssetPerformanceInfo } from "./AssetPerformanceInfo";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof AssetPerformanceInfo> = {
  title: "Agaruda DS/Asset Performance Info",
  component: AssetPerformanceInfo,
  parameters: {
    layout: "centered",
    backgrounds: { default: "agaruda-dark" },
    docs: {
      description: {
        component: `
**Asset-Performance-Information** — Agaruda Design System

Figma: \`↳ Card\` · Library Assets section · \`Asset-Performance-Information\`

資產效能資訊小卡，設計稿尺寸 **214×116px**。
套用完整 Glass 效果（cinta-glass.md）。

橫向排列多個統計數字（value + label），各組之間用細線分隔。
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AssetPerformanceInfo>;

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: 214, height: 116 }}>{children}</div>
);

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: "Default",
  render: () => (
    <Wrapper>
      <AssetPerformanceInfo className="h-full" />
    </Wrapper>
  ),
};

export const HighEngagement: Story = {
  name: "High Engagement",
  render: () => (
    <Wrapper>
      <AssetPerformanceInfo
        stats={[
          { label: "Views", value: "24.8K" },
          { label: "Downloads", value: "3.2K" },
          { label: "Rating", value: "5.0" },
        ]}
        className="h-full"
      />
    </Wrapper>
  ),
};

export const FourStats: Story = {
  name: "Four Stats",
  render: () => (
    <div style={{ width: 280, height: 116 }}>
      <AssetPerformanceInfo
        stats={[
          { label: "Views", value: "1.2K" },
          { label: "Downloads", value: 86 },
          { label: "Rating", value: "4.8" },
          { label: "Forks", value: 12 },
        ]}
        className="h-full"
      />
    </div>
  ),
};
