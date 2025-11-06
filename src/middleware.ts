import { NextRequest, NextResponse } from "next/server";

export function middleware(req:NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect only dashboard/admin routes
  if (pathname.startsWith("/protections") || pathname.startsWith("/admin") || pathname === "/") {
    const token = req.cookies.get("auth_token")?.value;
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/protections/:path*", "/admin/:path*"],
};
