'use client'

import axios from 'axios';
import { useEffect, useState } from 'react';

export const useAuthToken = () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        // Cek apakah berjalan di client (browser)
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            setAccessToken(token);
        }

        // Interceptor untuk request, tambahkan accessToken ke headers
        const api = axios.create({
            baseURL: 'http://localhost:2003',
            withCredentials: true
        });

        api.interceptors.request.use(
            (config) => {
                if (accessToken) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        console.log("running api interceptor");

        api.interceptors.response.use(
            (response) => response,
            async (error) => {
                console.log(error);

                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const response = await axios.post('http://localhost:2003/api/v1/refresh-token', {}, {
                            withCredentials: true
                        });
                        console.log(response);

                        const newAccessToken = response.data.accessToken;

                        if (typeof window !== 'undefined') {
                            localStorage.setItem('accessToken', newAccessToken);
                        }

                        setAccessToken(newAccessToken);

                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return axios(originalRequest);
                    } catch (refreshError) {
                        console.info('Refresh token failed: ' + refreshError);
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );
    }, [accessToken]);

    return accessToken;
};
