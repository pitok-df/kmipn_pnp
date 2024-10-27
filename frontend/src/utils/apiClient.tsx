
import axios from "axios";
import dotenv from 'dotenv'

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
                return apiClient(originalRequest);
            } catch (error) {
                // Jika refresh gagal, redirect ke halaman login atau logout
                // window.location.href = '/auth/login';
                return Promise.reject(error);
            }
        }
        return Promise.reject(error)
    }
);

export default apiClient;