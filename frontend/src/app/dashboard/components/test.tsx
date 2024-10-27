'use client'
import { jwtDecode } from 'jwt-decode'; // Pastikan import jwt-decode dari library yang benar
import { useEffect, useState } from 'react';
import { useAuthToken } from '../authToken';

// Tipe untuk payload JWT yang berisi exp (waktu expire)
interface JwtPayload {
    exp: number; // Waktu expire dalam format Unix (seconds)
    user: any
}

const Test = async () => {
    const [isTokenExpired, setIsTokenExpired] = useState(false);
    const accessToken = useAuthToken(); // Hook hanya dipanggil sekali di sini

    useEffect(() => {
        if (!accessToken) return; // Jika belum ada accessToken, keluar dari useEffect

        // Decode token untuk mendapatkan payload-nya
        const decoded: JwtPayload = jwtDecode(accessToken);
        localStorage.setItem('user', JSON.stringify(decoded.user));

        // Waktu sekarang (dalam detik, bukan milidetik)
        const currentTime = Math.floor(Date.now() / 1000);

        // Cek apakah token sudah expired
        if (decoded.exp < currentTime) {
            setIsTokenExpired(true); // Token expired
        } else {
            setIsTokenExpired(false); // Token masih valid
        }
    }, [accessToken]); // Hook ini akan dipanggil ulang hanya jika accessToken berubah

    return (
        <p>Token status: {isTokenExpired ? 'Token expired' : 'Token valid'}</p>
    );
}

export default Test;
