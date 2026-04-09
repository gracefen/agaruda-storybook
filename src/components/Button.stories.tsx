import type { Meta, StoryObj } from "@storybook/react";
import { Plus, ArrowRight, Trash2, Download, ChevronRight } from "lucide-react";
import { Button } from "./Button";

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
        { name: "white", value: "#ffffff" },
        { name: "dark", value: "#171d1f" },
      ],
    },
    docs: {
      description: {
        component: `
**Button** component — Agaruda Design System

從 Figma node \`40000972:709\` 自動產出。

| Prop | 說明 |
|---|---|
| \`type\` | Primary / Secondary / Outline / Ghost / Link / Link Secondary |
| \`size\` | md（36px）/ sm（32px） |
| \`state\` | Normal / Hover / Disabled / Focused / Loading |
| \`destructive\` | 危險操作模式（紅色，套用於所有 type） |
| \`iconLeading\` | 左側 icon（Lucide ReactNode） |
| \`iconTrailing\` | 右側 icon（Lucide ReactNode） |
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["Primary", "Secondary", "Outline", "Ghost", "Link", "Link Secondary"],
      description: "按鈕視覺類型",
    },
    size: {
      control: "radio",
      options: ["md", "sm"],
      description: "尺寸",
    },
    state: {
      control: "select",
      options: ["Normal", "Hover", "Disabled", "Focused", "Loading"],
      description: "互動狀態",
    },
    destructive: {
      control: "boolean",
      description: "危險操作（紅色）",
    },
    children: {
      control: "text",
      description: "按鈕文字",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ─── 基礎 Stories（對應 Figma 主要 variants）────────────────────────────────

export const Primary: Story = {
  args: {
    type: "Primary",
    size: "md",
    children: "Button",
    iconLeading: <Plus size={16} />,
  },
};

export const Secondary: Story = {
  args: {
    type: "Secondary",
    size: "md",
    children: "Button",
  },
};

export const Outline: Story = {
  args: {
    type: "Outline",
    size: "md",
    children: "Button",
    iconLeading: <Download size={16} />,
  },
};

export const Ghost: Story = {
  args: {
    type: "Ghost",
    size: "md",
    children: "Button",
  },
};

export const Link: Story = {
  args: {
    type: "Link",
    size: "md",
    children: "Button",
    iconTrailing: <ChevronRight size={16} />,
  },
};

export const LinkSecondary: Story = {
  name: "Link Secondary",
  args: {
    type: "Link Secondary",
    size: "md",
    children: "Button",
  },
};

// ─── Size Variants ────────────────────────────────────────────────────────────

export const SizeMd: Story = {
  name: "Size / md",
  args: {
    type: "Primary",
    size: "md",
    children: "Medium",
    iconLeading: <Plus size={16} />,
  },
};

export const SizeSm: Story = {
  name: "Size / sm",
  args: {
    type: "Primary",
    size: "sm",
    children: "Small",
    iconLeading: <Plus size={14} />,
  },
};

// ─── State Variants ───────────────────────────────────────────────────────────

export const StateHover: Story = {
  name: "State / Hover",
  args: {
    type: "Primary",
    size: "md",
    state: "Hover",
    children: "Hover",
    iconLeading: <Plus size={16} />,
  },
};

export const StateDisabled: Story = {
  name: "State / Disabled",
  args: {
    type: "Primary",
    size: "md",
    state: "Disabled",
    children: "Disabled",
  },
};

export const StateFocused: Story = {
  name: "State / Focused",
  args: {
    type: "Primary",
    size: "md",
    state: "Focused",
    children: "Focused",
    iconLeading: <Plus size={16} />,
  },
};

export const StateLoading: Story = {
  name: "State / Loading",
  args: {
    type: "Primary",
    size: "md",
    state: "Loading",
    children: "Loading",
  },
};

// ─── Destructive ──────────────────────────────────────────────────────────────

export const DestructivePrimary: Story = {
  name: "Destructive / Primary",
  args: {
    type: "Primary",
    size: "md",
    destructive: true,
    children: "Delete",
    iconLeading: <Trash2 size={16} />,
  },
};

export const DestructiveSecondary: Story = {
  name: "Destructive / Secondary",
  args: {
    type: "Secondary",
    size: "md",
    destructive: true,
    children: "Delete",
    iconLeading: <Trash2 size={16} />,
  },
};

export const DestructiveOutline: Story = {
  name: "Destructive / Outline",
  args: {
    type: "Outline",
    size: "md",
    destructive: true,
    children: "Delete",
    iconLeading: <Trash2 size={16} />,
  },
};

export const DestructiveGhost: Story = {
  name: "Destructive / Ghost",
  args: {
    type: "Ghost",
    size: "md",
    destructive: true,
    children: "Delete",
    iconLeading: <Trash2 size={16} />,
  },
};

export const DestructiveLink: Story = {
  name: "Destructive / Link",
  args: {
    type: "Link",
    size: "md",
    destructive: true,
    children: "Delete",
  },
};

export const DestructiveLinkSecondary: Story = {
  name: "Destructive / Link Secondary",
  args: {
    type: "Link Secondary",
    size: "md",
    destructive: true,
    children: "Delete",
  },
};

// ─── Icon Variants ────────────────────────────────────────────────────────────

export const IconLeadingOnly: Story = {
  name: "Icon / Leading only",
  args: {
    type: "Primary",
    size: "md",
    children: "Create",
    iconLeading: <Plus size={16} />,
  },
};

export const IconTrailingOnly: Story = {
  name: "Icon / Trailing only",
  args: {
    type: "Secondary",
    size: "md",
    children: "Next",
    iconTrailing: <ArrowRight size={16} />,
  },
};

export const IconBoth: Story = {
  name: "Icon / Both sides",
  args: {
    type: "Outline",
    size: "md",
    children: "Export",
    iconLeading: <Download size={16} />,
    iconTrailing: <ChevronRight size={16} />,
  },
};

// ─── Overview Stories ─────────────────────────────────────────────────────────

export const AllTypes: Story = {
  name: "Overview / All Types",
  render: () => (
    <div className="flex flex-wrap gap-3 p-6">
      <Button type="Primary" iconLeading={<Plus size={16} />}>Primary</Button>
      <Button type="Secondary">Secondary</Button>
      <Button type="Outline" iconLeading={<Download size={16} />}>Outline</Button>
      <Button type="Ghost">Ghost</Button>
      <Button type="Link" iconTrailing={<ChevronRight size={16} />}>Link</Button>
      <Button type="Link Secondary">Link Secondary</Button>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const AllSizes: Story = {
  name: "Overview / All Sizes",
  render: () => (
    <div className="flex items-center gap-4 p-6">
      <Button type="Primary" size="md" iconLeading={<Plus size={16} />}>Medium</Button>
      <Button type="Primary" size="sm" iconLeading={<Plus size={14} />}>Small</Button>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const AllStates: Story = {
  name: "Overview / All States",
  render: () => (
    <div className="flex flex-wrap items-center gap-4 p-6">
      <Button type="Primary" state="Normal" iconLeading={<Plus size={16} />}>Normal</Button>
      <Button type="Primary" state="Hover" iconLeading={<Plus size={16} />}>Hover</Button>
      <Button type="Primary" state="Focused" iconLeading={<Plus size={16} />}>Focused</Button>
      <Button type="Primary" state="Disabled">Disabled</Button>
      <Button type="Primary" state="Loading">Loading</Button>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const AllDestructive: Story = {
  name: "Overview / All Destructive",
  render: () => (
    <div className="flex flex-wrap gap-3 p-6">
      <Button type="Primary" destructive iconLeading={<Trash2 size={16} />}>Primary</Button>
      <Button type="Secondary" destructive iconLeading={<Trash2 size={16} />}>Secondary</Button>
      <Button type="Outline" destructive iconLeading={<Trash2 size={16} />}>Outline</Button>
      <Button type="Ghost" destructive iconLeading={<Trash2 size={16} />}>Ghost</Button>
      <Button type="Link" destructive>Link</Button>
      <Button type="Link Secondary" destructive>Link Secondary</Button>
    </div>
  ),
  parameters: { controls: { disable: true } },
};
