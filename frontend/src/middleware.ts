import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface UserDecode {
    user: { role: "participant" | "admin" | "jury", teamMember: boolean, verified: boolean },
    exp: number
}

// Fungsi untuk redirect ke halaman tertentu
function redirectTo(urlPath: string, request: NextRequest) {
    const redirectUrl = new URL(urlPath, request.url);
    return NextResponse.redirect(redirectUrl);
}

// Fungsi untuk mengecek apakah token sudah expired
function isTokenExpired(token: string): boolean {
    const { exp }: UserDecode = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime > exp;
}

export function middleware(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value;
    const urlPath = request.nextUrl.pathname;

    // Jika token tidak ada, redirect ke login kalau mencoba akses halaman dashboard
    if (!token) {
        if (!urlPath.startsWith("/auth/login") && !urlPath.startsWith("/auth/register")) {
            return redirectTo("/auth/login", request);
        }
    } else {
        // Jika user sudah login, redirect dari halaman login/register ke dashboard
        if (urlPath.startsWith("/auth/login") || urlPath.startsWith("/auth/register")) {
            return redirectTo("/dashboard", request);
        }

        // Decode token dan cek role serta teamMember
        if (!isTokenExpired(token)) {
            const decodeJWT: UserDecode = jwtDecode(token);

            // Jika role "participant", cek status teamMember
            if (decodeJWT.user.role === "participant") {
                const teamDataCompleate = request.cookies.get("teamDataCompleate")?.value === 'true';

                // Kalau teamMember belum ada, redirect ke halaman lengkapi data team
                if (!teamDataCompleate && !urlPath.startsWith("/dashboard/team/compleate")) {
                    return redirectTo("/dashboard/team/compleate", request);
                }

                // Kalau teamMember sudah ada, pastikan tidak bisa akses halaman lengkapi data team
                if (teamDataCompleate && urlPath.startsWith("/dashboard/team/compleate")) {
                    return redirectTo("/dashboard/team", request);
                }
            }
        } else {
            // Hapus token kalau sudah expired dan redirect ke login
            const response = redirectTo("/auth/login", request);
            response.cookies.delete("accessToken");
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/auth/:path*"]
};
