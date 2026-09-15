import { expect, test } from "@playwright/test";

const featuredIds = [
  "featured-klesia",
  "featured-jaji",
  "featured-pressay",
  "featured-parigo",
  "featured-moodday",
  "featured-loic",
];

test("le web et l’iPhone exposent la même sélection", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/fr");

  for (const id of featuredIds) {
    await expect(page.locator(`[data-content-id="${id}"]:visible`)).toHaveCount(1);
  }

  await page.getByRole("button", { name: /iPhone/i }).first().click();
  await expect(page).toHaveURL(/mode=iphone/);
  await page.getByRole("button", { name: "Projets", exact: true }).last().click();
  for (const id of featuredIds) {
    await expect(page.locator(`[data-content-id="${id}"]:visible`)).toHaveCount(1);
  }
  await expect(page.locator('[data-content-id="complete-journey"]')).toHaveCount(0);
  await page.getByRole("tab", { name: "Parcours complet" }).click();
  await expect(page.locator('[data-content-id="complete-journey"]')).toBeVisible();
});

test("le parcours complet conserve exactement les mêmes identifiants dans les deux modes", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/fr?mode=web#work");
  await page.getByRole("button", { name: "Vue liste" }).click();
  const webJourney = page.locator('#work [data-content-id^="journey-"]:visible');
  await expect(webJourney).toHaveCount(26);
  const webIds = await webJourney.evaluateAll((elements) =>
    elements.map((element) => element.getAttribute("data-content-id")).filter(Boolean).sort()
  );
  expect(webIds).toHaveLength(26);

  await page.getByRole("button", { name: /iPhone/i }).first().click();
  await expect(page).toHaveURL(/mode=iphone/);
  await page.getByRole("button", { name: "Projets", exact: true }).last().click();
  await page.getByRole("tab", { name: "Parcours complet" }).click();
  await page.getByRole("tab", { name: /^Tous/ }).click();
  const iphoneIds = await page.locator('[data-content-id^="journey-"]:visible').evaluateAll((elements) =>
    elements.map((element) => element.getAttribute("data-content-id")).filter(Boolean).sort()
  );
  expect(iphoneIds).toEqual(webIds);
});

