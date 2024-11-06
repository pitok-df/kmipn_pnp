"use client";

import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VerifyEmail() {
    const [token, setToken] = useState<string | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const url = useSearchParams()

    useEffect(() => {
        // const urlParams = new URLSearchParams(window.location.search);
        const tokenParam = url.get('token');
        setToken(tokenParam);
        console.log(url.get("token"));
    }, []);

    useEffect(() => {
        // Pastikan token tidak null sebelum memanggil verifyEmail
        if (token) {
            const verifyEmail = async () => {
                try {
                    const verify = await axios.post(
                        `/api/v1/verify-email?token=${token}`,
                        {},
                        { withCredentials: true, headers: { "Content-Type": "application/json" } }
                    );
                    setStatus("Succesfully verify email")
                    setTimeout(() => {
                        window.location.href = "/auth/login"
                    }, 2000);
                } catch (error) {
                    setStatus("Failed verifing email, token invalid or expire.")
                }
            };
            verifyEmail();
        }
    }, [token]); // Effect ini akan berjalan ketika `token` berubah

    return (
        <div>
            {status}
        </div>
    );
}
