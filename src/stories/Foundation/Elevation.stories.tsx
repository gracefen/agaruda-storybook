import type { Meta, StoryObj } from "@storybook/react";

// ─── Dark Mode surfaces ───────────────────────────────────────────────────────

const darkSurfaces = [
  { level: "Level 0", value: "#0A0F12", label: "最深底層" },
  { level: "Level 1", value: "#171D1F", label: "Primary Surface（基準面）" },
  { level: "Level 2", value: "#181C20", label: "" },
  { level: "Level 3", value: "#1C2024", label: "" },
  { level: "Level 4", value: "#262A2F", label: "" },
  { level: "Level 5", value: "#31353A", label: "最淺層（最高 Elevation）" },
];

// ─── Page component ───────────────────────────────────────────────────────────

function ElevationPage() {
  return (
    <div className="font-[Urbanist] p-8 max-w-3xl">
      <h1 className="text-[40px] font-semibold leading-[60px] text-[#171d1f] mb-2">
        Elevation
      </h1>
      <p className="text-[16px] leading-[20px] text-[#30363a] mb-10">
        Cinta Dark Mode 使用 Material Design 3 Tonal Elevation 系統。
        Surface 色階由 Seed Color #8333F4 與 Base #171D1F 以 HCT 色彩空間推導而成。
      </p>

      <section>
        <h2 className="text-[16px] font-semibold leading-[20px] text-[#91989e] uppercase tracking-widest mb-4">
          Dark Mode — Surface Elevation
        </h2>
        <p className="text-[13px] text-[#30363a] mb-4">
          Seed Color：#8333F4 · Base：#171D1F · Material Design 3 Tonal Elevation 系統
        </p>
        <div className="rounded-[8px] overflow-hidden border border-[rgba(255,255,255,0.1)]">
          {darkSurfaces.map((s) => (
            <div
              key={s.level}
              className="flex items-center gap-4 px-5 py-3"
              style={{ backgroundColor: s.value }}
            >
              <div
                className="w-8 h-8 rounded-md shrink-0 border border-white/10"
                style={{ backgroundColor: s.value }}
              />
              <div>
                <p className="text-[13px] font-semibold text-white/80">{s.level}</p>
                <p className="font-mono text-[11px] text-white/50">{s.value}</p>
              </div>
              {s.label && (
                <p className="ml-auto text-[11px] text-white/50 text-right">{s.label}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Foundation/Elevation",
  component: ElevationPage,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "agaruda-purple" },
    docs: {
      description: {
        component:
          "Cinta Design System 的 Dark Mode Surface Elevation 色階規範。以 HCT 色彩空間推導 6 個 surface container 層級。",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Surface Elevation",
};
