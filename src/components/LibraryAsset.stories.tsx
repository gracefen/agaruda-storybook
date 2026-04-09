import type { Meta, StoryObj } from "@storybook/react";
import { LibraryAsset } from "./LibraryAsset";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof LibraryAsset> = {
  title: "Components/Library Asset",
  component: LibraryAsset,
  parameters: {
    layout: "centered",
    backgrounds: { default: "agaruda-dark" },
    docs: {
      description: {
        component: `
**Library-Asstes** — Agaruda Design System

Figma: \`↳ Card\` · Library Assets section · \`Library-Asstes\` 元件集

資產庫縮圖卡片，設計稿尺寸 **270×280px**。
套用完整 Glass 效果（cinta-glass.md 兩層結構）。

| Type | 說明 |
|---|---|
| \`Upload\` | 上傳新資產的佔位卡，帶虛線邊框與拖放提示 |
| \`Sample\` | 系統預設範本資產 |
| \`Asset\` | 使用者上傳的實際資產 |

Hover 效果：縮圖背景色加深，transition 0.2s。
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["Upload", "Sample", "Asset"],
    },
    name: { control: "text" },
    meta: { control: "text" },
    imageSrc: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof LibraryAsset>;

// ─── 固定展示尺寸（270×280px，設計稿實際尺寸） ────────────────────────────────

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: 270, height: 280 }}>{children}</div>
);

// ─── Type Stories ─────────────────────────────────────────────────────────────

export const AssetDefault: Story = {
  name: "Type / Asset（Default）",
  args: {
    type: "Asset",
    name: "Cinta UI Kit v2",
    meta: "UI Kit · 48 components",
  },
  render: (args) => (
    <Wrapper>
      <LibraryAsset {...args} className="h-full" />
    </Wrapper>
  ),
};

export const AssetWithImage: Story = {
  name: "Type / Asset（with thumbnail）",
  args: {
    type: "Asset",
    name: "Agaruda Icon Set",
    meta: "Icons · 320 icons",
    imageSrc: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
  },
  render: (args) => (
    <Wrapper>
      <LibraryAsset {...args} className="h-full" />
    </Wrapper>
  ),
};

export const SampleDefault: Story = {
  name: "Type / Sample",
  args: {
    type: "Sample",
    name: "Dashboard Template",
    meta: "Sample · 12 screens",
  },
  render: (args) => (
    <Wrapper>
      <LibraryAsset {...args} className="h-full" />
    </Wrapper>
  ),
};

export const SampleWithImage: Story = {
  name: "Type / Sample（with thumbnail）",
  args: {
    type: "Sample",
    name: "Mobile App Template",
    meta: "Sample · 24 screens",
    imageSrc: "https://images.unsplash.com/photo-1617040619263-41c5a9ca7521?w=400&q=80",
  },
  render: (args) => (
    <Wrapper>
      <LibraryAsset {...args} className="h-full" />
    </Wrapper>
  ),
};

export const UploadCard: Story = {
  name: "Type / Upload",
  args: { type: "Upload" },
  render: (args) => (
    <Wrapper>
      <LibraryAsset {...args} className="h-full" />
    </Wrapper>
  ),
};

// ─── Overview ─────────────────────────────────────────────────────────────────

export const AllTypes: Story = {
  name: "Overview / All Types",
  render: () => (
    <div className="flex gap-4">
      {(["Asset", "Sample", "Upload"] as const).map((type) => (
        <div key={type} style={{ width: 270, height: 280 }}>
          <LibraryAsset
            type={type}
            name={type !== "Upload" ? `${type} Example` : undefined}
            meta={type !== "Upload" ? "Library · 24 items" : undefined}
            className="h-full"
          />
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};
