import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

interface userDecode {
    user: { role: string },
    exp: number
}

export function middleware(request: NextRequest) {
    const token = request.cookies.get('refreshToken');
    const url = request.nextUrl.clone();

    // jika access token belum ada pada cookies
    if (!token) {
        // redirect ke halaman login
        if (url.pathname !== "/auth/login") { url.pathname = "/auth/login"; return NextResponse.redirect(url); }
    } else {
        if (request.nextUrl.pathname.startsWith("/auth/login")) return NextResponse.redirect(new URL("/dashboard2", request.url));
        const decodeJWT: userDecode = jwtDecode(token.value); // decode token
        const currentTime = Math.floor(Date.now() / 1000); // ini untuk mendapatkan waktu sekarang dalam mili detik

        // Redirect ke halaman jika token sudah expired
        if (currentTime > decodeJWT.exp) {
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")

            if (url.pathname !== "/auth/login") { url.pathname = "/auth/login"; return NextResponse.redirect(url); }
        }

        const userRole = {
            admin: [],
            participant: []
        }

        // redirect ke halaman unauthorized jika role user tidak sesaui
        if (decodeJWT.user.role !== 'participant') {
            return NextResponse.rewrite(new URL("/unauthorized", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard2/:path*", "/auth/login"]
}