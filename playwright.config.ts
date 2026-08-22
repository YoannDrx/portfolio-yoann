import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  timeout: 45_000,
  expect: { timeout: 8_000, toHaveScreenshot: { maxDiffPixelRatio: 0.015 } },
  use: {
    baseURL: "http://127.0.0.1:3127",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
    {
      name: "webkit-mobile",
      use: { ...devices["iPhone 13"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
  ],
  webServer: {
    command: "NEXT_DIST_DIR=.next-playwright pnpm dev --hostname 127.0.0.1 --port 3127",
    url: "http://127.0.0.1:3127/fr",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
