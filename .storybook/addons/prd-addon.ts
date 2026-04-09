// ============================================================
// .storybook/addons/prd-addon.ts
// ============================================================
//
// 安裝步驟：
//   1. 此檔放到 .storybook/addons/prd-addon.ts
//   2. 新增 .storybook/manager.ts，內容：
//      import './addons/prd-addon'
//   3. 重啟 Storybook
//
// ============================================================

import { addons, types } from 'storybook/manager-api'
import { useParameter } from 'storybook/manager-api'
import { IconButton } from 'storybook/internal/components'
import { createElement as h, useState, useEffect, useRef } from 'react'

// ── 型別 ──────────────────────────────────────────────────

interface PrdLink    { label: string; url: string }
interface PrdSection { title: string; content: string }

interface PrdParameter {
  title?: string
  version?: string
  author?: string
  updatedAt?: string
  status?: 'draft' | 'review' | 'approved'
  links?: PrdLink[]
  sections?: PrdSection[]
  description?: string
}

// ── 狀態樣式 ──────────────────────────────────────────────

const STATUS: Record<string, { label: string; bg: string; color: string }> = {
  draft:    { label: 'Draft',     bg: '#FEF3C7', color: '#92400E' },
  review:   { label: 'In Review', bg: '#DBEAFE', color: '#1E40AF' },
  approved: { label: 'Approved',  bg: '#D1FAE5', color: '#065F46' },
}

// ── 浮動面板 ──────────────────────────────────────────────

