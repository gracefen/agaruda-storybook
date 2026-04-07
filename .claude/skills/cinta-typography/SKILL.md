---
name: cinta-typography
description: Cinta（Agaruda Design System）的字型與文字規範，包含字型選用、font size scale、weight、line-height 的完整對照表。任何涉及文字樣式的任務——包括標題、Card 內容、Button 標籤、Sidebar 文字——都應參考此 Skill。
---

# Cinta — Typography 規範

## 字型選用原則
| 字型 | 用途 |
|---|---|
| **Urbanist** | 主字型。所有 heading、body UI 文字、Button、Sidebar、Card 內容 |
| **Geist** | 限定用於 Breadcrumb（shadcn 預設字型），其餘一律不使用 |

> 規則：除非明確標註 Geist，否則所有文字預設使用 Urbanist。

## Font Scale 對照
| Token | px 值 |
|---|---|
| size-xs | 12px |
| size-s | 14px |
| size-m | 16px |
| size-2xl | 24px |
| size-4xl | 40px |

## Line Height 對照
| Token | 值 |
|---|---|
| line-xs | 16px |
| line-s | 20px |
| line-l | 40px |
| line-2xl | 60px |

## 各場景完整規格
| 用途 | Size | Token | Weight | Line Height | 字型 |
|---|---|---|---|---|---|
| Page Title（如「Workspaces」） | 40px | size-4xl | SemiBold (600) | 60px / line-2xl | Urbanist |
| Card 項目名稱 | 24px | size-2xl | Bold (700) | 40px / line-l | Urbanist |
| Card 作者姓名 | 16px | size-m | Bold (700) | 20px / line-s | Urbanist |
| Card ID subtitle | 16px | size-m | Regular (400) | 20px / line-s | Urbanist |
| Button 文字 | 14px | size-s | SemiBold (600) | 20px / line-s | Urbanist |
| Tab 文字 | 14px | size-s | SemiBold (600) | 20px / line-s | Urbanist |
| Card 日期 | 14px | size-s | Regular (400) | 20px / line-s | Geist |
| Breadcrumb 文字 | 14px | size-s | Regular (400) | 20px / line-s | Geist |
| Sidebar Section Title | 12px | size-xs | Regular (400) | 16px / line-xs | Urbanist |
| Sort Button 文字 | 12px | size-xs | SemiBold (600) | 16px / line-xs | Urbanist |

## 常見錯誤提醒
- Page Title 用 **SemiBold**，不是 Bold——兩者在 Urbanist 裡視覺差異明顯
- Card 項目名稱（大標）是 Bold，Card ID subtitle（小字）是 Regular，不可混用
- 日期與 Breadcrumb 是少數使用 Geist 的場景，其他地方不使用
- 12px 文字只出現在 Sidebar Section Title 和 Sort Button，其他場景最小為 14px
