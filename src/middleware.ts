import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("uid")?.value;
  const url = request.nextUrl.clone();
  const loggedInUserOrNotAccessPath = request.nextUrl.pathname === "/login";
  if (url.pathname === "/") {
    url.pathname = "/foods";
    return NextResponse.redirect(new URL("/foods", url));
  }
  if (loggedInUserOrNotAccessPath) {
    if (authToken) {
      return NextResponse.redirect(new URL("/foods", request.url));
    }
  } else {
    if (!authToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/", "/login", "/foods", "/users"],
};