test("les familles filtrent le parcours et les détails s’ouvrent dans la modale", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/fr?mode=web#work");
  const work = page.locator("#work");

  await work.getByRole("button", { name: "Cinéma", exact: true }).click();
  const odysseyCard = work.locator('[data-content-id="journey-24"]');
  await expect(odysseyCard).toBeVisible();
  await expect(odysseyCard).toContainText("2026");
  await expect(odysseyCard).not.toContainText("4 juillet");

  await odysseyCard.click();
  const odysseyDialog = page.getByRole("dialog", { name: "L’Odyssée — cabine 70 mm au Grand Rex" });
  await expect(odysseyDialog).toBeVisible();
  const viewport = page.viewportSize();
  expect(viewport).not.toBeNull();
  await expect.poll(() => page
    .locator("[data-modal-viewport-layer]")
    .evaluate((element) => Math.round(element.getBoundingClientRect().width)))
    .toBe(viewport!.width);
  await expect.poll(() => page
    .locator("[data-modal-viewport-content]")
    .evaluate((element) => Math.round(element.getBoundingClientRect().width)))
    .toBe(viewport!.width);
  await expect(odysseyDialog).toContainText("4 juillet 2026");
  await expect(odysseyDialog.getByRole("button", { name: "Fermer" })).toHaveCSS("background-color", /rgb/);
  await page.keyboard.press("Escape");
  await expect(odysseyDialog).toHaveCount(0);

  await work.getByRole("button", { name: "Web & produit", exact: true }).click();
  await work.locator('[data-content-id="journey-23"]').click();
  const parigoDialog = page.getByRole("dialog", { name: "Parigo Music — refonte produit" });
  await expect(parigoDialog).toBeVisible();
  await expect(parigoDialog).toContainText("Recherche « piano »");
  await expect(parigoDialog.getByRole("img", { name: "Recherche « piano » — site actuel" })).toBeVisible();
  await expect(parigoDialog.getByRole("img", { name: "Recherche « piano » — nouvelle expérience" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(parigoDialog).toHaveCount(0);
  await expect(page.locator("[data-modal-viewport-layer]")).toHaveCount(0);

  await work.locator('[data-content-id="journey-yodev"]').click();
  const yodevDialog = page.getByRole("dialog", { name: "Yodev — studio & produits SaaS" });
  await expect(yodevDialog).toBeVisible();
  await expect(yodevDialog).toContainText("Yodev — la landing commerciale");
  await expect(yodevDialog).toContainText("Mail by Yodev");
  await expect(yodevDialog).toContainText("Ads by Yodev");
  await expect(yodevDialog).toContainText("Spend by Yodev");
  await expect(yodevDialog).toContainText("Né de mon besoin");
  await expect(yodevDialog.getByRole("link", { name: "Voir le projet" })).toHaveAttribute("href", "https://www.yodev.fr/fr");
});

test("le mode, la langue et le thème restent cohérents", async ({ page }) => {
  await page.goto("/fr?mode=web&tab=work#work");
  await page.getByRole("button", { name: /iPhone/i }).first().click();
  await expect(page).toHaveURL(/mode=iphone/);
  await expect(page.getByRole("button", { name: "Projets", exact: true }).last()).toHaveAttribute("aria-current", "page");

  await page.getByRole("button", { name: "Switch to English" }).first().click();
  await expect(page).toHaveURL(/\/en\?(?=[^#]*tab=work)(?=[^#]*mode=iphone)[^#]+#work$/);
  await expect(page.getByRole("button", { name: "Work", exact: true }).last()).toBeVisible();

  await page.getByRole("button", { name: "Toggle theme" }).first().click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.reload();
  await expect(page.getByRole("button", { name: /iPhone/i }).first()).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("html")).toHaveClass(/dark/);
});

test("le dock reste stable et le retour Web restaure exactement la position", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/fr?mode=web");
  const controls = page.locator('[aria-label="Mode d’affichage"]');
  const nav = controls.getByRole("navigation", { name: "Sections principales" });
  const initialWidth = (await controls.boundingBox())?.width;
  const initialLinks = await nav.getByRole("link").count();

  await page.locator("#resume").scrollIntoViewIfNeeded();
  await expect(nav.getByRole("link")).toHaveCount(initialLinks);
  expect((await controls.boundingBox())?.width).toBe(initialWidth);

  const origin = await page.evaluate(() => window.scrollY);
  await page.getByRole("button", { name: /iPhone/i }).first().click();
  await expect(page).toHaveURL(/mode=iphone/);
  await page.getByRole("button", { name: "Web", exact: true }).first().click();
  await expect(page).toHaveURL(/mode=web/);
  const restored = await page.evaluate(() => window.scrollY);
  expect(restored).toBe(origin);
});

test("le switch Web iPhone reste couvert sans écran intermédiaire ni étirement", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/fr?mode=web");

  const webSurface = page.locator('[data-view-surface="web"]');
  const iphoneSurface = page.locator('[data-view-surface="iphone"]');
  const webRectBefore = await webSurface.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  });
  const transitions = await Promise.all([webSurface, iphoneSurface].map((surface) => surface.evaluate((element) => {
    const style = getComputedStyle(element);
    return { duration: style.transitionDuration, property: style.transitionProperty };
  })));
  expect(transitions).toEqual([
    { duration: "0.36s", property: "opacity" },
    { duration: "0.36s", property: "opacity" },
  ]);

  await page.evaluate(() => {
    const state = window as unknown as { __viewSurfaceEvents: string[] };
    state.__viewSurfaceEvents = [];
    document.querySelectorAll<HTMLElement>("[data-view-surface]").forEach((surface) => {
      const name = surface.dataset.viewSurface ?? "unknown";
      surface.addEventListener("transitionrun", (event) => {
        if (event.propertyName === "opacity") state.__viewSurfaceEvents.push(`run:${name}`);
      });
      surface.addEventListener("transitionend", (event) => {
        if (event.propertyName === "opacity") state.__viewSurfaceEvents.push(`end:${name}`);
      });
    });
  });

  await page.getByRole("button", { name: /iPhone/i }).first().click();
  await expect(page).toHaveURL(/mode=iphone/);
  const forwardEvents = await page.evaluate(() => (window as unknown as { __viewSurfaceEvents: string[] }).__viewSurfaceEvents);
  expect(forwardEvents).toEqual(expect.arrayContaining(["run:web", "run:iphone"]));
  const webRectAfter = await webSurface.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  });
  expect(webRectAfter).toEqual(webRectBefore);
  await expect(page.locator('[data-mode-transition-overlay]')).toHaveCount(0);

  await page.evaluate(() => { (window as unknown as { __viewSurfaceEvents: string[] }).__viewSurfaceEvents = []; });
  await page.getByRole("button", { name: "Web", exact: true }).first().click();
  await expect(page).toHaveURL(/mode=web/);
  const reverseEvents = await page.evaluate(() => (window as unknown as { __viewSurfaceEvents: string[] }).__viewSurfaceEvents);
  expect(reverseEvents).toEqual(expect.arrayContaining(["run:web", "run:iphone"]));
});

