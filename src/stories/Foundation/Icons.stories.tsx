import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import * as LucideIcons from "lucide-react";

// ─── Icon list (subset used in Cinta DS) ─────────────────────────────────────

const cintaIcons: { name: string; usage: string }[] = [
  { name: "ChevronRight",  usage: "Breadcrumb separator" },
  { name: "ChevronDown",   usage: "Dropdown trigger" },
  { name: "ChevronLeft",   usage: "Navigation back" },
  { name: "ChevronUp",     usage: "Collapse" },
  { name: "PanelLeft",     usage: "Breadcrumb home icon" },
  { name: "CirclePlus",    usage: "Sidebar Section action" },
  { name: "Plus",          usage: "Button icon (create)" },
  { name: "Ellipsis",      usage: "Breadcrumb Ellipsis" },
  { name: "List",          usage: "Tabs — List view" },
  { name: "Map",           usage: "Tabs — Map view" },
  { name: "Pencil",        usage: "Card — Edit action" },
  { name: "Eye",           usage: "Card — View action" },
  { name: "Trash2",        usage: "Destructive action" },
  { name: "Download",      usage: "Export" },
  { name: "ArrowRight",    usage: "Navigation" },
  { name: "Search",        usage: "Search bar" },
  { name: "Settings",      usage: "Settings" },
  { name: "LayoutDashboard", usage: "Dashboard nav" },
  { name: "Loader2",       usage: "Button loading spinner" },
  { name: "X",             usage: "Close / dismiss" },
  { name: "Check",         usage: "Confirm / checkbox" },
  { name: "AlertCircle",   usage: "Alert — warning" },
  { name: "Info",          usage: "Alert — info" },
  { name: "CheckCircle2",  usage: "Alert — success" },
  { name: "XCircle",       usage: "Alert — error" },
  { name: "GripVertical",  usage: "Drag handle" },
  { name: "MoreVertical",  usage: "Context menu" },
  { name: "Filter",        usage: "Filter action" },
  { name: "SlidersHorizontal", usage: "Sort / adjust" },
  { name: "Copy",          usage: "Copy to clipboard" },
];

// ─── Story Component ──────────────────────────────────────────────────────────

function IconsPage() {
  const [query, setQuery] = useState("");
  const [size, setSize] = useState<16 | 20 | 24>(16);
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = cintaIcons.filter(
    (i) =>
      i.name.toLowerCase().includes(query.toLowerCase()) ||
      i.usage.toLowerCase().includes(query.toLowerCase())
  );

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(`<${name} size={${size}} />`);
    setCopied(name);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="font-[Urbanist] p-8 max-w-4xl">
      <h1 className="text-[40px] font-semibold leading-[60px] text-[#171d1f] mb-2">
        Icons
      </h1>
      <p className="text-[16px] leading-[20px] text-[#30363a] mb-8">
        Cinta DS 使用 <strong>Lucide Icons</strong>。禁止混用其他 icon 套件。
      </p>

      {/* Controls */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="flex-1 flex items-center gap-2 rounded-[8px] px-3 h-9"
          style={{ background: "rgba(250,252,252,0.6)", border: "1px solid rgba(13,5,44,0.1)" }}
        >
          <LucideIcons.Search size={14} className="text-[#91989e] shrink-0" />
          <input
            type="text"
            placeholder="搜尋 icon 名稱或用途..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-[14px] text-[#171d1f] placeholder:text-[#91989e] outline-none"
          />
        </div>

        {/* Size toggle */}
        <div
          className="flex rounded-[8px] overflow-hidden"
          style={{ border: "1px solid rgba(13,5,44,0.1)" }}
        >
          {([16, 20, 24] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className="px-3 h-9 text-[12px] font-semibold transition-colors"
              style={{
                background: size === s ? "rgba(13,5,44,0.1)" : "rgba(250,252,252,0.6)",
                color: size === s ? "#171d1f" : "#91989e",
              }}
            >
              {s}px
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-3">
        {filtered.map(({ name, usage }) => {
          const Icon = (LucideIcons as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[name];
          if (!Icon) return null;
          const isCopied = copied === name;

          return (
            <button
              key={name}
              onClick={() => handleCopy(name)}
              className="group relative flex flex-col items-center gap-2 rounded-[8px] p-4 text-center transition-all"
              style={{
                background: isCopied
                  ? "rgba(117,34,224,0.08)"
                  : "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.5))",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: `1px solid ${isCopied ? "rgba(117,34,224,0.3)" : "rgba(13,5,44,0.1)"}`,
                boxShadow: "0px 5px 5px rgba(36,18,66,0.05), 0px 2px 2px rgba(36,18,66,0.04), 0px 1px 0px rgba(36,18,66,0.03)",
              }}
            >
              <div className="w-8 h-8 flex items-center justify-center text-[#171d1f]">
                <Icon size={size} />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-[#171d1f] break-all">{name}</p>
                <p className="text-[10px] text-[#91989e] mt-0.5">{usage}</p>
              </div>

              {/* Copy hint */}
              <div className="absolute inset-0 flex items-center justify-center rounded-[8px] opacity-0 group-hover:opacity-100 transition-opacity bg-white/60">
                <span className="text-[11px] font-semibold text-[#7522e0]">
                  {isCopied ? "Copied!" : "Click to copy"}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-[14px] text-[#91989e] text-center py-12">
          找不到符合的 icon
        </p>
      )}

      <p className="mt-8 text-[12px] text-[#91989e]">
        點擊任一 icon 可複製 JSX 語法。完整 Lucide icon 列表見{" "}
        <span className="text-[#7522e0]">lucide.dev</span>
      </p>
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Agaruda DS/Foundation/Icons",
  component: IconsPage,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "agaruda-purple" },
    docs: {
      description: {
        component: "Cinta DS 使用 Lucide Icons。點擊任一 icon 可複製 JSX 語法。",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Icon Gallery",
};
