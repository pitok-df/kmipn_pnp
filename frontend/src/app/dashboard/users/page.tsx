import { cookies } from "next/headers";
import AddUser from "./components/AddUser";
import UserTable from "./components/DataUser";
import { api } from "@/utils/api";
import { ToastContainer } from "react-toastify";

const fetchUser = async () => {
    // const cookieStore = cookies(); // Ambil cookies dari Next.js
    // const userToken = cookieStore.get("accessToken"); // g
    const res = await api.get('/users')
    return res.data.data;
}



export default async function AdminUserPage() {
    const users = await fetchUser()
    return (
        <>
            <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
                <h5 className="card-title mb-3">Data Users</h5>
                <div className="flex justify-end mb-3">
                    <AddUser />
                </div>
                <UserTable users={users} className={`p-2`} />
                <ToastContainer />
            </div>
        </>
    );
}