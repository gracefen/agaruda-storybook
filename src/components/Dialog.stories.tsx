import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "./Dialog";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "agaruda-purple" },
    docs: {
      description: {
        component: `
**Dialog** — Agaruda Design System

Figma: \`↳ Dialog\` · COMPONENT_SET \`Card-Base/Footer\`（4 variants）

Footer variants: Buttons（One / Two）× Align（Left / Center / Right）× Padding p-6

Glass 效果 + Overlay backdrop-blur。
      `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    open: { control: "boolean" },
    title: { control: "text" },
    description: { control: "text" },
    footerButtons: { control: "radio", options: ["One", "Two"] },
    footerAlign: { control: "radio", options: ["Left", "Center", "Right"] },
    confirmLabel: { control: "text" },
    cancelLabel: { control: "text" },
    destructive: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    open: true,
    title: "Confirm action",
    description: "Are you sure you want to proceed? This action may affect your workspace settings.",
    footerButtons: "Two",
    footerAlign: "Right",
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
  },
};

export const OneButton: Story = {
  name: "Footer / One Button",
  args: {
    open: true,
    title: "Update available",
    description: "A new version of the design system is available. Refresh to apply.",
    footerButtons: "One",
    footerAlign: "Center",
    confirmLabel: "Refresh",
  },
};

export const DestructiveAction: Story = {
  name: "Destructive Action",
  args: {
    open: true,
    title: "Delete workspace",
    description: "This will permanently delete your workspace and all associated files. This action cannot be undone.",
    footerButtons: "Two",
    footerAlign: "Right",
    confirmLabel: "Delete",
    cancelLabel: "Cancel",
    destructive: true,
  },
};

export const WithContent: Story = {
  name: "With Body Content",
  args: {
    open: true,
    title: "Export workspace",
    description: "Choose export options below.",
    footerButtons: "Two",
    footerAlign: "Right",
    confirmLabel: "Export",
    cancelLabel: "Cancel",
    children: (
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="format" defaultChecked />
          <span className="text-[14px] text-[#171d1f] font-[Urbanist]">PDF Document</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="format" />
          <span className="text-[14px] text-[#171d1f] font-[Urbanist]">PNG Images</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="format" />
          <span className="text-[14px] text-[#171d1f] font-[Urbanist]">SVG Files</span>
        </label>
      </div>
    ) as unknown as string,
  },
};

// ─── Overview ──────────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: "Overview / All Variants",
  render: () => {
    // Static panels（不帶 overlay）展示所有 footer 組合
    // Glass 兩層結構（cinta-glass.md）⚠️ blur 暫用 20px
    const glassPanelStyle: React.CSSProperties = {
      background: "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.5))",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(13,5,44,0.1)",
      boxShadow: "0px 5px 5px rgba(36,18,66,0.05), 0px 2px 2px rgba(36,18,66,0.04), 0px 1px 0px rgba(36,18,66,0.03)",
    };
    const glassInnerStyle: React.CSSProperties = {
      position: "absolute", inset: 0, borderRadius: "inherit",
      background: "rgba(0,0,0,0.004)", pointerEvents: "none",
    };

    const variants = [
      { label: "Two Buttons / Right", footer: "justify-end", buttons: ["Cancel", "Confirm"], primary: "Confirm" },
      { label: "Two Buttons / Left",  footer: "justify-start", buttons: ["Cancel", "Confirm"], primary: "Confirm" },
      { label: "One Button / Center", footer: "justify-center", buttons: ["Got it"], primary: "Got it" },
      { label: "Destructive / Right", footer: "justify-end", buttons: ["Cancel", "Delete"], primary: "Delete", destructive: true },
    ];

    return (
      <div className="flex flex-col gap-5" style={{ width: 440 }}>
        {variants.map(({ label, footer, buttons, primary, destructive }) => (
          <div key={label} className="relative rounded-[8px] overflow-hidden" style={glassPanelStyle}>
            <div style={glassInnerStyle} aria-hidden="true" />
            <div className="px-6 pt-5 pb-4">
              <p className="font-[Urbanist] text-[12px] font-semibold text-[#91989e] uppercase tracking-wider mb-1">{label}</p>
              <p className="font-[Urbanist] text-[16px] font-bold text-[#171d1f]">Dialog Title</p>
              <p className="font-[Urbanist] text-[14px] text-[#30363a] mt-0.5">Description text goes here.</p>
            </div>
            <hr className="border-0 border-t border-[rgba(13,5,44,0.08)]" />
            <div className={`flex gap-3 p-5 ${footer}`}>
              {buttons.map((btn) => (
                <button
                  key={btn}
                  className={`px-3 py-2 rounded-lg font-[Urbanist] text-[14px] font-semibold leading-[20px] ${
                    btn === primary
                      ? destructive
                        ? "bg-[#c5304e] text-[#f1f1f3]"
                        : "bg-[linear-gradient(to_top,#7522e0_11%,#a473f9_67%,#ab87fe_100%)] text-[#f1f1f3]"
                      : "bg-[#f9fafb] text-[#171d1f]"
                  }`}
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: { layout: "centered", controls: { disable: true } },
};
