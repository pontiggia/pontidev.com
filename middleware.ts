import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";

  if (hostname === "cv.felipepontiggia.com") {
    return NextResponse.rewrite(
      new URL("/pontiggia_felipe_resume_en.pdf", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
