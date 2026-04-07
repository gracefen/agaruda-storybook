import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Agaruda DS/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    backgrounds: { default: "agaruda-purple" },
    docs: {
      description: {
        component: `
**Switch** — Agaruda Design System

Figma: \`↳ Switch\` · COMPONENT_SETs: Switch-Base（12 variants）、Switch（18 variants）

| Prop | 說明 |
|---|---|
| \`selected\` | true / false |
| \`size\` | md（40×24px）/ sm（34×20px） |
| \`type\` | Default / Description（含說明文字） |
| \`state\` | Default / Focus / Disabled |
| \`destructive\` | 紅色危險模式 |
| \`labelLeft\` | label 在左（true）/ 右（false，預設） |
      `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    selected: { control: "boolean" },
    size: { control: "radio", options: ["md", "sm"] },
    type: { control: "radio", options: ["Default", "Description"] },
    state: { control: "select", options: ["Default", "Focus", "Disabled"] },
    destructive: { control: "boolean" },
    labelLeft: { control: "boolean" },
    label: { control: "text" },
    description: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: { label: "Enable notifications", selected: false },
};

export const Selected: Story = {
  args: { label: "Dark mode", selected: true },
};

export const WithDescription: Story = {
  name: "With Description",
  args: {
    label: "Auto-save",
    description: "Automatically save your changes every 30 seconds.",
    type: "Description",
    selected: true,
  },
};

export const LabelLeft: Story = {
  name: "Label Left",
  args: { label: "Compact view", selected: false, labelLeft: true },
  render: (args) => <div className="w-72 flex"><Switch {...args} className="w-full justify-between" /></div>,
};

export const SizeSm: Story = {
  name: "Size / sm",
  args: { label: "Small switch", selected: false, size: "sm" },
};

export const Disabled: Story = {
  args: { label: "Cannot change", selected: true, state: "Disabled" },
};

export const Destructive: Story = {
  args: { label: "Delete on logout", description: "All data will be permanently deleted.", type: "Description", destructive: true, selected: false },
};

export const AllStates: Story = {
  name: "Overview / All States",
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch label="Off" selected={false} />
      <Switch label="On" selected={true} />
      <Switch label="Focus" selected={false} state="Focus" />
      <Switch label="Disabled off" selected={false} state="Disabled" />
      <Switch label="Disabled on" selected={true} state="Disabled" />
      <Switch label="Destructive" selected={false} destructive />
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const AllSizes: Story = {
  name: "Overview / Sizes",
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch label="Size md (40×24px)" selected={true} size="md" />
      <Switch label="Size sm (34×20px)" selected={true} size="sm" />
    </div>
  ),
  parameters: { controls: { disable: true } },
};
