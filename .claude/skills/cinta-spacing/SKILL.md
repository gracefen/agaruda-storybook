---
name: cinta-spacing
description: Cinta（Agaruda Design System）的間距規範，包含 Space Token 對照表與各區域 padding／gap 的標準值。任何需要確認頁面邊距、元件間距、Card 內部 padding 的任務都應參考此 Skill。撰寫 CSS、產出元件、或檢查設計一致性時自動套用。
---

# Cinta — 間距規範

## Space Token 對照
| Token | px 值 |
|---|---|
| space-2xs | 4px |
| space-xs | 8px |
| space-m | 16px |
| space-l | 20px |
| space-xl | 24px |
| space-2xl | 32px |
| space-3xl | 40px |

## 頁面層級間距
| 位置 | 數值 | Token |
|---|---|---|
| 頁面 padding-top | 40px | space-3xl |
| 頁面 padding-x（左右） | 20px | space-l |
| Header 區塊內：Breadcrumb ↔ Title | 8px | space-xs |
| Header 區塊 ↔ 主內容 | 32px | space-2xl |
| Search 列 ↔ Card 列表 | 24px | space-xl |
| Card 列表項目間 gap | 16px | space-m |

## 元件層級間距
| 元件 | 位置 | 數值 | Token / 備註 |
|---|---|---|---|
| Card | 內部 padding（四邊） | 24px | p-6 |
| Card Header | title ↔ id gap | 4px | space-2xs |
| Card Footer | button 間 gap | 16px | space-m |
| Button | padding-x / padding-y | 12px / 8px | — |
| Search Bar | height | 36px | — |
| Sidebar | padding-top / bottom / left | 20px / 20px / 20px | — |

## 使用原則
- 優先使用 Token 名稱（如 `space-m`），而非直接寫 px 值
- Card 內部 padding 統一使用 `p-6`（Tailwind），不拆四個方向
- Sidebar padding-right 未定義，以內容自然寬度為準
