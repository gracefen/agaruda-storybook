import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox, CheckboxGroup } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Agaruda DS/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    backgrounds: { default: "agaruda-purple" },
    docs: {
      description: {
        component: `
**Checkbox** — Agaruda Design System

Figma: \`↳ Checkbox\` · COMPONENT_SETs: Checkbox-Base（9 variants）、Checkbox（18 variants）、Checkbox-Group（3 variants）

| Prop | 說明 |
|---|---|
| \`selected\` | True / False / Intermediate |
| \`type\` | Default / Group item / Outlined |
| \`state\` | Default / Focus / Disabled |
| \`destructive\` | 紅色危險模式 |
| \`labelLeft\` | label 在左（true）/ 右（false，預設） |
      `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    selected: { control: "select", options: ["True", "False", "Intermediate"] },
    state: { control: "select", options: ["Default", "Focus", "Disabled"] },
    type: { control: "select", options: ["Default", "Group item", "Outlined"] },
    destructive: { control: "boolean" },
    labelLeft: { control: "boolean" },
    label: { control: "text" },
    description: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { label: "Accept terms and conditions", selected: "False" },
};

export const Checked: Story = {
  args: { label: "Notifications enabled", selected: "True" },
};

export const Intermediate: Story = {
  args: { label: "Select all", selected: "Intermediate" },
};

export const WithDescription: Story = {
  name: "With Description",
  args: { label: "Email notifications", description: "Receive emails about updates and activity.", selected: "True" },
};

export const Disabled: Story = {
  args: { label: "Cannot change this", selected: "True", state: "Disabled" },
};

export const Destructive: Story = {
  args: { label: "Delete all data", description: "This action cannot be undone.", destructive: true, selected: "False" },
};

export const Outlined: Story = {
  args: { label: "Outlined option", description: "Border highlights when selected.", type: "Outlined", selected: "False" },
  render: (args) => <div className="w-72"><Checkbox {...args} /></div>,
};

export const OutlinedChecked: Story = {
  name: "Outlined / Checked",
  args: { label: "Outlined option", description: "Border highlights when selected.", type: "Outlined", selected: "True" },
  render: (args) => <div className="w-72"><Checkbox {...args} /></div>,
};

export const LabelLeft: Story = {
  name: "Label Left",
  args: { label: "Toggle this option", selected: "False", labelLeft: true },
  render: (args) => <div className="w-72 flex"><Checkbox {...args} className="w-full justify-between" /></div>,
};

export const Group: Story = {
  name: "Checkbox Group",
  render: () => (
    <div className="w-72">
      <CheckboxGroup
        items={[
          { label: "Dashboard", selected: "True" },
          { label: "Analytics", description: "View reports and insights.", selected: "False" },
          { label: "Settings", selected: "False" },
        ]}
      />
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const AllStates: Story = {
  name: "Overview / All States",
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox label="Unchecked" selected="False" />
      <Checkbox label="Checked" selected="True" />
      <Checkbox label="Intermediate" selected="Intermediate" />
      <Checkbox label="Focus state" selected="False" state="Focus" />
      <Checkbox label="Disabled unchecked" selected="False" state="Disabled" />
      <Checkbox label="Disabled checked" selected="True" state="Disabled" />
      <Checkbox label="Destructive" selected="False" destructive />
    </div>
  ),
  parameters: { controls: { disable: true } },
};
