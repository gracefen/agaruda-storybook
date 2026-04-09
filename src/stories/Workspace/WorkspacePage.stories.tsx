import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  Plus, ChevronRight, ChevronDown,
  FolderOpen, Clock, Globe2, BarChart2, Layers, BookOpen,
} from "lucide-react";
import { Card } from "@/components/Card";
import { Breadcrumb } from "@/components/Breadcrumb";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Workspace/Cinta",
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "agaruda-purple" },
    docs: {
      description: {
        component: `

Figma: \`node 40002355:178073\` · File: \`(For test) Design System\`

1440 × 1024px 完整頁面，逐一對齊 Figma 元件：

| 區塊 | 元件 | 說明 |
|---|---|---|
| Sidebar | CintaSidebar（自訂） | Favorites / Recent / Features，含展開的 Cinta Sphere |
| Search Row | SearchRow | Tabs（List + Map view toggle） |
| Section 1 | Intro + Card(Blank) | Upload CTA |
| Section 2 | 2× Card(Top IMG) | Pre-built Scenes |
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

// ─── Design Tokens（直接讀自 Figma） ──────────────────────────────────────────

// Glass Panel：backdrop-blur:20px + 漸層白 + 三層紫底 shadow + border
const glassCard: React.CSSProperties = {
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  background: "linear-gradient(to bottom, rgba(255,255,255,0.6) 9%, rgba(255,255,255,0.5) 90%)",
  border: "1px solid rgba(13,5,44,0.1)",
  boxShadow:
    "0px 5px 5px rgba(36,18,66,0.05), 0px 2px 2px rgba(36,18,66,0.04), 0px 1px 0px rgba(36,18,66,0.03)",
  borderRadius: 8,
};

// Glass Input：Search-Bar / Sort / Tabs 共用底色
const glassInput: React.CSSProperties = {
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  background: "rgba(250,252,252,0.6)",
  border: "1px solid rgba(13,5,44,0.1)",
};

// 紫色漸層：stops 11% #7522e0 → 67% #a573fa → 100% rgba(171,135,254,0.6)
const purpleGradient =
  "linear-gradient(to top, #7522e0 11%, #a573fa 67%, rgba(171,135,254,0.6) 100%)";

// Glass 內層：rgba(0,0,0,0.004)，模擬 Figma GLASS effect
const glassInner: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  borderRadius: "inherit",
  background: "rgba(0,0,0,0.004)",
  pointerEvents: "none",
};

// ─── Earth 球體裝飾背景 ────────────────────────────────────────────────────────
// Figma: x:478, y:232, 1392×1392
// 4 層：Ellipse1(#f6f6f6→#dcdaff) + Ground(紫色大陸) + 立體深度 + Light(模糊白光)

function EarthBg() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: 478,
        top: 232,
        width: 1392,
        height: 1392,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Layer 1：Ellipse 1 — 淺灰→淺紫漸層底球 */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "linear-gradient(135deg, #f6f6f6 0%, #dcdaff 100%)" }} />
      {/* Layer 2：Ground/Union — 紫色大陸（rgb(131,125,246)→rgb(235,234,255)） */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(ellipse at 60% 70%, rgba(131,125,246,0.55) 0%, rgba(235,234,255,0.3) 60%, transparent 80%)" }} />
      {/* Layer 3：Ellipse 2 — 球體立體感 */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.12) 100%)" }} />
      {/* Layer 4：Light — 右上白色光暈，blur:70px 近似 */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(ellipse at 72% 20%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.15) 35%, transparent 60%)", filter: "blur(20px)" }} />
    </div>
  );
}

// ─── Cinta Sidebar ────────────────────────────────────────────────────────────
// Figma: 240×984, glass panel
// Header(82px) ← Logo Cinta（圖標 + wordmark）
// Content ← Section × 3（Favorites / Recent / Features）
// Section pattern:
//   GroupTitle: label(12px/400/#30363a) + + button
//   List: Sidebar Base / Group → Item(14px/400/#171d1f) + shortcut(12px/#687278) + chevron

function SidebarGroupTitle({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 28,
        padding: "6px 8px",
      }}
    >
      {/* Label: Figma 12px/400/#30363a */}
      <span style={{ fontFamily: "Urbanist,sans-serif", fontSize: 12, fontWeight: 400, lineHeight: "16px", color: "#30363a", flex: 1 }}>
        {label}
      </span>
      {/* + Button: 20×20, radius:6 */}
      <button
        style={{ width: 20, height: 20, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "none", cursor: "pointer", color: "#91989e" }}
      >
        <Plus size={12} />
      </button>
    </div>
  );
}

interface SubItem {
  label: string;
  active?: boolean;
}

interface SidebarItemProps {
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  active?: boolean;
  expanded?: boolean;
  isInner?: boolean;
  subItems?: SubItem[];
}

// Sidebar Base / Item: w:208, h:32, padding:6 8, gap:8, radius:4
// Active（InnerItem 01）: fill #0d052c（solid）, text white
// 有 subItems 時可點擊展開 / 收合子分類清單
function SidebarItem({ label, icon, shortcut = "⌘P", active, expanded: defaultExpanded = false, isInner, subItems }: SidebarItemProps) {
  const hasSubItems = !!(subItems && subItems.length > 0);
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  // 有 subItems 用 state 控制；無 subItems 用傳入的 expanded prop
  const showExpanded = hasSubItems ? isExpanded : defaultExpanded;

  return (
    <div>
      {/* ── Item Row ── */}
      <div
        onClick={() => hasSubItems && setIsExpanded((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "6px 8px",
          gap: 8,
          borderRadius: 4,
          height: 32,
          cursor: "pointer",
          background: active ? "#0d052c" : "transparent",
          minWidth: 0,
        }}
      >
        {/* Icon Leading: 16×16 */}
        {icon && (
          <span style={{ flexShrink: 0, width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {React.isValidElement(icon)
              ? React.cloneElement(icon as React.ReactElement<{ size?: number; style?: React.CSSProperties }>, {
                  size: 14,
                  style: { color: active ? "rgba(255,255,255,0.7)" : "#91989e" },
                })
              : icon}
          </span>
        )}
        {/* Label: 14px/400/#171d1f */}
        <span style={{ flex: 1, fontFamily: "Urbanist,sans-serif", fontSize: 14, fontWeight: 400, lineHeight: "20px", color: active ? "#ffffff" : "#171d1f", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {label}
        </span>
        {/* Shortcut: 12px/400/#687278 */}
        <span style={{ fontFamily: "Urbanist,sans-serif", fontSize: 12, fontWeight: 400, color: active ? "rgba(255,255,255,0.5)" : "#687278", flexShrink: 0 }}>
          {shortcut}
        </span>
        {/* Icon Trailing: chevron */}
        <span style={{ flexShrink: 0, width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {showExpanded
            ? <ChevronDown size={12} style={{ color: active ? "rgba(255,255,255,0.6)" : "#91989e" }} />
            : <ChevronRight size={12} style={{ color: active ? "rgba(255,255,255,0.6)" : "#91989e" }} />}
        </span>
      </div>

      {/* ── Sub-items List（展開時顯示）── */}
      {hasSubItems && isExpanded && (
        <div style={{ paddingLeft: 8, display: "flex", flexDirection: "column", gap: 1 }}>
          {subItems!.map((item) => (
            <div
              key={item.label}
              style={{
                height: 28,
                padding: "4px 8px 4px 10px",
                borderRadius: 4,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                borderLeft: item.active ? "2px solid #7522e0" : "2px solid transparent",
                background: item.active ? "rgba(117,34,224,0.06)" : "transparent",
              }}
            >
              <span style={{
                fontFamily: "Urbanist,sans-serif",
                fontSize: 13,
                fontWeight: item.active ? 500 : 400,
                lineHeight: "20px",
                color: item.active ? "#171d1f" : "#30363a",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CintaSidebar() {
  return (
    <div
      style={{
        ...glassCard,
        width: 240,
        height: 984,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Glass 內層 */}
      <div style={glassInner} aria-hidden="true" />

      {/* ── Header: 82px, padding:24 all ───────────────────────────────────── */}
      {/* Figma: Logo Cinta（Icon 25×25 + Cinta-Logo+Name 139×34, gap:6.8） */}
      <div
        style={{
          height: 82,
          padding: 24,
          borderBottom: "1px solid rgba(13,5,44,0.06)",
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          {/* Cinta Logo mark（Figma: 2 purple vectors #7522e0，26×26） */}
          <div style={{ width: 26, height: 26, flexShrink: 0, position: "relative" }}>
            <div
              style={{
                position: "absolute",
                width: 18,
                height: 18,
                background: purpleGradient,
                borderRadius: 4,
                transform: "rotate(45deg)",
                top: 4,
                left: 4,
              }}
            />
          </div>
          {/* Cinta wordmark（Figma: Cinta-Name vectors，color #000） */}
          <span style={{ fontFamily: "Urbanist,sans-serif", fontSize: 18, fontWeight: 700, color: "#171d1f", letterSpacing: "-0.01em" }}>
            Cinta
          </span>
        </div>
      </div>

      {/* ── Content: gap:8, padding-bottom:8 ───────────────────────────────── */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 8, paddingBottom: 8, flex: 1, overflowY: "auto", position: "relative", zIndex: 1 }}>

        {/* Section 1: Favorites (padding: 8 16) */}
        <div style={{ padding: "8px 16px" }}>
          <SidebarGroupTitle label="Favorites" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Sidebar Base / Item: "Hsinchu Greenland Center" */}
            <SidebarItem label="Hsinchu Greenland Center" icon={<FolderOpen />} />
            {/* Sidebar Base / Item: "Xinfeng Data Center" */}
            <SidebarItem label="Xinfeng Data Center" icon={<FolderOpen />} />
          </div>
        </div>

        {/* Section 2: Recent (padding: 8 16) */}
        <div style={{ padding: "8px 16px" }}>
          <SidebarGroupTitle label="Recent" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <SidebarItem label="Menu Item" icon={<Clock />} />
            <SidebarItem label="Menu Item" icon={<Clock />} />
          </div>
        </div>

        {/* Section 3: Features (padding: 8 16, h:172) */}
        <div style={{ padding: "8px 16px" }}>
          <SidebarGroupTitle label="Features" />
          <div style={{ display: "flex", flexDirection: "column" }}>

            {/* Cinta Sphere — expanded（ChevronDown），has InnerList */}
            <SidebarItem label="Cinta Sphere" icon={<Globe2 />} expanded />

            {/* InnerList: pad 0 16 → Container pad 0 8 → total indent 24px */}
            {/* InnerItem 01（active）= Workspaces, 02 = Global Library, 03-05 = Menu Item */}
            <div style={{ paddingLeft: 24, display: "flex", flexDirection: "column" }}>
              <SidebarItem
                label="Workspaces"
                icon={<Layers />}
                active
                expanded
                isInner
                subItems={[
                  { label: "Demo Data Center A", active: true },
                  { label: "Demo Data Center B" },
                ]}
              />
              <SidebarItem label="Global Library" icon={<BookOpen />} isInner />
              <SidebarItem label="Menu Item" icon={<FolderOpen />} isInner />
              <SidebarItem label="Menu Item" icon={<FolderOpen />} isInner />
              <SidebarItem label="Menu Item" icon={<FolderOpen />} isInner />
            </div>

            {/* Cinta Viz */}
            <SidebarItem label="Cinta Viz" icon={<BarChart2 />} />
          </div>
        </div>

      </nav>
    </div>
  );
}


// ─── Workspace Card ───────────────────────────────────────────────────────────
// Figma node 40002355:177817, 562×356
// IMG(268px, pad:8 8 0 8) + View button(ABSOLUTE right:24 top:24, 80×36) + Info(88px, pad:24, gap:4)

interface WorkspaceCardProps {
  title: string;
  imageSrc: string;
}

function WorkspaceCard({ title, imageSrc }: WorkspaceCardProps) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...glassCard,
        width: 562,
        height: 356,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Glass inner overlay: rgba(0,0,0,0.004) */}
      <div style={glassInner} aria-hidden="true" />

      {/* IMG area: 268px tall, padding: 8px 8px 0 8px */}
      <div
        style={{
          height: 268,
          padding: "8px 8px 0 8px",
          flexShrink: 0,
          position: "relative",
        }}
      >
        {/* Image: 546×260 (fill width - 16px), radius:6, objectFit:cover */}
        <div style={{ width: "100%", height: 260, borderRadius: 6, overflow: "hidden", position: "relative" }}>
          <img
            src={imageSrc}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          {/* Gradient overlay: black→transparent, blend MULTIPLY opacity:0.05 */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 100%)",
            }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* View Button: ABSOLUTE right:24 top:24, 80×36, purple gradient, radius:8 */}
      {/* opacity:0 → 1 on card hover, transition 0.2s */}
      <button
        style={{
          position: "absolute",
          right: 24,
          top: 24,
          width: 80,
          height: 36,
          borderRadius: 8,
          background: purpleGradient,
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          cursor: "pointer",
          padding: "8px 12px",
          overflow: "hidden",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        <div style={glassInner} aria-hidden="true" />
        <span style={{ fontFamily: "Urbanist,sans-serif", fontSize: 14, fontWeight: 600, lineHeight: "20px", color: "#f1f1f3" }}>
          View
        </span>
      </button>

      {/* Info: 88px, padding:24 all sides */}
      {/* 24(top) + 40(title) + 24(bottom) = 88px */}
      <div
        style={{
          height: 88,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        {/* Title: 24px/700/#171d1f, lineHeight:40px */}
        <div style={{ fontFamily: "Urbanist,sans-serif", fontSize: 24, fontWeight: 700, lineHeight: "40px", color: "#171d1f", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {title}
        </div>
      </div>
    </div>
  );
}

// ─── Full Page ────────────────────────────────────────────────────────────────

function WorkspacesPage() {

  return (
    // 頁面根容器: 1440×1024, bg #e6e4ed（Figma fills rgb(230,228,237)）
    <div
      style={{
        width: 1440,
        height: 1024,
        background: "#e6e4ed",
        position: "relative",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <EarthBg />

      {/* ── Frame 181: Sidebar（x:0, y:0, w:260, h:1024, pad: t:20 r:0 b:20 l:20） */}
      <div
        style={{
          width: 260,
          height: 1024,
          padding: "20px 0 20px 20px",
          flexShrink: 0,
          zIndex: 1,
        }}
      >
        <CintaSidebar />
      </div>

      {/* ── Frame 175: Content（x:260, y:0, w:1180, h:1024, pad: t:40 r:20 b:0 l:20, gap:32） */}
      <div
        style={{
          width: 1180,
          height: 1024,
          padding: "40px 20px 0 20px",
          display: "flex",
          flexDirection: "column",
          gap: 32,
          zIndex: 1,
          overflowY: "auto",
        }}
      >

        {/* Breadcrumb: 1140×28 */}
        <Breadcrumb
          items={[
            { label: "Cinta Sphere", type: "Default" },
            { label: "Workspaces", type: "Active-Hover" },
          ]}
        />

        {/* Content: 1140×872, gap:40 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

          {/* ── Section 1: Intro + Create Workspace（pt:48, gap:32） */}
          <div style={{ paddingTop: 48, display: "flex", flexDirection: "column", gap: 32 }}>

            {/* H1: 40px/600/#171d1f，置中 */}
            <h1
              style={{
                fontFamily: "Urbanist,sans-serif",
                fontSize: 40,
                fontWeight: 600,
                lineHeight: "48px",
                color: "#171d1f",
                margin: 0,
                textAlign: "center",
              }}
            >
              Build Data Center for the world
              <br />
              with Cinta Sphere
            </h1>

            {/* Workspace Card (Blank): 1140×240 */}
            {/* Figma: Title 24px/700/#171d1f，Desc #687378，Footer button "Upload" 98×36 centered */}
            <div style={{ height: 240 }}>
              <Card
                variant="Blank"
                title="Create Workspace"
                subtitle="Start by uploading your first file to visualize your data center."
                className="h-full"
              />
            </div>

          </div>

          {/* ── Section 2: Explore Pre-built Scenes（gap:20） */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Section title: 24px/600/#000 */}
            <h2
              style={{
                fontFamily: "Urbanist,sans-serif",
                fontSize: 24,
                fontWeight: 600,
                lineHeight: "40px",
                color: "#000000",
                margin: 0,
              }}
            >
              Explore Pre-built Scenes
            </h2>

            {/* Sample: 1140×356, gap:16, HORIZONTAL，2 × WorkspaceCard(562px) */}
            <div style={{ display: "flex", gap: 16 }}>
              <WorkspaceCard
                title="Demo Data Center A"
                imageSrc="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"
              />
              <WorkspaceCard
                title="Demo Data Center B"
                imageSrc="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: "Sphere",
  render: () => <WorkspacesPage />,
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Figma node `40002355:178073`。List view（Tab1 active），Cinta Sphere 展開顯示 Workspaces sub-item（active）。",
      },
    },
  },
};
