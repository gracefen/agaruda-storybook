---
name: cinta-color
description: Cinta（Agaruda Design System）的顏色 Token 規範，涵蓋頁面底色、品牌色、文字色、狀態色與透明度語意色。撰寫任何 Cinta 畫面的 CSS、Tailwind class、或審查顏色一致性時應參考此 Skill。
---

# Cinta — 顏色 Token 規範

## 頁面與容器底色
| Token | 值 | 用途 |
|---|---|---|
| utility-purple-950 | #e6e4ed | 整體頁面背景色 |
| rgba(255,255,255,0.6→0.5) | gradient-to-b | Card、Sidebar 的 glassmorphism 背景 |
| overlay-inverse-60 | rgba(250,252,252,0.6) | Search Bar、Tabs 背景 |
| bg-primary | #f9fafb | Secondary Button 背景 |

## 品牌色
| Token | 值 | 用途 |
|---|---|---|
| utility-purple-500 | #7522e0 | Primary Button 漸層起點（主品牌色） |
| utility-purple-a10 | rgba(13,5,44,0.1) | 邊框、Active bg、Tabs selected 狀態 |
| utility-purple-a20 | rgba(13,5,44,0.2) | Scrollbar Thumb |

## 文字色
| Token | 值 | 適用場景 |
|---|---|---|
| text-title | #171d1f | 主標題、Card 標題、Button 文字 |
| text-secondary | #30363a | Sidebar label、Breadcrumb 文字、Placeholder |
| utility-grey-300 | #91989e | Card ID subtitle（次要說明文字） |
| text-on-color | #f1f1f3 | 放在有色背景上的文字（Primary Button） |

## 顏色使用原則
- glassmorphism 容器統一使用 `rgba(255,255,255,0.6)` → `rgba(255,255,255,0.5)` 的漸層，不可直接用白色實底
- 邊框一律使用 `utility-purple-a10`，不使用灰色邊框
- Active / Selected 狀態背景使用 `utility-purple-a10`，hover 狀態目前未定義獨立 Token
- 所有文字優先使用語意 Token（text-title、text-secondary），避免直接寫 hex

## 與 Glass 效果的關係
顏色 Token 的應用依賴 Glass 系統的容器結構，
完整的 blur、shadow、border 規格請參考 **cinta-glass** Skill。
