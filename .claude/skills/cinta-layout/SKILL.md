---
name: cinta-layout
description: Cinta（Agaruda Design System）的版型結構規範。延伸新畫面、建立頁面骨架、或需要確認 sidebar／主內容區尺寸時使用。凡是涉及畫布尺寸、欄位寬度、Flex 方向、背景裝飾配置的任務，都應參考此 Skill。
---

# Cinta — 版型結構規範

## 畫布基準
- 設計尺寸：**1440 × 1024px**
- 不支援響應式斷點（目前為固定寬度桌面版）

## 兩欄佈局
| 區域 | 寬度 / 位置 | 備註 |
|---|---|---|
| Sidebar | 固定 240px | height: fill，不隨捲動消失 |
| 主內容區 | left: 260px 起 | 260 = sidebar 240 + gap 20 |
| 主內容內部 | Flex Column | 垂直堆疊，Card 列表同為 Flex Column |

## 背景裝飾
- 地球 SVG：position absolute，size 1392px
- 純裝飾用，**不影響任何 layout 流**，不應用於定位參考

## UI Library
- **shadcn/ui**：Button、Tabs、Sidebar、Breadcrumb、ScrollArea
- **Icons**：Lucide Icons（尺寸另見 cinta-interaction Skill）

## 延伸新畫面的版型原則
1. 主內容區永遠從 left: 260px 開始
2. 新頁面若無 Sidebar，主內容區可全寬，但需保留 padding-x: 20px
3. Card 列表容器永遠是全寬 Flex Column，不使用 Grid
