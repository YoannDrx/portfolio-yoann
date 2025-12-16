import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const LOCALES = ["fr", "en"] as const;
const DEFAULT_LOCALE = "fr";

function isLocale(value: string): value is (typeof LOCALES)[number] {
  return (LOCALES as readonly string[]).includes(value);
}

const EXCLUDED_PREFIXES = ["/api", "/_next"];
const EXCLUDED_PATHS = new Set([
  "/offline",
  "/opengraph-image",
  "/twitter-image",
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Skip public files (e.g. /favicon.ico, /robots.txt, /sitemap.xml, /manifest.json, etc.)
  if (/\.[^/]+$/.test(pathname)) {
    return NextResponse.next();
  }

  if (EXCLUDED_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const [, maybeLocale] = pathname.split("/");

  if (!maybeLocale || !isLocale(maybeLocale)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", maybeLocale);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

