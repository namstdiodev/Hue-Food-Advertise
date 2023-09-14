import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("next-auth.session-token")?.value;
  const url = request.nextUrl.clone();
  const loggedInUserOrNotAccessPath = request.nextUrl.pathname === "/login";
  if (url.pathname === "/") {
    url.pathname = "/dashboard";
    return NextResponse.redirect(new URL("/dashboard", url));
  }
  if (loggedInUserOrNotAccessPath) {
    if (authToken) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } else {
    if (!authToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/", "/login", "/dashboard"],
};
