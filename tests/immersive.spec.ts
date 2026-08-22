import { expect, test } from "@playwright/test";

test("le contenu essentiel reste disponible sans mouvement ni canvas actif", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fr");

  const scene = page.locator("[data-scene-quality]");
  await expect(scene).toHaveAttribute("data-scene-quality", "static");
  await expect(scene).toHaveAttribute("data-webgl-state", "fallback");
  await expect(scene.locator("canvas")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: /Yoann Andrieux/i })).toBeVisible();

  await page.getByRole("button", { name: /iPhone/i }).first().click();
  await expect(page.getByRole("button", { name: /iPhone/i }).first()).toHaveAttribute("aria-pressed", "true");
  await expect(scene.locator("canvas")).toHaveCount(0);
});

test("une seule surface WebGL est conservée pendant les changements de mode", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Le chemin WebGL est observé dans Chromium.");
  await page.goto("/fr");
  const scene = page.locator("[data-scene-quality]");
  await expect(scene).toHaveAttribute("data-webgl-state", /ready|fallback/, { timeout: 8_000 });
  expect(await scene.locator("canvas").count()).toBeLessThanOrEqual(1);

  for (const mode of ["iPhone", "Web", "iPhone", "Web"] as const) {
    await page.getByRole("button", { name: mode, exact: true }).first().click();
    await expect(page.getByRole("button", { name: mode, exact: true }).first()).toHaveAttribute("aria-pressed", "true");
    expect(await page.locator("canvas").count()).toBeLessThanOrEqual(1);
  }
});

test("la perte du contexte WebGL bascule vers le poster statique", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "La perte de contexte est simulée dans Chromium.");
  await page.goto("/fr");
  const scene = page.locator("[data-scene-quality]");
  await expect(scene).toHaveAttribute("data-webgl-state", /ready|fallback/, { timeout: 8_000 });
  if ((await scene.getAttribute("data-webgl-state")) === "fallback") return;

  await scene.locator("canvas").dispatchEvent("webglcontextlost");
  await expect(scene).toHaveAttribute("data-webgl-state", "lost");
  await expect(scene.locator("canvas")).toHaveCount(0);
});
