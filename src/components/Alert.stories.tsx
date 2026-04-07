import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Agaruda DS/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
    backgrounds: { default: "agaruda-purple" },
    docs: {
      description: {
        component:
          "**Alert** — Agaruda Design System\n\nFigma: `↳ Alert`（頁面設計中，依 Cinta 設計語言實作）\n\n| Variant | 用途 |\n|---|---|\n| `Info` | 一般提示（紫色） |\n| `Success` | 操作成功（綠色） |\n| `Warning` | 警告（黃色） |\n| `Error` | 錯誤（紅色） |",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["Info", "Success", "Warning", "Error"] },
    title: { control: "text" },
    description: { control: "text" },
    dismissible: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const InfoAlert: Story = {
  name: "Info",
  args: {
    variant: "Info",
    title: "Design system updated",
    description: "Cinta v1.2 has been released with new color tokens and spacing updates.",
    dismissible: true,
  },
  render: (args) => <div className="w-96"><Alert {...args} /></div>,
};

export const SuccessAlert: Story = {
  name: "Success",
  args: {
    variant: "Success",
    title: "Workspace created",
    description: "Your workspace has been successfully created and is ready to use.",
    dismissible: true,
  },
  render: (args) => <div className="w-96"><Alert {...args} /></div>,
};

export const WarningAlert: Story = {
  name: "Warning",
  args: {
    variant: "Warning",
    title: "Unsaved changes",
    description: "You have unsaved changes. Please save before leaving this page.",
  },
  render: (args) => <div className="w-96"><Alert {...args} /></div>,
};

export const ErrorAlert: Story = {
  name: "Error",
  args: {
    variant: "Error",
    title: "Something went wrong",
    description: "Failed to save your changes. Please try again or contact support.",
    dismissible: true,
  },
  render: (args) => <div className="w-96"><Alert {...args} /></div>,
};

export const TitleOnly: Story = {
  name: "Title Only",
  args: { variant: "Info", title: "New components available in Cinta DS." },
  render: (args) => <div className="w-96"><Alert {...args} /></div>,
};

export const AllVariants: Story = {
  name: "Overview / All Variants",
  render: () => (
    <div className="flex flex-col gap-3 w-96">
      <Alert variant="Info" title="Info" description="Informational message." dismissible />
      <Alert variant="Success" title="Success" description="Operation completed." dismissible />
      <Alert variant="Warning" title="Warning" description="Please review before continuing." />
      <Alert variant="Error" title="Error" description="Something went wrong." dismissible />
    </div>
  ),
  parameters: { controls: { disable: true } },
};
