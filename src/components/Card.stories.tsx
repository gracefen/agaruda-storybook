import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Card> = {
  title: "Components/Card/Card",
  component: Card,
  parameters: {
    layout: "centered",
    backgrounds: { default: "agaruda-dark" },
    docs: {
      description: {
        component: `
**Workspace-Card** — Agaruda Design System

Figma: \`↳ Card\` · COMPONENT_SET \`Workspace-Card\`（\`40001826:1674\`）

### Glass 兩層結構（cinta-glass.md）
外層：backdrop-blur(20px) + 漸層背景（overlay-inverse-a60/a50）+ 三層 shadow + border
內層：absolute inset-0，rgba(0,0,0,0)，模擬 Figma GLASS 折射

### Variant 規格（直接讀自 Figma）

| Variant | 尺寸（設計稿） | Footer 位置 | 按鈕 |
|---|---|---|---|
| \`Info\` | 1068×200px | 右欄 inline（w-348px） | Edit + View |
| \`Left Info. Right IMG\` | 1068×276px | **Absolute** 疊在 IMG 右上角（w-500px） | Edit + View |
| \`Top IMG. Down Info\` | 534×424px | **Absolute** top-24px right-24px | **View only** |
| \`Blank\` | 1068×240px | 置中 Footer | Upload（Plus icon）|

所有按鈕：**純文字，無 icon**（Edit / View / Upload）
hover 行為：\`opacity-0\` → \`group-hover:opacity-100\`，transition 0.2s
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
  title: "Workspace Title",
  author: "Creator Name",
  subtitle: "workspace ID number",
  date: "October 19, 2025 8:20 AM",
};

// ─── Variant: Info ────────────────────────────────────────────────────────────
// Figma node 40001826:1709，1068×200px

export const InfoVariant: Story = {
  name: "Variant / Info",
  args: { ...defaultArgs, variant: "Info" },
  render: (args) => (
    <div style={{ width: 1068, height: 200 }}>
      <Card {...args} className="h-full" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Figma node `40001826:1709`。Footer 為橫排右欄（w-348px），Metadata 上下推開（justify-between）。",
      },
    },
  },
};

// ─── Variant: Left Info. Right IMG ───────────────────────────────────────────
// Figma node 40001826:1675，1068×276px

export const LeftInfoRightImg: Story = {
  name: "Variant / Left Info. Right IMG",
  args: {
    ...defaultArgs,
    variant: "Left Info. Right IMG",
    imageSrc: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  },
  render: (args) => (
    <div style={{ width: 1068, height: 276 }}>
      <Card {...args} className="h-full" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Figma node `40001826:1675`。Footer Absolute 疊圖右上，subtitle 使用 text-secondary `#30363a`（與其他 variant 的 `#91989e` 不同）。",
      },
    },
  },
};

// ─── Variant: Top IMG. Down Info ─────────────────────────────────────────────
// Figma node 40001826:1718，534×424px

export const TopImgDownInfo: Story = {
  name: "Variant / Top IMG. Down Info",
  args: {
    ...defaultArgs,
    variant: "Top IMG. Down Info",
    imageSrc: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
  },
  render: (args) => (
    <div style={{ width: 534, height: 424 }}>
      <Card {...args} className="h-full" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Figma node `40001826:1718`。只有 View 按鈕（無 Edit），Absolute top-24px right-24px。圖片有 parallax overflow 效果（h-124.33%，top -12.17%）。",
      },
    },
  },
};

// ─── Variant: Blank ───────────────────────────────────────────────────────────
// Figma node 40001826:1703，1068×240px

export const BlankVariant: Story = {
  name: "Variant / Blank",
  args: { variant: "Blank" },
  render: (args) => (
    <div style={{ width: 1068, height: 240 }}>
      <Card {...args} className="h-full" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Figma node `40001826:1703`。置中顯示 title + description + Upload 按鈕（Plus icon）。",
      },
    },
  },
};

export const BlankCustomTitle: Story = {
  name: "Variant / Blank（自訂標題）",
  args: {
    variant: "Blank",
    title: "No Workspaces Yet",
    subtitle: "Create your first workspace to get started.",
  },
  render: (args) => (
    <div style={{ width: 1068, height: 240 }}>
      <Card {...args} className="h-full" />
    </div>
  ),
};

// ─── Interaction: Hover ───────────────────────────────────────────────────────

export const HoverInfo: Story = {
  name: "Interaction / Info（hover 顯示按鈕）",
  args: { ...defaultArgs, variant: "Info" },
  render: (args) => (
    <div className="flex flex-col gap-2">
      <p className="font-[Urbanist] text-[12px] text-[#91989e]">
        滑鼠移上 Card 可看到 Edit / View 按鈕出現
      </p>
      <div style={{ width: 1068, height: 200 }}>
        <Card {...args} className="h-full" />
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const HoverTopImg: Story = {
  name: "Interaction / Top IMG（hover 顯示 View）",
  args: {
    ...defaultArgs,
    variant: "Top IMG. Down Info",
    imageSrc: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
  },
  render: (args) => (
    <div className="flex flex-col gap-2">
      <p className="font-[Urbanist] text-[12px] text-[#91989e]">
        滑鼠移上 Card 可看到 View 按鈕出現（僅 View，無 Edit）
      </p>
      <div style={{ width: 534, height: 424 }}>
        <Card {...args} className="h-full" />
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

// ─── Overview: All Variants ───────────────────────────────────────────────────

export const AllVariants: Story = {
  name: "Overview / All Variants",
  render: () => (
    <div className="flex flex-col gap-5">
      {/* Left Info. Right IMG */}
      <div style={{ width: 1068, height: 276 }}>
        <Card
          variant="Left Info. Right IMG"
          {...defaultArgs}
          imageSrc="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80"
          className="h-full"
        />
      </div>
      {/* Info */}
      <div style={{ width: 1068, height: 200 }}>
        <Card variant="Info" {...defaultArgs} className="h-full" />
      </div>
      {/* Blank */}
      <div style={{ width: 1068, height: 240 }}>
        <Card variant="Blank" className="h-full" />
      </div>
      {/* Top IMG. Down Info */}
      <div style={{ width: 534, height: 424 }}>
        <Card
          variant="Top IMG. Down Info"
          {...defaultArgs}
          imageSrc="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80"
          className="h-full"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
  },
};
