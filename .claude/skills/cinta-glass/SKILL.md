---
name: cinta-glass
description: Cinta（Agaruda Design System）的 Glass 視覺效果規範，包含 backdrop-blur、漸層背景、邊框、三層 shadow 與 border-radius 的完整 CSS 數值。所有容器類元件（Card、Sidebar、Search Bar、Tabs）都使用此系統，撰寫或檢查元件樣式時應參考此 Skill。
---

# Cinta — Glass 視覺效果規範

## Glass 系統：所有容器共用規則

### 背景
```css
background: linear-gradient(to bottom,
  rgba(255, 255, 255, 0.6),
  rgba(255, 255, 255, 0.5)
);
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px);
```

### 邊框
```css
border: 1px solid rgba(13, 5, 44, 0.1); /* utility-purple-a10 */
```

### Shadow（三層疊加）
```css
box-shadow:
  0px 5px 5px rgba(36, 18, 66, 0.05),
  0px 2px 2px rgba(36, 18, 66, 0.04),
  0px 1px 0px rgba(36, 18, 66, 0.03);
```
> 三層的目的是模擬自然光源的漸層陰影，不可合併為單層。

### Border Radius
| 用途 | 數值 | Token |
|---|---|---|
| 容器（Card、Sidebar、Search Bar） | 8px | radius-l |
| 圖片（Card 內的縮圖） | 6px | radius-m |
| Pill（Tag、Badge 類） | 9999px | — |

## 各元件應用方式
| 元件 | 是否套用 Glass | 備註 |
|---|---|---|
| Card（含圖） | 是 | 完整套用上述所有規則 |
| Card（無圖） | 是 | 同上 |
| Sidebar | 是 | 完整套用 |
| Search Bar / Tabs 區域 | 部分 | 背景使用 overlay-inverse-60，不使用白色漸層 |
| Button（Primary） | 否 | 使用品牌色漸層，見 cinta-color |
| Button（Secondary） | 否 | 使用 bg-primary 實底色 |

## Scrollbar 樣式（附屬規格）
```css
/* Thumb */
background: rgba(13, 5, 44, 0.2); /* utility-purple-a20 */
width: 8px;
border-radius: 9999px;
position: absolute; /* 右側浮動，不佔版型空間 */
```

## 使用注意
- backdrop-blur 在 Safari 需加 `-webkit-` 前綴
- Glass 效果需要頁面背景有顏色（utility-purple-950），在白色背景上效果不明顯
- Shadow 三層數值不可自行調整，這是 Cinta 視覺識別的核心之一
