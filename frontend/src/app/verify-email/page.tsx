"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function VerifyEmail() {
    const [token, setToken] = useState<string | null>(null);
    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenParam = urlParams.get('token');
        setToken(tokenParam);
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
