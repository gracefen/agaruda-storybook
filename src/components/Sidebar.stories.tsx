import type { Meta, StoryObj } from "@storybook/react";
import { LayoutDashboard, Layers, Settings, FolderOpen, Users } from "lucide-react";
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

// const defaultSections = [
//   {
//     title: "Favorites",
//     items: [
//       { label: "AIDC Factory A", icon: <Layers size={16} />, active: true },
//       { label: "AIDC Factory B", icon: <Layers size={16} /> },
//     ],
//   },
//   {
//     title: "Features",
//     // action: true,
//     items: [
//       { label: "Sphere", icon: <FolderOpen size={16} /> },
//       { label: "Viz", icon: <FolderOpen size={16} /> },
//     ],
//   },
//   {
//     title: "Settings",
//     items: [
//       { label: "Members", icon: <Users size={16} /> },
//       { label: "Settings", icon: <Settings size={16} /> },
//     ],
//   },
// ];

export const WithSubItems: Story = {
  name: "Sidebar with Sub-items",
  render: () => (
    <div style={{ height: 520 }}>
      <Sidebar
        sections={[
          {
            title: "Favorites",
            items: [
              {
                label: "AIDC Factory A",
                icon: <Layers size={16} />,
                active: true,
                expanded: true,
                subItems: [
                  { label: "Demo Data Center A", active: true },
                  { label: "Demo Data Center B" },
                ],
              },
              { label: "AIDC Factory B", icon: <Layers size={16} /> },
            ],
          },
          {
            title: "Features",
            items: [
              {
                label: "Sphere",
                icon: <FolderOpen size={16} />,
                expanded: false,
                subItems: [
                  { label: "Workspaces" },
                  { label: "Global Library" },
                ],
              },
              { label: "Viz", icon: <FolderOpen size={16} /> },
            ],
          },
        ]}
      />
    </div>
  ),
  parameters: { controls: { disable: true } },
};

