import type { Meta, StoryObj } from "@storybook/react";
import { Plus, ArrowRight, Trash2, Download, ChevronRight } from "lucide-react";
import { Button } from "./Button";

// ─── Icon Mapping ─────────────────────────────────────────────────────────────
// Controls 顯示 string key，Storybook 透過 mapping 轉換成實際 ReactNode 傳入 Button

const ICON_MAP = {
  "(none)":      undefined,
  "Plus":        <Plus size={16} />,
  "ArrowRight":  <ArrowRight size={16} />,
  "Download":    <Download size={16} />,
  "ChevronRight":<ChevronRight size={16} />,
  "Trash2":      <Trash2 size={16} />,
} as const;

type IconKey = keyof typeof ICON_MAP;

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "agaruda-purple",
      values: [
        { name: "agaruda-purple", value: "#e6e4ed" },
        { name: "white",          value: "#ffffff"  },
        { name: "dark",           value: "#171d1f"  },
      ],
    },
    docs: {
      description: {
        component: `
**Button** — Agaruda Design System · Figma node \`40000972:709\`

| Prop | 說明 |
|---|---|
| \`type\` | Primary / Secondary / Outline / Ghost / Link / Link Secondary |
| \`size\` | \`md\`（36px height） / \`sm\`（32px height） |
| \`state\` | Normal / Hover / Disabled / Focused / Loading |
| \`destructive\` | 危險操作紅色模式，套用於所有 type |
| \`iconLeading\` | 左側 Lucide icon |
| \`iconTrailing\` | 右側 Lucide icon |
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    // ── Appearance ──────────────────────────────────────────────────────────
    type: {
      control: "select",
      options: ["Primary", "Secondary", "Outline", "Ghost", "Link", "Link Secondary"],
      description: "按鈕視覺類型",
      table: { category: "Appearance" },
    },
    size: {
      control: "inline-radio",
      options: ["md", "sm"],
      description: "尺寸　md = 36px　sm = 32px",
      table: { category: "Appearance" },
    },
    state: {
      control: "select",
      options: ["Normal", "Hover", "Disabled", "Focused", "Loading"],
      description: "互動狀態（用於 Storybook 靜態展示）",
      table: { category: "Appearance" },
    },
    destructive: {
      control: "boolean",
      description: "危險操作模式（紅色）",
      table: { category: "Appearance" },
    },
    // ── Content ─────────────────────────────────────────────────────────────
    children: {
      control: "text",
      description: "按鈕文字",
      table: { category: "Content" },
    },
    iconLeading: {
      control: "select",
      options: Object.keys(ICON_MAP) as IconKey[],
      mapping: ICON_MAP,
      description: "左側 icon（選 (none) 隱藏）",
      table: { category: "Content" },
    },
    iconTrailing: {
      control: "select",
      options: Object.keys(ICON_MAP) as IconKey[],
      mapping: ICON_MAP,
      description: "右側 icon（選 (none) 隱藏）",
      table: { category: "Content" },
    },
    // ── Hidden ──────────────────────────────────────────────────────────────
    onClick:    { action: "clicked",   table: { disable: true } },
    className:  { table: { disable: true } },
    disabled:   { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ─── Playground ───────────────────────────────────────────────────────────────
// 所有 Controls 開啟，自由調整所有 prop 組合

export const Playground: Story = {
  name: "Playground",
  args: {
    type:        "Primary",
    size:        "md",
    state:       "Normal",
    destructive: false,
    children:    "Button",
  },
};

// ─── Styles ───────────────────────────────────────────────────────────────────

export const Styles: Story = {
  name: "Styles",
  render: () => (
    <div className="flex flex-wrap gap-3 p-4">
      <Button type="Primary"       iconLeading={<Plus size={16} />}>Primary</Button>
      <Button type="Secondary">Secondary</Button>
      <Button type="Outline"       iconLeading={<Download size={16} />}>Outline</Button>
      <Button type="Ghost">Ghost</Button>
      <Button type="Link"          iconTrailing={<ChevronRight size={16} />}>Link</Button>
      <Button type="Link Secondary" iconTrailing={<ArrowRight size={16} />}>Link Secondary</Button>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

// ─── States ───────────────────────────────────────────────────────────────────

export const States: Story = {
  name: "States",
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-4">
      <Button type="Primary" state="Normal"   iconLeading={<Plus size={16} />}>Normal</Button>
      <Button type="Primary" state="Hover"    iconLeading={<Plus size={16} />}>Hover</Button>
      <Button type="Primary" state="Focused"  iconLeading={<Plus size={16} />}>Focused</Button>
      <Button type="Primary" state="Disabled">Disabled</Button>
      <Button type="Primary" state="Loading">Loading</Button>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

// ─── Destructive ──────────────────────────────────────────────────────────────
// 全類型一覽，搭配 Trash2 icon

export const Destructive: Story = {
  name: "Destructive",
  render: () => (
    <div className="flex flex-wrap gap-3 p-4">
      <Button type="Primary"       destructive iconLeading={<Trash2 size={16} />}>Delete</Button>
      <Button type="Secondary"     destructive iconLeading={<Trash2 size={16} />}>Delete</Button>
      <Button type="Outline"       destructive iconLeading={<Trash2 size={16} />}>Delete</Button>
      <Button type="Ghost"         destructive iconLeading={<Trash2 size={16} />}>Delete</Button>
      <Button type="Link"          destructive>Delete</Button>
      <Button type="Link Secondary" destructive>Delete</Button>
    </div>
  ),
  parameters: { controls: { disable: true } },
};
