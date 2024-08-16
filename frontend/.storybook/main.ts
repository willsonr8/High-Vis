import type { StorybookConfig } from "@storybook/nextjs";
import { Configuration } from "webpack";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ["../public"],
  webpackFinal: async (config: Configuration) => {
    if (config.module?.rules) {
      config.module.rules.push({
        test: /\.[jt]sx?$/,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              presets: [require.resolve("next/babel")],
              plugins: [require.resolve("react-refresh/babel")],
            },
          },
        ],
        exclude: /node_modules/,
      });
    }
    return config;
  },
};

export default config;
