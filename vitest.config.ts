/// <reference types="vitest/config" />
import { fileURLToPath } from "node:url";
import { getViteConfig } from "astro/config";

export default getViteConfig({
  resolve: {
    alias: {
      "@src": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
