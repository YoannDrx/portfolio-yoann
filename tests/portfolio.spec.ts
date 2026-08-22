import { expect, test } from "@playwright/test";

const featuredIds = [
  "featured-klesia",
  "featured-jaji",
  "featured-pressay",
  "featured-jobio",
  "featured-moodday",
  "featured-mycryptopilot",
];

test("le web et l’iPhone exposent la même sélection", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/fr");

  for (const id of featuredIds) {
    await expect(page.locator(`[data-content-id="${id}"]`)).toHaveCount(1);
  }

  await page.getByRole("button", { name: /iPhone/i }).first().click();
  await page.getByRole("button", { name: "Projets", exact: true }).last().click();
  for (const id of featuredIds) {
    await expect(page.locator(`[data-content-id="${id}"]`)).toHaveCount(1);
  }
  await expect(page.locator('[data-content-id="complete-journey"]')).toHaveCount(0);
  await page.getByRole("tab", { name: "Parcours complet" }).click();
  await expect(page.locator('[data-content-id="complete-journey"]')).toBeVisible();
});

test("le parcours complet conserve exactement les mêmes identifiants dans les deux modes", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/fr#work");
  await page.getByRole("tab", { name: /^Tous/ }).click();
  const webIds = await page.locator('[data-content-id^="journey-"]').evaluateAll((elements) =>
    elements.map((element) => element.getAttribute("data-content-id")).filter(Boolean).sort()
  );
  expect(webIds.length).toBeGreaterThan(10);

  await page.getByRole("button", { name: /iPhone/i }).first().click();
  await page.getByRole("button", { name: "Projets", exact: true }).last().click();
  await page.getByRole("tab", { name: "Parcours complet" }).click();
  await page.getByRole("tab", { name: /^Tous/ }).click();
  const iphoneIds = await page.locator('[data-content-id^="journey-"]').evaluateAll((elements) =>
    elements.map((element) => element.getAttribute("data-content-id")).filter(Boolean).sort()
  );
  expect(iphoneIds).toEqual(webIds);
});

test("le mode, la langue et le thème restent cohérents", async ({ page }) => {
  await page.goto("/fr?tab=work#work");
  await page.getByRole("button", { name: /iPhone/i }).first().click();
  await expect(page.locator(".ios-tab-item").filter({ hasText: "Projets" })).toHaveAttribute("aria-current", "page");

  await page.getByRole("button", { name: "Switch to English" }).first().click();
  await expect(page).toHaveURL(/\/en\?tab=work#work$/);
  await expect(page.getByRole("button", { name: "Work", exact: true }).last()).toBeVisible();

  await page.getByRole("button", { name: "Toggle theme" }).first().click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.reload();
  await expect(page.getByRole("button", { name: /iPhone/i }).first()).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("html")).toHaveClass(/dark/);
});

test("le hero et les contrôles restent dans le viewport", async ({ page }) => {
  const runtimeErrors: string[] = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") runtimeErrors.push(message.text());
  });
  const viewports = [
    [320, 568],
    [390, 844],
    [768, 1024],
    [1024, 768],
    [1280, 800],
    [1440, 900],
    [1920, 1080],
    [2560, 1440],
  ] as const;

  await page.goto("/fr");
  for (const [width, height] of viewports) {
    await page.setViewportSize({ width, height });
    await expect(page.locator("body")).toHaveJSProperty("scrollWidth", width);
    const controls = page.locator('[aria-label="Mode d’affichage"]').first();
    await expect(controls).toBeVisible();
    await expect(controls).toHaveCSS("position", "fixed");
    await expect(page.getByRole("navigation", { name: "Portfolio" })).toHaveCount(0);
    const box = await controls.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1);

    const portrait = page.locator('img[alt="Yoann Andrieux"]:visible').first();
    const portraitBox = await portrait.boundingBox();
    expect(portraitBox).not.toBeNull();
    expect(portraitBox!.y).toBeGreaterThanOrEqual(0);
    expect(portraitBox!.y + portraitBox!.height).toBeLessThanOrEqual(height + 1);
  }
  expect(runtimeErrors).toEqual([]);
});

