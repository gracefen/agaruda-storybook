import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "centered",
    backgrounds: { default: "agaruda-purple" },
    docs: {
      description: {
        component: `
**Breadcrumb** — Agaruda Design System

Figma: \`↳ Breadcrumb\` · Component Set \`Breadcrumb-Base\` (\`40000828:19083\`)

字型使用 **Geist** 14px Regular。Separator 使用 \`chevron-right\` 16×16px。

| Item Type | 說明 |
|---|---|
| \`Default\` | 可點擊的路徑節點，文字色 text-secondary |
| \`Active-Hover\` | 當前頁面，不可點擊，文字色 text-title |
| \`Dropdown\` | 帶 chevron-down 的可展開節點 |
| \`Ellipsis\` | 省略符號（路徑太長時使用） |
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    items: [
      { label: "Home", type: "Default" },
      { label: "Components", type: "Default" },
      { label: "Breadcrumb", type: "Active-Hover" },
    ],
  },
};

export const WithEllipsis: Story = {
  name: "With Ellipsis",
  args: {
    items: [
      { label: "Home", type: "Default" },
      { type: "Ellipsis" },
      { label: "Components", type: "Default" },
      { label: "Breadcrumb", type: "Active-Hover" },
    ],
  },
};

export const WithDropdown: Story = {
  name: "With Dropdown",
  args: {
    items: [
      { label: "Home", type: "Default" },
      { label: "Workspaces", type: "Dropdown" },
      { label: "Agaruda DS", type: "Active-Hover" },
    ],
  },
};

export const LongPath: Story = {
  name: "Long Path",
  args: {
    items: [
      { label: "Home", type: "Default" },
      { label: "Components", type: "Default" },
      { label: "Navigation", type: "Default" },
      { label: "Breadcrumb", type: "Default" },
      { label: "Examples", type: "Active-Hover" },
    ],
  },
};

export const TwoLevels: Story = {
  name: "Two Levels",
  args: {
    items: [
      { label: "Home", type: "Default" },
      { label: "Page", type: "Active-Hover" },
    ],
  },
};

// ─── Overview ─────────────────────────────────────────────────────────────────

export const AllItemTypes: Story = {
  name: "Overview / All Item Types",
  render: () => (
    <div className="flex flex-col gap-4 p-4 font-[Urbanist]">
      {(
        [
          { label: "Default", items: [{ label: "Breadcrumb", type: "Default" as const }] },
          { label: "Active-Hover", items: [{ label: "Breadcrumb", type: "Active-Hover" as const }] },
          { label: "Dropdown", items: [{ label: "Breadcrumb", type: "Dropdown" as const }] },
          { label: "Ellipsis", items: [{ type: "Ellipsis" as const }] },
        ]
      ).map(({ label, items }) => (
        <div key={label} className="flex items-center gap-4">
          <span className="text-[12px] text-[#91989e] w-24 shrink-0">{label}</span>
          <Breadcrumb items={items} />
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};