test("la scène Web vers iPhone marque une pause avant et après le switch", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/fr?mode=web");

  const scene = page.locator("#iphone-experience");
  const browserCard = scene.locator('[data-transition-card="web"]');
  const iphoneCard = scene.locator('[data-transition-card="iphone"]');

  const moveTo = async (progress: number) => {
    await scene.evaluate((element, nextProgress) => {
      const rect = element.getBoundingClientRect();
      const start = rect.top + window.scrollY;
      const range = rect.height - window.innerHeight;
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, start + range * nextProgress);
    }, progress);
  };
  const opacityOf = (locator: typeof browserCard) => locator.evaluate((element) => Number.parseFloat(getComputedStyle(element).opacity));

  await moveTo(0.06);
  await expect.poll(() => opacityOf(browserCard)).toBeGreaterThan(0.95);
  await expect.poll(() => opacityOf(iphoneCard)).toBeLessThan(0.05);

  await moveTo(0.35);
  await expect.poll(() => opacityOf(browserCard)).toBeGreaterThan(0.5);
  await expect.poll(() => opacityOf(iphoneCard)).toBeGreaterThan(0.45);

  await moveTo(0.58);
  await expect.poll(() => opacityOf(browserCard)).toBeLessThan(0.05);
  await expect.poll(() => opacityOf(iphoneCard)).toBeGreaterThan(0.95);

  await moveTo(0.82);
  await expect.poll(() => opacityOf(iphoneCard)).toBeGreaterThan(0.95);
  await expect.poll(async () => Math.abs((await scene.locator("[data-transition-stage]").boundingBox())?.y ?? 999)).toBeLessThan(2);
  const readExitParallax = () => scene.evaluate((element) => {
    const translateY = (selector: string) => {
      const target = element.querySelector(selector);
      return target ? new DOMMatrix(getComputedStyle(target).transform).m42 : 0;
    };
    return {
      copyY: translateY("[data-transition-copy]"),
      visualY: translateY("[data-transition-visual]"),
    };
  });
  await expect.poll(async () => (await readExitParallax()).copyY).toBeLessThan(-20);
  await expect.poll(async () => (await readExitParallax()).visualY).toBeLessThan(-20);
  await expect.poll(async () => {
    const parallax = await readExitParallax();
    return parallax.copyY < parallax.visualY;
  }).toBe(true);

  await moveTo(0.96);
  await expect.poll(() => scene.locator("[data-transition-copy]").evaluate((element) => Number.parseFloat(getComputedStyle(element).opacity))).toBeLessThan(0.3);
  const visualBeforeRelease = (await scene.locator("[data-transition-visual]").boundingBox())?.y ?? 0;
  await scene.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const start = rect.top + window.scrollY;
    const range = rect.height - window.innerHeight;
    window.scrollTo(0, start + range + 80);
  });
  await expect.poll(async () => (await scene.locator("[data-transition-visual]").boundingBox())?.y ?? 0).toBeLessThan(visualBeforeRelease - 40);
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
    expect(await controls.evaluate((element) => getComputedStyle(element.parentElement?.parentElement ?? element).position)).toBe("fixed");
    await expect(page.getByRole("navigation", { name: "Portfolio" })).toHaveCount(0);
    const box = await controls.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1);

    const portrait = page.locator('img[alt="Yoann Andrieux"]:visible').first();
    await expect(portrait).toBeVisible();
    const portraitBox = await portrait.boundingBox();
    expect(portraitBox).not.toBeNull();
    expect(portraitBox!.y).toBeGreaterThanOrEqual(0);
    expect(portraitBox!.y + portraitBox!.height).toBeLessThanOrEqual(height + 1);
  }
  expect(runtimeErrors).toEqual([]);
});

