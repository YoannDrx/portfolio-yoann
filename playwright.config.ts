import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  timeout: 45_000,
  expect: { timeout: 8_000, toHaveScreenshot: { maxDiffPixelRatio: 0.015 } },
  use: {
    baseURL: "http://127.0.0.1:3127",
    browserName: "chromium",
    channel: "chrome",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "NEXT_DIST_DIR=.next-playwright pnpm dev --hostname 127.0.0.1 --port 3127",
    url: "http://127.0.0.1:3127/fr",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
