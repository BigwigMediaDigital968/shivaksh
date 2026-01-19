import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require admin authentication
const ADMIN_PATHS = ["/admin"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin routes
  if (ADMIN_PATHS.some((path) => pathname.startsWith(path))) {
    const adminAuth = req.cookies.get("adminAuth")?.value;

    if (adminAuth !== "true") {
      // Redirect to login if not authenticated
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Apply middleware to all /admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
