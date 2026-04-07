import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "./ScrollArea";

const meta: Meta<typeof ScrollArea> = {
  title: "Agaruda DS/Scroll Area",
  component: ScrollArea,
  parameters: {
    layout: "centered",
    backgrounds: { default: "agaruda-purple" },
    docs: {
      description: {
        component:
          "**Scroll Area** — Agaruda Design System\n\nFigma: `↳ Scroll Area`（依 cinta-glass.md Scrollbar 規範實作）\n\nScrollbar：8px 寬，pill 圓角，`utility-purple-a20`（rgba(13,5,44,0.2)），不佔版型空間。",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    maxHeight: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

const ListContent = () => (
  <ul className="py-2">
    {Array.from({ length: 20 }, (_, i) => (
      <li
        key={i}
        className="px-4 py-2.5 border-b border-[rgba(13,5,44,0.06)] last:border-0
          font-[Urbanist] text-[14px] leading-[20px] text-[#171d1f]
          hover:bg-[rgba(13,5,44,0.03)] transition-colors"
      >
        <span className="font-semibold">Item {i + 1}</span>
        <span className="text-[#91989e] ml-2">Description for item {i + 1}</span>
      </li>
    ))}
  </ul>
);

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <ScrollArea {...args}>
        <ListContent />
      </ScrollArea>
    </div>
  ),
  args: { maxHeight: 300 },
};

export const Tall: Story = {
  name: "Tall Content",
  render: () => (
    <div style={{ width: 320 }}>
      <ScrollArea maxHeight={400}>
        <ListContent />
      </ScrollArea>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const ShortMaxHeight: Story = {
  name: "Short Max Height",
  render: () => (
    <div style={{ width: 320 }}>
      <ScrollArea maxHeight={160}>
        <ListContent />
      </ScrollArea>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const AllVariants: Story = {
  name: "Overview / All Variants",
  render: () => (
    <div className="flex gap-5 items-start">
      {[
        { label: "maxHeight: 160px", maxHeight: 160 },
        { label: "maxHeight: 260px", maxHeight: 260 },
        { label: "maxHeight: 400px", maxHeight: 400 },
      ].map(({ label, maxHeight }) => (
        <div key={label}>
          <p className="font-[Urbanist] text-[12px] text-[#91989e] mb-2">{label}</p>
          <div style={{ width: 220 }}>
            <ScrollArea maxHeight={maxHeight}>
              <ListContent />
            </ScrollArea>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { layout: "centered", controls: { disable: true } },
};
