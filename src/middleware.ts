
// import { NextResponse } from "next/server";
// // import { verifyJwt, cookieName, AuthPayload } from "@/lib/auth";
// import { verifyJwt, cookieName, AuthPayload } from "./app/lib/auth";

// export function middleware(req: Request) {
//   const url = req.url;
//   const cookie = (req as any).cookies.get(cookieName)?.value;

//   if (!cookie) {
//     if (url.includes("/admin")) {
//       return NextResponse.redirect(new URL("/auth/login", url));
//     }
//     return NextResponse.next();
//   }

//   const session = verifyJwt(cookie) as AuthPayload | null;

//   if (!session) {
//     return NextResponse.redirect(new URL("/auth/login", url));
//   }

//   // ROLE CHECK
//   if (url.includes("/admin") && session.role !== "SUPER_ADMIN") {
//     return NextResponse.redirect(new URL("/auth/login", url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };

import { NextResponse } from "next/server";
import { verifyJwt, cookieName } from '@/lib/auth';

const publicRoutes = ["/signin", "/reset-password"];

export function middleware(req:any) {
  const url = req.nextUrl.clone();
  const path = url.pathname;

  const token = req.cookies.get(cookieName)?.value ?? null;
  const session = token ? verifyJwt(token) : null;

  // Allow API routes
  if (path.startsWith("/api")) return NextResponse.next();

  // Allow public pages
  if (publicRoutes.includes(path)) {
    if (session) {
      if (session.role === "SUPER_ADMIN") return NextResponse.redirect(new URL("/admin", req.url));
      if (session.role === "ORG_ADMIN") return NextResponse.redirect(new URL("/org/dashboard", req.url));
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // Block private pages
  if (!session) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
