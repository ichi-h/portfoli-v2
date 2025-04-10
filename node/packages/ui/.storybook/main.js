import { dirname, join } from "path";

const path = require("path");

const { vanillaExtractPlugin } = require("@vanilla-extract/vite-plugin");
const { mergeConfig } = require("vite");
module.exports = {
  stories: ["../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))"],

  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-a11y"),
  ],

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },

  features: {
    interactionsDebugger: true,
  },

  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [vanillaExtractPlugin()],
      alias: {
        "@": path.resolve(__dirname, "../src"),
      },
      base: "./",
    });
  },

  staticDirs: [
    {
      from: "./assets",
      to: "/public",
    },
  ],

  docs: {
    defaultName: "Docs",
    autodocs: true,
  },
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}
