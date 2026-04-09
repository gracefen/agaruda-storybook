import type { Meta, StoryObj } from "@storybook/react";
import { Search, Eye, Mail } from "lucide-react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
    backgrounds: { default: "agaruda-purple" },
    docs: {
      description: {
        component: `
**Input** — Agaruda Design System

Figma: \`↳ Input\` · COMPONENT_SET \`Input\`（80 variants）

| Prop | 說明 |
|---|---|
| \`size\` | md（40px）/ sm（36px） |
| \`inputType\` | text / file / email / password 等 |
| \`label\` | 有 label 時增加上方文字 |
| \`horizontal\` | true = label 在左 / false = label 在上 |
| \`destructive\` | 紅色邊框 + 錯誤狀態 |
| \`state\` | Default / Focus-Empty / Focus-Filled / Disabled |
      `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "radio", options: ["md", "sm"] },
    inputType: { control: "select", options: ["text", "email", "password", "number", "search", "url", "file"] },
    label: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    destructive: { control: "boolean" },
    horizontal: { control: "boolean" },
    state: { control: "select", options: ["Default", "Focus-Empty", "Focus-Filled", "Disabled"] },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// ─── Base stories ─────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { size: "md", placeholder: "Enter text..." },
  render: (args) => <div className="w-80"><Input {...args} /></div>,
};

export const WithLabel: Story = {
  name: "With Label",
  args: { size: "md", label: "Email address", placeholder: "you@example.com", inputType: "email" },
  render: (args) => <div className="w-80"><Input {...args} /></div>,
};

export const WithHelper: Story = {
  name: "With Helper Text",
  args: { size: "md", label: "Username", placeholder: "Enter username", helperText: "Must be at least 3 characters." },
  render: (args) => <div className="w-80"><Input {...args} /></div>,
};

export const WithPrefixIcon: Story = {
  name: "With Prefix Icon",
  args: { size: "md", placeholder: "Search...", prefixIcon: <Search size={16} /> },
  render: (args) => <div className="w-80"><Input {...args} /></div>,
};

export const WithSuffixIcon: Story = {
  name: "With Suffix Icon",
  args: { size: "md", label: "Password", placeholder: "••••••••", inputType: "password", suffixIcon: <Eye size={16} /> },
  render: (args) => <div className="w-80"><Input {...args} /></div>,
};

export const Destructive: Story = {
  args: { size: "md", label: "Email", placeholder: "you@example.com", destructive: true, helperText: "This email is already taken." },
  render: (args) => <div className="w-80"><Input {...args} /></div>,
};

export const Disabled: Story = {
  args: { size: "md", label: "Read-only field", placeholder: "Cannot be edited", state: "Disabled" },
  render: (args) => <div className="w-80"><Input {...args} /></div>,
};

export const Horizontal: Story = {
  name: "Horizontal（Label Left）",
  args: { size: "md", label: "Name", placeholder: "Enter name", horizontal: true },
  render: (args) => <div className="w-96"><Input {...args} /></div>,
};

export const SizeSm: Story = {
  name: "Size / sm",
  args: { size: "sm", placeholder: "Small input..." },
  render: (args) => <div className="w-80"><Input {...args} /></div>,
};

// ─── Overview ─────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: "Overview / Sizes",
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input size="md" label="Size md (40px)" placeholder="Medium input" />
      <Input size="sm" label="Size sm (36px)" placeholder="Small input" />
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const AllStates: Story = {
  name: "Overview / States",
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input label="Default" placeholder="Default state" prefixIcon={<Mail size={16} />} />
      <Input label="Destructive" placeholder="Error state" destructive helperText="Something went wrong." />
      <Input label="Disabled" placeholder="Cannot edit" state="Disabled" />
    </div>
  ),
  parameters: { controls: { disable: true } },
};
