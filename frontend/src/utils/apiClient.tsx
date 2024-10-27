import axios from "axios";
import { setCookie } from "cookies-next";
import dotenv from 'dotenv'
import Cookies from "js-cookie";

dotenv.config()

const BASEURL_BACKEND = process.env.NEXT_PUBLIC_BASEURL_BACKEND!;
const apiClient = axios.create({
    baseURL: BASEURL_BACKEND,
    withCredentials: true
});

apiClient.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("accessToken");
        config.headers['Authorization'] = `Bearer ${token}`
        return config
    }, (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;
        console.log(error);

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await axios.post(`${BASEURL_BACKEND}/refresh-token`, {}, { withCredentials: true });

                localStorage.setItem("accessToken", response.data.data.accessToken);
                setCookie("accessToken", response.data.data.accessToken);
                return apiClient(originalRequest);
            } catch (error) {
                // Jika refresh gagal, redirect ke halaman login atau logout
                localStorage.removeItem("user_name")
                localStorage.removeItem("idUser")
                localStorage.setItem("sessionExpired", "true");
                window.location.href = '/auth/login';
                return Promise.reject(error);
            }
        }
        return Promise.reject(error)
    }
);

export default apiClient;