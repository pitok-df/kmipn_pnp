import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('refreshToken');

    if (token && request.nextUrl.pathname.startsWith("/auth/login")) return NextResponse.redirect(new URL("/dashboard2", request.url));

    if (!token && request.nextUrl.pathname.startsWith("/dashboard2")) return NextResponse.redirect(new URL("/auth/login", request.url));
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard2/:path*", "/auth/login"]
}