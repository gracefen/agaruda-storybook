import type { Meta, StoryObj } from "@storybook/react";
import { LayoutDashboard, Layers, Settings, FolderOpen, Users, BarChart2 } from "lucide-react";
import { Sidebar } from "./Sidebar";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "centered",
    backgrounds: { default: "agaruda-purple" },
    docs: {
      description: {
        component: `
**Sidebar** — Agaruda Design System

Figma: \`↳ Sidebar\` · 依 \`cinta-layout.md\` 規範實作

- 寬度：**240px 固定**
- Glass 效果（backdrop-blur + gradient）
- Header padding：24px 四邊（space-xl）
- Section padding：top/bottom 8px，left/right 16px（space-m）
- Section 間 gap：8px（space-xs）
- Active 狀態：\`utility-purple-a10\` 背景
      `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

const defaultSections = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", icon: <LayoutDashboard size={16} />, active: true },
      { label: "Workspaces", icon: <Layers size={16} /> },
      { label: "Analytics", icon: <BarChart2 size={16} /> },
    ],
  },
  {
    title: "Workspace",
    action: true,
    items: [
      { label: "Agaruda DS", icon: <FolderOpen size={16} /> },
      { label: "Digital Twins", icon: <FolderOpen size={16} /> },
      { label: "AI-DCIM", icon: <FolderOpen size={16} /> },
    ],
  },
  {
    title: "Settings",
    items: [
      { label: "Members", icon: <Users size={16} /> },
      { label: "Settings", icon: <Settings size={16} /> },
    ],
  },
];

export const Default: Story = {
  render: () => (
    <div style={{ height: 600 }}>
      <Sidebar sections={defaultSections} />
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const WithAction: Story = {
  name: "Section with + Action",
  render: () => (
    <div style={{ height: 500 }}>
      <Sidebar
        sections={[
          {
            title: "Projects",
            action: true,
            onAction: () => alert("Add project"),
            items: [
              { label: "Agaruda DS", icon: <FolderOpen size={16} />, active: true },
              { label: "Component Library", icon: <FolderOpen size={16} /> },
            ],
          },
        ]}
      />
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const AllVariants: Story = {
  name: "Overview / All Variants",
  render: () => (
    <div className="flex gap-6 items-start">
      {/* Default */}
      <div>
        <p className="font-[Urbanist] text-[12px] text-[#91989e] mb-2">Default</p>
        <div style={{ height: 480 }}>
          <Sidebar sections={defaultSections} />
        </div>
      </div>
      {/* Section with action */}
      <div>
        <p className="font-[Urbanist] text-[12px] text-[#91989e] mb-2">Section action=true</p>
        <div style={{ height: 480 }}>
          <Sidebar
            sections={[
              {
                title: "Projects",
                action: true,
                items: [
                  { label: "Agaruda DS", icon: <LayoutDashboard size={16} />, active: true },
                  { label: "Digital Twins", icon: <Layers size={16} /> },
                ],
              },
              {
                title: "Settings",
                items: [
                  { label: "Members", icon: <Users size={16} /> },
                  { label: "Settings", icon: <Settings size={16} /> },
                ],
              },
            ]}
          />
        </div>
      </div>
    </div>
  ),
  parameters: { layout: "centered", controls: { disable: true } },
};

export const InLayout: Story = {
  name: "In Layout（Sidebar + Content）",
  render: () => (
    <div className="flex gap-0 rounded-[8px] overflow-hidden" style={{ width: 900, height: 600, background: "#e6e4ed" }}>
      <Sidebar sections={defaultSections} className="rounded-none rounded-l-[8px] shrink-0" />
      <div className="flex-1 p-8">
        <h1 className="font-[Urbanist] text-[40px] font-semibold leading-[60px] text-[#171d1f]">
          Workspaces
        </h1>
        <p className="font-[Urbanist] text-[16px] leading-[20px] text-[#30363a] mt-2">
          Content Area — padding: 32px（space-2xl）
        </p>
      </div>
    </div>
  ),
  parameters: { layout: "fullscreen", controls: { disable: true } },
};
