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
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
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

## Figma Glass Effect Style（折射效果）

此效果使用 Figma 內建 Glass Effect，**非 backdrop-filter**，無法用 CSS 直接還原。
在 Figma 中透過 Effects 欄位套用 Shared Style「Glass」，不需手動輸入數值。

### Effect Style 名稱
`Glass`（來自 Agaruda Design System Shared Styles）

### 參數設定
| 參數 | 值 |
|---|---|
| Light angle | -37° |
| Light intensity | 60% |
| Refraction | 60 |
| Depth | 30 |
| Dispersion | 0 |
| Frost | 0 |
| Splay | 0 |

### 套用方式
- 在元件上方新增一個獨立 Frame/Rectangle Layer
- 於該 Layer 的 Effects 欄位套用 Shared Style「Glass」
- Fill 設透明或半透明白色，配合底層內容呈現折射質感

### CSS 近似還原（僅供參考，非完全等效）
```css
backdrop-filter: blur(10px) saturate(150%);
-webkit-backdrop-filter: blur(10px) saturate(150%);
background-color: rgba(255, 255, 255, 0.3);
```

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
- Figma Glass Effect Style 的折射效果無法用單一 CSS 屬性完全還原，實作時以 backdrop-filter 近似

---

## Figma 實作規範（Claude Code 用）

> 從 Design System Test 檔案（`vTiieCM6qQlDvz6l0V2t6D`，node `101-696`）實測整理。
> key 值查找請同時參考 `agaruda-ds-variables` Skill。

### 兩層結構

Glass 容器不是單一 Frame，**必須是兩層**，分工不同：

```
Panel（外層 Frame）
├── layoutMode: 'VERTICAL'            ← 必須有 Auto Layout
├── Fill Style → 漸層背景              ← setFillStyleIdAsync
├── Effect Style → BACKGROUND_BLUR + Shadow  ← 讓背景模糊
│
└── Glass（子層 Frame）               ← 第一個子節點（最底層）
    ├── layoutPositioning: 'ABSOLUTE' ← 絕對定位，不佔 AL 空間
    ├── x: 0, y: 0，size = 父層相同
    ├── fills: opacity 0.004（幾乎透明）
    ├── Effect Style → GLASS type     ← 折射質感，與外層分工不同
    └── cornerRadius 綁定 variable（同父層）
```

> 外層 `BACKGROUND_BLUR` 負責讓背景模糊；Glass 子層的 `GLASS` type 提供折射質感。**兩者不可互換，也不能只用其中一層。**

---

### Style Keys 對照

| 項目 | Mode | Style Key |
|---|---|---|
| Fill（外層 Panel） | Light | `6e77a27ba9eb8b277cc56427e5738edf5cd414b9` |
| Fill（外層 Panel） | Dark | `11a40fbd5cc9dd9ba08f78f6a85a778f8229c765` |
| Effect（外層 Panel，blur + shadow） | Light | `978cfc81d26f6fb4e3939ac633def042276fbc54` |
| Effect（外層 Panel，blur + shadow） | Dark | `cb063cf5d0a0f1d9793df33f9b9f0efe9236df3c` |
| Effect（Glass 子層，兩個 mode 共用） | — | `39acbe0d5bec7f09a3e832be881f6cb98c5e8829` |
| Corner Radius variable（Glass 子層） | — | `49a4ec1e9ac9ef21cc6ca18b5fa3aee3e4fd994f` |

### Light vs Dark 差異

| | Light | Dark（Omniverse） |
|---|---|---|
| Fill | 白色漸層 | 黑色漸層 |
| Blur | 20px（Subtle） | 35px（更強，配合深色 OV 背景） |
| Shadow | 淡紫底，輕量 | 純黑，明顯較深 |

---

### 完整建立範例

```javascript
async function createGlassPanel(parentId, mode) {
  const parent = await figma.getNodeByIdAsync(parentId);
  const isLight = mode === 'light';

  // 外層 Panel
  const panel = figma.createFrame();
  panel.name = `Side Panel / ${isLight ? 'Light' : 'Dark'}`;
  panel.resize(240, 600);
  panel.x = 40; panel.y = 40;
  panel.cornerRadius = 8;
  panel.layoutMode = 'VERTICAL';
  panel.primaryAxisSizingMode = 'FIXED';
  panel.counterAxisSizingMode = 'FIXED';
  panel.paddingTop = 20; panel.paddingBottom = 20;
  panel.paddingLeft = 16; panel.paddingRight = 16;
  panel.itemSpacing = 4;
  panel.clipsContent = true;

  // Fill Style
  const fillKey = isLight
    ? '6e77a27ba9eb8b277cc56427e5738edf5cd414b9'
    : '11a40fbd5cc9dd9ba08f78f6a85a778f8229c765';
  await panel.setFillStyleIdAsync((await figma.importStyleByKeyAsync(fillKey)).id);

  // Effect Style（外層）
  const effectKey = isLight
    ? '978cfc81d26f6fb4e3939ac633def042276fbc54'
    : 'cb063cf5d0a0f1d9793df33f9b9f0efe9236df3c';
  await panel.setEffectStyleIdAsync((await figma.importStyleByKeyAsync(effectKey)).id);

  // Glass 子層
  const glass = figma.createFrame();
  glass.name = 'Glass';
  glass.resize(panel.width, panel.height);
  glass.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 0.004 }];
  glass.layoutPositioning = 'ABSOLUTE';
  glass.x = 0; glass.y = 0;

  await glass.setEffectStyleIdAsync(
    (await figma.importStyleByKeyAsync('39acbe0d5bec7f09a3e832be881f6cb98c5e8829')).id
  );

  const radiusVar = await figma.importVariableByKeyAsync('49a4ec1e9ac9ef21cc6ca18b5fa3aee3e4fd994f');
  glass.setBoundVariable('cornerRadius', radiusVar);

  panel.insertChild(0, glass); // 插入為最底層
  parent.appendChild(panel);

  return panel.id;
}
```
