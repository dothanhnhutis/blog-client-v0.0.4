import {
  publicRoutes,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
} from "@/routes";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import configs from "./config";

export function middleware(request: NextRequest) {
  const { nextUrl } = request;

  const isLoggedIn = !!request.cookies.get("session");

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // if (isApiAuthRoute) {
  //   return null;
  // }
  // if (isAuthRoute) {
  //   if (isLoggedIn)
  //     return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  //   return null;
  // }

  // if (!isLoggedIn && !isPublicRoute)
  //   return NextResponse.redirect(new URL("/auth/signin", nextUrl));

  // return null;

  if (isLoggedIn) {
    if (nextUrl.pathname.startsWith("/auth/signout")) {
      fetch(`${configs.NEXT_PUBLIC_SERVER_URL}/auth/signout`, {
        method: "GET",
        headers: {
          Cookie: cookies().toString(),
        },
      });
      const response = NextResponse.redirect(
        new URL("/auth/signin", request.url)
      );
      response.cookies.delete("session");
      return response;
    }
    if (nextUrl.pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  } else {
    if (nextUrl.pathname.startsWith(DEFAULT_LOGIN_REDIRECT)) {
      return NextResponse.redirect(new URL("/auth/signin", nextUrl));
    }
    return;
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
