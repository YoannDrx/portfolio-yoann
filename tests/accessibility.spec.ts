import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("la vue web ne présente pas de violation axe sérieuse", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/fr");
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter((item) =>
    item.impact === "serious" || item.impact === "critical"
  );
  expect(serious).toEqual([]);
});

test("la vue iPhone plein écran ne présente pas de violation axe sérieuse", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/fr");
  await page.getByRole("button", { name: /iPhone/i }).first().click();
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter((item) =>
    item.impact === "serious" || item.impact === "critical"
  );
  expect(serious).toEqual([]);
});
