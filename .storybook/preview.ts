import type { Preview } from "@storybook/react";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "agaruda-purple",
      values: [
        { name: "agaruda-purple", value: "#e6e4ed" },
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