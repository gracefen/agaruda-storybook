import type { Meta, StoryObj } from "@storybook/react";
import { LayoutDashboard, Layers, Settings, Search, FileText, Users } from "lucide-react";
import { Command } from "./Command";

const meta: Meta<typeof Command> = {
  title: "Components/Command",
  component: Command,
  parameters: {
    layout: "centered",
    backgrounds: { default: "agaruda-purple" },
    docs: {
      description: {
        component:
          "**Command** — Agaruda Design System\n\nFigma: `↳ Command`（頁面設計中，依 Cinta 設計語言實作）\n\n搜尋 + 鍵盤導覽的 Command Palette。支援分組、icon、description。",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    emptyText: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Command>;

const sampleItems = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={16} />, group: "Navigation" },
  { id: "workspaces", label: "Workspaces", description: "Browse all workspaces", icon: <Layers size={16} />, group: "Navigation" },
  { id: "search", label: "Search", description: "Search across all content", icon: <Search size={16} />, group: "Navigation" },
  { id: "new-workspace", label: "New Workspace", description: "Create a new workspace", icon: <FileText size={16} />, group: "Actions" },
  { id: "invite", label: "Invite Members", description: "Add team members", icon: <Users size={16} />, group: "Actions" },
  { id: "settings", label: "Settings", description: "Manage preferences", icon: <Settings size={16} />, group: "Actions" },
];

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 380 }}>
      <Command {...args} items={sampleItems} />
    </div>
  ),
  args: { placeholder: "Search commands..." },
};

export const NoGroups: Story = {
  name: "No Groups",
  render: (args) => (
    <div style={{ width: 380 }}>
      <Command
        {...args}
        items={sampleItems.map(({ group: _g, ...i }) => i)}
      />
    </div>
  ),
  args: { placeholder: "Search..." },
};

export const Empty: Story = {
  name: "Empty State",
  render: () => (
    <div style={{ width: 380 }}>
      <Command items={[]} emptyText="No commands available." />
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const AllVariants: Story = {
  name: "Overview / All Variants",
  render: () => (
    <div className="flex gap-6 items-start">
      <div>
        <p className="font-[Urbanist] text-[12px] text-[#91989e] mb-2">With Groups</p>
        <div style={{ width: 320 }}>
          <Command items={sampleItems} placeholder="Search commands..." />
        </div>
      </div>
      <div>
        <p className="font-[Urbanist] text-[12px] text-[#91989e] mb-2">Without Groups</p>
        <div style={{ width: 320 }}>
          <Command
            items={sampleItems.map(({ group: _g, ...i }) => i)}
            placeholder="Search..."
          />
        </div>
      </div>
      <div>
        <p className="font-[Urbanist] text-[12px] text-[#91989e] mb-2">Empty</p>
        <div style={{ width: 280 }}>
          <Command items={[]} emptyText="No results." />
        </div>
      </div>
    </div>
  ),
  parameters: { layout: "centered", controls: { disable: true } },
};
