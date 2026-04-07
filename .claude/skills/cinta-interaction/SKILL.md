---
name: cinta-interaction
description: Cinta（Agaruda Design System）的元件互動行為與狀態規範，包含 hover 顯示規則、Tabs 切換邏輯、元件 variant 對照、以及 Icon 使用規範。實作互動行為、撰寫元件狀態 CSS、或在 Storybook 建立 Story 時應參考此 Skill。
---

# Cinta — 互動行為與元件狀態規範

## Hover 顯示規則

### Card 操作按鈕
- Edit、View 兩個按鈕預設為 **hidden**
- 滑鼠 hover 整張 Card 時才顯示
- 實作方式：
```css
.card-actions { opacity: 0; transition: opacity 0.2s; }
.card:hover .card-actions { opacity: 1; }
```
> 不可用 `display: none` 切換，否則無法做 transition

## Tabs 切換行為
- List / Map 兩個 Tab 互斥切換
- 每個 Tab Item 為 Icon type，尺寸 **32 × 32px**
- Selected 狀態：`background: utility-purple-a10`（rgba(13,5,44,0.1)）
- Unselected 狀態：無背景色

## 元件 Variant 對照

### Sidebar Item
| State | 背景 |
|---|---|
| Default | 無背景 |
| Active | utility-purple-a10 |
| Hover | 未定義（保持 Default） |

### Sidebar Section Title
| Variant | 說明 |
|---|---|
| action=false | 只顯示 Section 標題文字 |
| action=true | 右側額外顯示 + icon（用於新增操作） |

### Button
| Variant | 背景 | 文字色 | 有無 Icon |
|---|---|---|---|
| Primary | 紫色漸層（utility-purple-500 起） | text-on-color | icon + label |
| Secondary | bg-primary（#f9fafb） | text-title | label only |

> Secondary Button 有 min-width: 80px 限制

### Workspace Card
| Variant | 圖片 | 高度 | 排列方式 |
|---|---|---|---|
| Left Info. Right IMG（大） | 有 | 自動 | 水平排列 |
| Info（小） | 無 | 固定 200px | 左 Metadata 右 Footer |

## Icon 使用規範
- Icon 來源：**Lucide Icons**（統一使用，不混用其他 icon 套件）
- Breadcrumb 使用 `panel-left` icon
- Tabs 使用 list icon / map icon
- Sidebar Section Title（action=true）使用 `+`（Plus）icon
- Icon 尺寸隨容器文字大小對齊，Tab icon 固定 32×32px 容器內置中

## Scrollbar
- 垂直 Scrollbar，右側浮動
- 不佔版型空間（position absolute）
- Thumb 寬度：8px，Radius：pill（9999px）
- 顏色：utility-purple-a20（rgba(13,5,44,0.2)）

## Storybook Story 對應建議
| 元件 | 建議 Story 狀態 |
|---|---|
| Workspace Card | Default / Hover（顯示按鈕）/ 無圖版 / 名稱超長截斷 |
| Sidebar Item | Default / Active |
| Sidebar Section Title | action=false / action=true |
| Tabs | List selected / Map selected |
| Button | Primary / Secondary / Disabled |
