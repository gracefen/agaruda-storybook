import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Badge } from "./Badge";
import { Table } from "./Table";
import type { TableColumn } from "./Table";

const meta: Meta<typeof Table> = {
  title: "Agaruda DS/Table",
  component: Table,
  parameters: {
    layout: "centered",
    backgrounds: { default: "agaruda-purple" },
    docs: {
      description: {
        component: `
**Table** — Agaruda Design System

Figma: \`↳ Table\` · COMPONENT_SETs:
- Table Base/Cell（主要 cell）
- Table-Base/Header（欄位標題）
- Table Cell（內容 cell）
- Table-Base/Pagination（分頁控制）
- Table-Base/List-Header（列表標題）

Glass 效果容器，支援排序、分頁。
      `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Table>;

// ─── Sample data ──────────────────────────────────────────────────────────────

type Workspace = {
  name: string;
  author: string;
  status: string;
  date: string;
  id: string;
};

const sampleData: Workspace[] = [
  { id: "#DS-001", name: "Agaruda Design System", author: "Grace Chu", status: "Active", date: "Apr 4, 2026" },
  { id: "#DT-042", name: "Digital Twins MVP", author: "Alex Lin", status: "In Progress", date: "Mar 28, 2026" },
  { id: "#AI-007", name: "AI-DCIM Dashboard", author: "Sam Chen", status: "Active", date: "Mar 15, 2026" },
  { id: "#MB-019", name: "Mobile App v2", author: "Lily Wang", status: "Draft", date: "Feb 22, 2026" },
  { id: "#CL-003", name: "Component Library", author: "Grace Chu", status: "Active", date: "Jan 10, 2026" },
];

const columns: TableColumn<Workspace>[] = [
  { key: "id", header: "ID", width: 80 },
  { key: "name", header: "Workspace", sortable: true },
  { key: "author", header: "Author", sortable: true },
  {
    key: "status",
    header: "Status",
    render: (value) => {
      const v = value as string;
      const typeMap: Record<string, "Default" | "Secondary" | "Destructive" | "Outline"> = {
        Active: "Default",
        "In Progress": "Secondary",
        Draft: "Outline",
      };
      return <Badge type={typeMap[v] ?? "Secondary"} rounded>{v}</Badge>;
    },
  },
  { key: "date", header: "Last Updated", sortable: true },
];

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <div style={{ width: 700 }}>
      <Table columns={columns} data={sampleData} caption="Workspaces" />
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const WithSort: Story = {
  name: "With Sorting",
  render: () => {
    const [sortKey, setSortKey] = useState("name");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

    const handleSort = (key: string) => {
      if (sortKey === key) {
        setSortDir(sortDir === "asc" ? "desc" : "asc");
      } else {
        setSortKey(key);
        setSortDir("asc");
      }
    };

    const sorted = [...sampleData].sort((a, b) => {
      const av = a[sortKey as keyof Workspace];
      const bv = b[sortKey as keyof Workspace];
      return sortDir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });

    return (
      <div style={{ width: 700 }}>
        <Table
          columns={columns}
          data={sorted}
          caption="Workspaces"
          sortKey={sortKey}
          sortDirection={sortDir}
          onSort={handleSort}
        />
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};

export const WithPagination: Story = {
  name: "With Pagination",
  render: () => {
    const [page, setPage] = useState(1);
    const pageSize = 2;
    const paginated = sampleData.slice((page - 1) * pageSize, page * pageSize);

    return (
      <div style={{ width: 700 }}>
        <Table
          columns={columns}
          data={paginated}
          caption="Workspaces"
          page={page}
          totalPages={Math.ceil(sampleData.length / pageSize)}
          onPageChange={setPage}
        />
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};

export const Empty: Story = {
  name: "Empty State",
  render: () => (
    <div style={{ width: 700 }}>
      <Table columns={columns} data={[]} caption="Workspaces" />
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const AllVariants: Story = {
  name: "Overview / All Variants",
  render: () => (
    <div className="flex flex-col gap-8" style={{ width: 700 }}>
      <div>
        <p className="font-[Urbanist] text-[12px] text-[#91989e] mb-2">Default（with caption）</p>
        <Table columns={columns} data={sampleData.slice(0, 3)} caption="Workspaces" />
      </div>
      <div>
        <p className="font-[Urbanist] text-[12px] text-[#91989e] mb-2">With Pagination</p>
        <Table
          columns={columns}
          data={sampleData.slice(0, 2)}
          page={1}
          totalPages={3}
        />
      </div>
      <div>
        <p className="font-[Urbanist] text-[12px] text-[#91989e] mb-2">Empty State</p>
        <Table columns={columns} data={[]} />
      </div>
    </div>
  ),
  parameters: { layout: "centered", controls: { disable: true } },
};