function PrdPanel({ onClose }: { onClose: () => void }) {
  const prd = useParameter<PrdParameter>('prd', {})
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [onClose])

  const copy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const empty = !prd || Object.keys(prd).length === 0

  return h('div', {
    ref,
    style: {
      position: 'fixed', top: 40, right: 16,
      width: 360, maxHeight: 'calc(100vh - 60px)',
      overflowY: 'auto',
      background: '#fff',
      border: '1px solid #E5E7EB',
      borderRadius: 10,
      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      zIndex: 9999,
      fontFamily: 'system-ui, sans-serif',
      fontSize: 13, color: '#111827',
    },
  },

    // Header
    h('div', {
      style: {
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 14px',
        borderBottom: '1px solid #F3F4F6',
        background: '#F9FAFB',
        borderRadius: '10px 10px 0 0',
      },
    },
      h('span', { style: { fontWeight: 600, fontSize: 13 } }, '📄 PRD 文件'),
      h('button', {
        onClick: onClose,
        style: {
          background: 'none', border: 'none',
          cursor: 'pointer', fontSize: 18, color: '#9CA3AF',
          lineHeight: 1, padding: '0 2px',
        },
      }, '×')
    ),

    // Body
    empty
      ? h('div', {
          style: { padding: '32px 20px', textAlign: 'center', color: '#9CA3AF' },
        },
          h('div', { style: { fontSize: 28, marginBottom: 10 } }, '📄'),
          h('p', { style: { margin: '0 0 6px', fontWeight: 600, fontSize: 13, color: '#6B7280' } },
            '尚未設定 PRD'
          ),
          h('p', { style: { margin: 0, fontSize: 12, lineHeight: 1.6 } },
            '在 story 的 parameters.prd 加入文件資訊'
          ),
          h('pre', {
            style: {
              marginTop: 16, padding: 12, textAlign: 'left',
              background: '#F9FAFB', border: '1px solid #E5E7EB',
              borderRadius: 6, fontSize: 11, lineHeight: 1.7, color: '#374151',
              overflowX: 'auto',
            },
          },
`安安你好我是還沒存在的PRD文件`)

// `parameters: {
//   prd: {
//     title: '元件 PRD',
//     status: 'approved',
//     author: 'Grace',
//     links: [{ label: 'Notion', url: '...' }],
//     sections: [
//       { title: '需求', content: '...' },
//     ],
//   },
// }`)
        )
      : h('div', { style: { padding: '14px 18px' } },

          // 標題
          h('div', {
            style: {
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'flex-start', marginBottom: 12, gap: 8,
            },
          },
            h('div', null,
              h('div', { style: { display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' } },
                h('span', { style: { fontWeight: 700, fontSize: 15 } }, prd.title ?? '元件 PRD'),
                prd.version && h('span', {
                  style: { fontSize: 10, fontWeight: 600, background: '#F3F4F6', color: '#6B7280', padding: '1px 6px', borderRadius: 10 },
                }, prd.version),
                prd.status && STATUS[prd.status] && h('span', {
                  style: { fontSize: 10, fontWeight: 600, background: STATUS[prd.status].bg, color: STATUS[prd.status].color, padding: '1px 6px', borderRadius: 10 },
                }, STATUS[prd.status].label)
              ),
              h('div', { style: { display: 'flex', gap: 10, marginTop: 5, fontSize: 11, color: '#9CA3AF' } },
                prd.author    && h('span', null, `✍️ ${prd.author}`),
                prd.updatedAt && h('span', null, `🗓 ${prd.updatedAt}`)
              )
            ),
            h('button', {
              onClick: copy,
              style: {
                padding: '3px 8px', fontSize: 11,
                background: copied ? '#D1FAE5' : '#F9FAFB',
                color: copied ? '#065F46' : '#6B7280',
                border: '1px solid #E5E7EB', borderRadius: 5, cursor: 'pointer',
                flexShrink: 0,
              },
            }, copied ? '✓' : '🔗')
          ),

          // 說明
          prd.description && h('p', {
            style: { margin: '0 0 12px', fontSize: 12, lineHeight: 1.7, color: '#6B7280', padding: '8px 10px', background: '#F9FAFB', borderRadius: 6 },
          }, prd.description),

          // 外部連結
          prd.links && prd.links.length > 0 && h('div', { style: { marginBottom: 14 } },
            h('div', { style: { fontSize: 10, fontWeight: 600, color: '#9CA3AF', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' } }, '外部文件'),
            h('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap' } },
              ...prd.links.map((link, i) =>
                h('a', {
                  key: i, href: link.url, target: '_blank', rel: 'noreferrer',
                  style: {
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '4px 10px', background: '#EFF6FF', color: '#1D4ED8',
                    border: '1px solid #BFDBFE', borderRadius: 5, fontSize: 12,
                    fontWeight: 500, textDecoration: 'none',
                  },
                }, `↗ ${link.label}`)
              )
            )
          ),

          // 段落
          prd.sections && prd.sections.length > 0 && h('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
            ...prd.sections.map((s, i) =>
              h('div', { key: i },
                h('div', {
                  style: { fontSize: 10, fontWeight: 600, color: '#374151', marginBottom: 4, paddingBottom: 4, borderBottom: '1px solid #F3F4F6', textTransform: 'uppercase', letterSpacing: '0.04em' },
                }, s.title),
                h('p', {
                  style: { margin: 0, fontSize: 12, lineHeight: 1.8, color: '#4B5563', whiteSpace: 'pre-wrap' },
                }, s.content)
              )
            )
          )
        )
  )
}

// ── Toolbar 按鈕 ──────────────────────────────────────────

function PrdToolbarButton() {
  const [open, setOpen] = useState(false)
  const prd = useParameter<PrdParameter>('prd', {})
  const hasPrd = prd && Object.keys(prd).length > 0

  return h('div', { style: { position: 'relative', display: 'flex', alignItems: 'center' } },
    h(IconButton, {
      title: 'PRD 文件',
      onClick: () => setOpen(v => !v),
      style: { gap: 4, fontSize: 12, fontWeight: open ? 700 : 400, color: hasPrd && !open ? '#1D4ED8' : undefined },
    },
      hasPrd && h('span', {
        style: { width: 6, height: 6, borderRadius: '50%', background: '#1D4ED8', display: 'inline-block' },
      }),
      'PRD'
    ),
    open && h(PrdPanel, { onClose: () => setOpen(false) })
  )
}

// ── 註冊 ──────────────────────────────────────────────────

addons.register('prd-toolbar', () => {
  addons.add('prd-toolbar/tool', {
    type: types.TOOL,
    title: 'PRD',
    match: () => true,
    render: () => h(PrdToolbarButton, null),
  })
})
