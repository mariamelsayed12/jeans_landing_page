import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ar"],

  // Used when no locale matches
  defaultLocale: "en",
  localePrefix: "always"
});

export function proxy(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ar|en)/:path*"]
};