test("l’aperçu du showreel reste sticky et présente les bons médias", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/fr");

  const preview = page.locator("[data-showreel-preview]");
  await expect(preview).toHaveCSS("position", "sticky");

  await page.locator("#featured-work-klesia").scrollIntoViewIfNeeded();
  await expect(page.locator('[data-preview-project="klesia"] img')).toHaveCount(3);
  const firstKlesiaPreview = page
    .locator('[data-preview-project="klesia"]')
    .getByRole("button", { name: "Agrandir l’aperçu 1 de KLESIA" });
  await firstKlesiaPreview.click();
  await expect(page.getByRole("dialog", { name: /KLESIA.*aperçu agrandi/ })).toBeVisible();
  await expect(page.getByText("01 / 03")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByText("02 / 03")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(firstKlesiaPreview).toBeFocused();

  await page.locator("#featured-work-pressay").scrollIntoViewIfNeeded();
  await expect(page.locator('[data-preview-project="pressay"]')).toBeVisible();
  const pressayY = (await preview.boundingBox())?.y;
  await expect(page.locator('[data-preview-project="pressay"] img')).toHaveCount(2);
  await expect(page.locator('[data-preview-project="pressay"] img').first()).toHaveAttribute("src", /pressay-home-dark/);
  await expect(page.locator('[data-preview-project="pressay"] img').last()).toHaveAttribute("src", /pressay-modes-light/);

  await page.locator("#featured-work-moodday").scrollIntoViewIfNeeded();
  await expect(page.locator('[data-preview-project="moodday"]')).toBeVisible();
  await expect(page.locator('[data-preview-project="moodday"] img[src*="moodday-icon-current"]')).toBeVisible();
  await expect(page.locator('[data-preview-project="moodday"] img[src*="moodday-home-current"]')).toBeVisible();
  const mooddayY = (await preview.boundingBox())?.y;

  await page.locator("#featured-work-loic").scrollIntoViewIfNeeded();
  await expect(page.locator('[data-preview-project="loic"] img')).toHaveCount(2);
  await expect(page.locator('[data-preview-project="loic"] img').first()).toHaveAttribute("src", /loic-ghanem-home/);
  await expect(page.locator('[data-preview-project="loic"] img').last()).toHaveAttribute("src", /loic-ghanem-albums/);

  expect(pressayY).toBe(0);
  expect(mooddayY).toBe(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
});

test("les validations du contact et le honeypot fonctionnent sans envoi", async ({ page }) => {
  await page.setExtraHTTPHeaders({ "x-forwarded-for": "198.51.100.77" });
  await page.goto("/fr?mode=web#contact");
  const contact = page.locator("#contact");
  await contact.scrollIntoViewIfNeeded();
  await contact.getByRole("button", { name: "Envoyer" }).click();
  await expect(page.locator("#contact-name-help")).toContainText("nom");
  await expect(page.locator("#contact-name")).toBeFocused();

  await page.locator("#contact-name").fill("Audit E2E");
  await page.locator("#contact-email").fill("audit@example.com");
  await page.locator("#contact-message").fill("Un message de validation assez long pour le parcours de test automatisé.");
  await contact.locator('input[name="portfolio_verification"]').fill("honeypot-test", { force: true });
  const response = page.waitForResponse((item) => item.url().endsWith("/api/send-email"));
  await contact.getByRole("button", { name: "Envoyer" }).click();
  expect((await response).status()).toBe(200);
  await expect(page.locator("#contact").getByRole("status")).toContainText("Message envoyé");
});

test("l’API contact refuse les payloads invalides et limite le débit sans envoyer d’email", async ({ request }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Contrat API indépendant du moteur de rendu");
  const invalid = await request.post("/api/send-email", {
    headers: { "x-forwarded-for": "198.51.100.80" },
    data: { name: "", email: "incorrect", message: "court" },
  });
  expect(invalid.status()).toBe(400);

  const safePayload = {
    name: "Audit automatisé",
    email: "audit@example.com",
    message: "Ce message de test ne doit jamais être envoyé car le honeypot est rempli.",
    portfolioVerification: "bot-field",
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
      await expect(page.locator("h1:visible").first()).toBeVisible();
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

test("snapshots de la DA production", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Snapshots visuels de référence sous Chromium");
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
