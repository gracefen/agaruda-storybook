---
name: svg-glass
description: 用 SVG filter 還原 Figma GLASS effect 的完整程式碼規範。包含折射（feDisplacementMap）與鏡面高光（feSpecularLighting）兩支濾鏡，以及對應的 CSS/HTML 結構。需要與 cinta-glass.md 搭配使用：cinta-glass 定義 Figma 側的兩層結構與 Library Style，svg-glass 定義前端程式碼的實作方式。
---

# SVG-Glass — Figma GLASS Effect 的 SVG Filter 實作規範

## 適用時機

| 情境 | 使用 |
|---|---|
| 在 Figma 中建立 Glass 元件 | `cinta-glass.md` |
| 將 Glass 效果輸出為前端程式碼 | **本 Skill（svg-glass.md）** |
| 需要跨瀏覽器折射效果 | 本 Skill + 注意 Browser Support |

---

## Figma 參數對應表

| Figma 參數 | 值 | SVG 對應屬性 |
|---|---|---|
| Refraction | 60 | `feDisplacementMap scale="12"` |
| Depth | 30 | `feSpecularLighting surfaceScale="3"` |
| Light angle | -37° | `feDistantLight azimuth="323"` （= 360 − 37） |
| Light intensity | 60% | `feSpecularLighting specularConstant="0.6"` |
| Dispersion | 0 | 略過（不需實作） |
| Frost | 0 | 略過（不需模糊） |
| Splay | 0 | 略過 |

> scale 換算：Figma Refraction ÷ 5 = SVG scale（60 ÷ 5 = 12）
> surfaceScale 換算：Figma Depth ÷ 10 = surfaceScale（30 ÷ 10 = 3）
> azimuth 換算：360 + light_angle（負角度）= 360 − 37 = 323°

---

## SVG Filter 定義

放在 `<body>` 開頭，`width="0" height="0"` 不佔版面空間。

```html
<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg"
     style="position:absolute; overflow:hidden">
  <defs>

    <!--
      折射濾鏡 glass-refraction
      套用於 backdrop-filter，扭曲背景像素
      對應：Refraction=60, Depth=30
    -->
    <filter id="glass-refraction"
            color-interpolation-filters="sRGB"
            x="0%" y="0%" width="100%" height="100%">

      <!-- 低頻雜訊：產生緩慢起伏的扭曲圖樣 -->
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.015 0.02"
        numOctaves="2"
        seed="3"
        result="noise"
      />

      <!--
        折射位移
        scale=12 ← Refraction(60) ÷ 5
        R 通道控制 X 方向偏移，G 通道控制 Y 方向偏移
      -->
      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale="12"
        xChannelSelector="R"
        yChannelSelector="G"
      />

    </filter>


    <!--
      鏡面高光濾鏡 glass-specular
      套用於 filter，模擬玻璃表面反光
      對應：Light angle=-37°, intensity=60%, Depth=30
    -->
    <filter id="glass-specular"
            color-interpolation-filters="sRGB"
            x="0%" y="0%" width="100%" height="100%">

      <!-- 高頻雜訊：模擬玻璃表面微小凹凸（法線貼圖來源） -->
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.65 0.8"
        numOctaves="3"
        seed="2"
        result="surface"
      />

      <!--
        鏡面反光計算
        azimuth=323   ← 360 − 37（Light angle -37°）
        elevation=45  ← 光線入射角（固定值）
        specularConstant=0.6  ← Light intensity 60%
        surfaceScale=3        ← Depth 30 ÷ 10
        specularExponent=25   ← 高光銳利度（值越大越集中）
      -->
      <feSpecularLighting
        in="surface"
        surfaceScale="3"
        specularConstant="0.6"
        specularExponent="25"
        lighting-color="white"
        result="specular"
      >
        <feDistantLight azimuth="323" elevation="45" />
      </feSpecularLighting>

      <!-- 裁切高光至元件不透明範圍，避免溢出邊框 -->
      <feComposite
        in="specular"
        in2="SourceAlpha"
        operator="in"
        result="specular-clipped"
      />

      <!-- Screen 混合：只加亮不加暗，疊在原始內容上 -->
      <feBlend
        in="SourceGraphic"
        in2="specular-clipped"
        mode="screen"
      />

    </filter>

  </defs>
</svg>
```

---

## CSS

```css
/* 外層 Panel：背景模糊 + 白色漸層（對應 cinta-glass.md 外層規格） */
.glass-panel {
  position: relative;
  border-radius: 8px;                        /* radius-l */
  border: 1px solid rgba(13, 5, 44, 0.1);   /* utility-purple-a10 */
  background: linear-gradient(to bottom,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.5)
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow:
    0px 5px 5px rgba(36, 18, 66, 0.05),
    0px 2px 2px rgba(36, 18, 66, 0.04),
    0px 1px 0px rgba(36, 18, 66, 0.03);
  overflow: hidden;
}

/* Glass 子層：折射扭曲 + 鏡面高光（對應 Figma Glass 子層） */
.glass-layer {
  position: absolute;
  inset: 0;
  border-radius: 8px;
  pointer-events: none;

  /* 折射：Chromium 支援 SVG filter in backdrop-filter */
  backdrop-filter: url(#glass-refraction);
  -webkit-backdrop-filter: blur(20px);       /* Safari fallback */

  /* 鏡面高光 */
  background: rgba(255, 255, 255, 0.12);    /* 反光底色 */
  filter: url(#glass-specular);
  mix-blend-mode: screen;
}
```

---

## HTML 結構

```html
<div class="glass-panel">
  <div class="glass-layer" aria-hidden="true"></div>
  <!-- 內容放這裡 -->
</div>
```

---

## Browser Support

| 效果 | Chrome / Edge | Safari | Firefox |
|---|---|---|---|
| 鏡面高光 `filter: url()` | ✓ | ✓ | ✓ |
| 折射扭曲 `backdrop-filter: url()` | ✓ | ✗ fallback blur | ✗ fallback blur |

Safari / Firefox 會自動退回 `blur(20px)`，視覺上保有毛玻璃感，但無折射扭曲。

---

## 注意事項

- `feDisplacementMap` 作用於元件本身的 SourceGraphic，**不是** CSS backdrop；折射扭曲需透過 `backdrop-filter: url()` 才能作用在背景內容上
- `glass-layer` 的 `background: rgba(255,255,255,0.12)` 是鏡面高光的底色，不可設為完全透明（0 alpha 會導致高光不顯示）
- `mix-blend-mode: screen` 讓高光只加亮周圍，不蓋住底層內容
- Glass 效果需要頁面背景有顏色（建議 `utility-purple-950`），在白色背景上折射不明顯
- Figma GLASS effect 的折射是真實光學模擬，SVG filter 為近似還原，兩者視覺上有差距

---

## 與 cinta-glass.md 的分工

| | cinta-glass.md | svg-glass.md（本檔） |
|---|---|---|
| 適用層 | Figma 設計稿 | 前端程式碼 |
| 折射來源 | Figma GLASS effect（光學模擬） | `feDisplacementMap` + `backdrop-filter: url()` |
| 高光來源 | Figma Light angle/intensity 參數 | `feSpecularLighting` + `feDistantLight` |
| 模糊來源 | Figma BACKGROUND_BLUR effect style | CSS `backdrop-filter: blur(20px)` |
| Shadow | Figma Effect Style（三層） | CSS `box-shadow`（三層，數值同 cinta-glass.md） |