test("les validations du contact et le honeypot fonctionnent sans envoi", async ({ page }) => {
  await page.setExtraHTTPHeaders({ "x-forwarded-for": "198.51.100.77" });
  await page.goto("/fr#contact");
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Envoyer" }).click();
  await expect(page.locator("#contact-name-help")).toContainText("nom");
  await expect(page.locator("#contact-name")).toBeFocused();

  await page.locator("#contact-name").fill("Audit E2E");
  await page.locator("#contact-email").fill("audit@example.com");
  await page.locator("#contact-message").fill("Un message de validation assez long pour le parcours de test automatisé.");
  await page.locator('input[name="company"]').fill("honeypot-test");
  const response = page.waitForResponse((item) => item.url().endsWith("/api/send-email"));
  await page.getByRole("button", { name: "Envoyer" }).click();
  expect((await response).status()).toBe(200);
  await expect(page.locator("#contact").getByRole("status")).toContainText("Message envoyé");
});

test("l’API contact refuse les payloads invalides et limite le débit sans envoyer d’email", async ({ request }) => {
  const invalid = await request.post("/api/send-email", {
    headers: { "x-forwarded-for": "198.51.100.80" },
    data: { name: "", email: "incorrect", message: "court" },
  });
  expect(invalid.status()).toBe(400);

  const safePayload = {
    name: "Audit automatisé",
    email: "audit@example.com",
    message: "Ce message de test ne doit jamais être envoyé car le honeypot est rempli.",
    company: "bot-field",
  };
  const idempotencyHeaders = {
    "x-forwarded-for": "198.51.100.81",
    "x-contact-request-id": "123e4567-e89b-12d3-a456-426614174000",
  };
  for (let index = 0; index < 2; index += 1) {
    const response = await request.post("/api/send-email", { headers: idempotencyHeaders, data: safePayload });
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ success: true });
  }

  for (let index = 0; index < 5; index += 1) {
    const response = await request.post("/api/send-email", {
      headers: { "x-forwarded-for": "198.51.100.82" },
      data: { name: "", email: "incorrect", message: "court" },
    });
    expect(response.status()).toBe(400);
  }
  const limited = await request.post("/api/send-email", {
    headers: { "x-forwarded-for": "198.51.100.82" },
    data: { name: "", email: "incorrect", message: "court" },
  });
  expect(limited.status()).toBe(429);
});

test("les routes recruteur essentielles répondent", async ({ page }) => {
  for (const locale of ["fr", "en"]) {
    for (const route of ["", "/cv", "/projects/pressay", "/projects/jobio", "/projects/moodday", "/projects/mycryptopilot", "/offline"]) {
      const response = await page.goto(`/${locale}${route}`);
      expect(response?.status(), `${locale}${route}`).toBe(200);
      await expect(page.locator("h1").first()).toBeVisible();
    }
  }
  const notFound = await page.goto("/fr/route-inexistante");
  expect(notFound?.status()).toBe(404);
});

test("le CV et les métadonnées publiques sont servis avec les bons contrats", async ({ request }) => {
  const manifest = await request.get("/manifest.json");
  expect(manifest.status()).toBe(200);
  expect((await manifest.json()).name).toContain("Dev React Native");

  const pdf = await request.post("/api/cv", { data: { locale: "fr" } });
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  expect(pdf.headers()["content-disposition"]).toContain("CV_Yoann_Andrieux_2026.pdf");
  expect((await pdf.body()).subarray(0, 4).toString()).toBe("%PDF");
});

test("snapshots de la DA production", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const locale of ["fr", "en"] as const) {
    await page.goto(`/${locale}`);
    await page.evaluate(() => localStorage.setItem("theme", "light"));
    await page.reload();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
    await expect(page).toHaveScreenshot(`web-${locale}-light.png`, { fullPage: false });
    await page.getByRole("button", { name: locale === "fr" ? "Changer de thème" : "Toggle theme" }).first().click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(page).toHaveScreenshot(`web-${locale}-dark.png`, { fullPage: false });
  }
});
