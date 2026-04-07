import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Card> = {
  title: "Agaruda DS/Card",
  component: Card,
  parameters: {
    layout: "centered",
    backgrounds: { default: "agaruda-purple" },
    docs: {
      description: {
        component: `
**Workspace-Card** — Agaruda Design System

Figma: \`↳ Card\` · COMPONENT_SET \`Workspace-Card\`

依賴：cinta-glass（背景效果）、cinta-spacing（間距）、cinta-interaction（hover 行為）

### Glass 兩層結構（cinta-glass.md）
| 層 | 職責 |
|---|---|
| 外層 Panel | 漸層背景 + \`backdrop-filter: blur(20px)\` + 三層 shadow + border |
| 內層 Glass | \`position: absolute\` 覆蓋，近透明底色，模擬 Figma GLASS 折射質感 |

> ⚠️ **blur 待確認**：CSS 暫用 20px（DS Effect Style 實測值）；CSS 規範記載為 10px，確認後統一。

| Variant | 排列 | 設計稿尺寸 | 使用場景 |
|---|---|---|---|
| \`Left Info. Right IMG\` | 水平 | 1068×276px | 含圖主要列表 |
| \`Info\` | 水平 | 1068×200px | 次要資訊呈現 |
| \`Top IMG. Down Info\` | 垂直 | 534×424px | 圖片導向瀏覽 |
| \`Blank\` | 垂直 | 1068×240px | 預留位置 |

Dashboard Grid 實際尺寸：**365×340px**，3 欄排列，gap: 20px
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["Left Info. Right IMG", "Info", "Top IMG. Down Info", "Blank"],
    },
    title: { control: "text" },
    author: { control: "text" },
    subtitle: { control: "text" },
    date: { control: "text" },
    imageSrc: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

const defaultArgs = {
  title: "Agaruda Design System",
  author: "Grace Chu",
  subtitle: "#DS-001 · Foundation",
  date: "Apr 4, 2026",
  onEdit: () => {},
  onView: () => {},
};

// ─── Variant Stories ──────────────────────────────────────────────────────────

export const InfoVariant: Story = {
  name: "Variant / Info",
  args: { ...defaultArgs, variant: "Info" },
  render: (args) => (
    <div style={{ width: 365, height: 200 }}>
      <Card {...args} className="h-full" />
    </div>
  ),
};

export const LeftInfoRightImg: Story = {
  name: "Variant / Left Info. Right IMG",
  args: {
    ...defaultArgs,
    variant: "Left Info. Right IMG",
    imageSrc: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
  },
  render: (args) => (
    <div style={{ width: 365, height: 240 }}>
      <Card {...args} className="h-full" />
    </div>
  ),
};

export const TopImgDownInfo: Story = {
  name: "Variant / Top IMG. Down Info",
  args: {
    ...defaultArgs,
    variant: "Top IMG. Down Info",
    imageSrc: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
  },
  render: (args) => (
    <div style={{ width: 365, height: 340 }}>
      <Card {...args} className="h-full" />
    </div>
  ),
};

export const BlankVariant: Story = {
  name: "Variant / Blank",
  args: { variant: "Blank" },
  render: (args) => (
    <div style={{ width: 365, height: 200 }}>
      <Card {...args} className="h-full" />
    </div>
  ),
};

// ─── Hover state ──────────────────────────────────────────────────────────────

export const HoverActions: Story = {
  name: "Interaction / Hover（hover card 顯示按鈕）",
  args: { ...defaultArgs, variant: "Info" },
  render: (args) => (
    <div className="flex flex-col gap-2">
      <p className="font-[Urbanist] text-[12px] text-[#91989e]">
        將滑鼠移到 Card 上可看到 Edit / View 按鈕出現
      </p>
      <div style={{ width: 365, height: 200 }}>
        <Card {...args} className="h-full" />
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

// ─── Dashboard Grid ───────────────────────────────────────────────────────────

export const DashboardGrid: Story = {
  name: "Overview / Dashboard Grid（365×340px × 3欄）",
  render: () => (
    <div className="flex flex-wrap gap-5" style={{ width: 1135 }}>
      {[
        { title: "Agaruda Design System", subtitle: "#DS-001", author: "Grace Chu" },
        { title: "Digital Twins MVP", subtitle: "#DT-042", author: "Alex Lin" },
        { title: "AI-DCIM Dashboard", subtitle: "#AI-007", author: "Sam Chen" },
        { title: "Mobile App v2", subtitle: "#MB-019", author: "Lily Wang" },
        { title: "Component Library", subtitle: "#CL-003", author: "Grace Chu" },
        { variant: "Blank" as const },
      ].map((card, i) => (
        <div key={i} style={{ width: 365, height: 340 }}>
          <Card
            {...card}
            variant={card.variant ?? "Info"}
            date="Apr 4, 2026"
            onEdit={() => {}}
            onView={() => {}}
            className="h-full"
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    docs: { description: { story: "Dashboard Grid：3 欄，gap 20px（space-l），Card 365×340px" } },
  },
};
