import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface UserDecode {
    user: { role: "participant" | "admin" | "jury"; teamMember: boolean; verified: boolean };
    exp: number;
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

// Daftar path yang diizinkan untuk setiap role
const allowedPathsByRole: { [key: string]: string[] } = {
    participant: [
        "/dashboard/team",
        "/dashboard",
        "/dashboard/team/compleate",
    ],
    admin: [
        "/dashboard/icons/solar",
        "/dashboard/admin",
        "/dashboard/admin/settings",
        "/dashboard/users"
    ],
    jury: [
        "/dashboard/jury",
        "/dashboard/jury/review",
        "/dashboard/jury/feedback"
    ]
};

export function middleware(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value;
    const urlPath = request.nextUrl.pathname;

    if (!token) {
        if (!urlPath.startsWith("/auth/login") && !urlPath.startsWith("/auth/register")) {
            return redirectTo("/auth/login", request);
        }
    } else {
        if (urlPath.startsWith("/auth/login") || urlPath.startsWith("/auth/register")) {
            return redirectTo("/dashboard", request);
        }

        if (!isTokenExpired(token)) {
            const decodeJWT: UserDecode = jwtDecode(token);
            const userRole = decodeJWT.user.role;
            const teamDataCompleate = request.cookies.get("teamDataCompleate")?.value === 'true';

            if (userRole === "participant") {
                if (!teamDataCompleate && !urlPath.startsWith("/dashboard/team/compleate")) {
                    return redirectTo("/dashboard/team/compleate", request);
                }
                if (teamDataCompleate && urlPath.startsWith("/dashboard/team/compleate")) {
                    return redirectTo("/dashboard/team", request);
                }
            }

            // Cek akses berdasarkan daftar izin di allowedPathsByRole
            const allowedPaths = allowedPathsByRole[userRole] || [];
            if (!allowedPaths.some((allowedPath) => urlPath.startsWith(allowedPath))) {
                return redirectTo("/unauthorized", request);
            }

        } else {
            const response = redirectTo("/auth/login", request);
            response.cookies.delete("accessToken");
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/auth/:path*", "/verify-email"],
};
