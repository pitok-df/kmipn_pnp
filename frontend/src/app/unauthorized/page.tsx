'use client'

import { useRouter } from "next/navigation";

export default function unauthorized() {
    const router = useRouter();
    return (
        <>
            <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900">
                <div className="text-center flex items-center">
                    <h1 className="text-ld text-4xl">403</h1>
                    <h2 className="font-bold mx-2 text-2xl">|</h2>
                    <h6 className="text-xl text-ld">
                        Akses ditolak.
                    </h6>
                </div>
                <span className="link mt-4" onClick={() => router.back()}>Kembali ke halaman sebelumnya</span>
            </div>
        </>
    );
}