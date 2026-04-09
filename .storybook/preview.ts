import type { Preview } from "@storybook/react";
import React from "react";  // ✅ 加這行
import "../src/index.css";

const preview: Preview = {
  globalTypes: {
    viewMode: {
      name: 'View Mode',
      description: '切換顯示模式',
      defaultValue: 'normal',
      toolbar: {
        icon: 'branch',
        items: [
          { value: 'normal', title: 'Normal View' },
          { value: 'uiflow', title: 'UI Flow Map' },
          { value: 'prd',    title: 'PRD' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },

  decorators: [
  (Story, context) => {
    const viewMode = context.globals.viewMode;

    // ✅ 只在 Canvas (story) 模式下，且非 Normal View 才套用
    if (context.viewMode !== "story" || viewMode === "normal") {
      return Story();
    }

    if (viewMode === "uiflow") {
      const content = context.parameters.uiflow ?? "（尚未填寫 UI Flow）";
      return React.createElement("div", { style: { padding: "2rem" } },
        React.createElement("p", null, content)
      );
    }

    if (viewMode === "prd") {
      const content = context.parameters.prd ?? "（尚未填寫 PRD）";
      return React.createElement("div", { style: { padding: "2rem" } },
        React.createElement("p", null, content)
      );
    }

    return Story();
  },
],

  parameters: {
    options: {
      storySort: {
        order: [
          'Workspace',
          ['Sphere', '*'],

          'Foundation',
          [
            'Color',
            'Typography',
            'Elevation',
            ['Glass', 'Shadow', 'Blur', 'Focus Ring'],
            'Spacing',
            ['Border Radius', 'Gap', 'Padding'],
            'Icons',
            '*',
          ],
          'Components',
          [
            'Sidebar',
            'Button',
            'Breadcrumb',
            'Badge',
            'Checkbox',
            'Card',
            ['Card', 'Data Card', '*'],
            'Chart',
            'Command',
            'Dialog',
            'Dropdown',
            'Divider',
            '*',
          ],
          
          '*',
        ],
      },
    },
    backgrounds: {
      default: "agaruda-purple",
      values: [
        { name: "agaruda-purple", value: "#e6e4ed" },
        { name: "agaruda-dark", value: "#0d052c" },
        { name: "white", value: "#ffffff" },
        { name: "dark", value: "#171d1f" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;