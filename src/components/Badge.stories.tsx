import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Badge> = {
  title: "Agaruda DS/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    backgrounds: { default: "agaruda-purple" },
    docs: {
      description: {
        component: `
**Badge** — Agaruda Design System

Figma: \`↳ Badge\` · Component Set \`40000824:3353\`

| Prop | 說明 |
|---|---|
| \`type\` | Default / Secondary / Destructive / Outline |
| \`rounded\` | true（pill）/ false（方角 4px） |
| \`state\` | Default / Hover / Focus（Storybook 展示用） |
| \`children\` | Badge 文字 |
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["Default", "Secondary", "Destructive", "Outline"],
    },
    rounded: { control: "boolean" },
    state: {
      control: "select",
      options: ["Default", "Hover", "Focus"],
    },
    children: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// ─── Base variants ────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { type: "Default", rounded: true, children: "Badge" },
};

export const Secondary: Story = {
  args: { type: "Secondary", rounded: true, children: "Badge" },
};

export const Destructive: Story = {
  args: { type: "Destructive", rounded: true, children: "Badge" },
};

export const Outline: Story = {
  args: { type: "Outline", rounded: true, children: "Badge" },
};

// ─── Rounded variants ─────────────────────────────────────────────────────────

export const RoundedFalse: Story = {
  name: "Rounded / False（方角）",
  args: { type: "Default", rounded: false, children: "Badge" },
};

// ─── States ───────────────────────────────────────────────────────────────────

export const StateHover: Story = {
  name: "State / Hover",
  args: { type: "Default", rounded: true, state: "Hover", children: "Badge" },
};

export const StateFocus: Story = {
  name: "State / Focus",
  args: { type: "Default", rounded: true, state: "Focus", children: "Badge" },
};

// ─── Overview ────────────────────────────────────────────────────────────────

export const AllTypes: Story = {
  name: "Overview / All Types",
  render: () => (
    <div className="flex flex-col gap-4 p-6">
      {/* Rounded */}
      <div>
        <p className="text-[12px] text-[#91989e] mb-2 font-[Urbanist]">Rounded=True (Pill)</p>
        <div className="flex gap-2 flex-wrap">
          <Badge type="Default" rounded>Default</Badge>
          <Badge type="Secondary" rounded>Secondary</Badge>
          <Badge type="Destructive" rounded>Destructive</Badge>
          <Badge type="Outline" rounded>Outline</Badge>
        </div>
      </div>
      {/* Square */}
      <div>
        <p className="text-[12px] text-[#91989e] mb-2 font-[Urbanist]">Rounded=False</p>
        <div className="flex gap-2 flex-wrap">
          <Badge type="Default" rounded={false}>Default</Badge>
          <Badge type="Secondary" rounded={false}>Secondary</Badge>
          <Badge type="Destructive" rounded={false}>Destructive</Badge>
          <Badge type="Outline" rounded={false}>Outline</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const AllStates: Story = {
  name: "Overview / All States",
  render: () => (
    <div className="flex flex-col gap-3 p-6">
      {(["Default", "Hover", "Focus"] as const).map((state) => (
        <div key={state} className="flex items-center gap-3">
          <span className="text-[12px] text-[#91989e] w-16 font-[Urbanist]">{state}</span>
          <Badge type="Default" state={state}>{state}</Badge>
          <Badge type="Secondary" state={state}>{state}</Badge>
          <Badge type="Destructive" state={state}>{state}</Badge>
          <Badge type="Outline" state={state}>{state}</Badge>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};
