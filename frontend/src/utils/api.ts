import axios from "axios";
import { cookies } from "next/headers";

const cookieStore = cookies(); // Ambil cookies dari Next.js
const userToken = cookieStore.get("accessToken"); // g
export const api = axios.create({
    baseURL: "http://localhost:2003/api/v1",
    headers: {
        Cookie: userToken ? `${userToken.name}=${userToken.value}` : "",
    },
});