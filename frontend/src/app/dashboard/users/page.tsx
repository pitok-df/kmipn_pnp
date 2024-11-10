import RefreshRouter from "@/app/components/atoms/reFetching";
import AddUser from "./components/AddUser";
import UserTable from "./components/DataUser";
import { api } from "@/utils/api";
import { cookies } from "next/headers";

const fetchUser = async () => {
    const accessToken = cookies().get("accessToken")?.value;
    const res = await api.get('/users', {
        withCredentials: true,
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    })
    return res.data.data;
}

export const metadata = {
    title: 'Users',
};

export default async function AdminUserPage() {
    const users = await fetchUser()
    return (
        <>
            <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
                <h5 className="card-title mb-3">Data Users</h5>
                <div className="flex justify-end mb-3">
                    <div className="gap-3 flex">
                        <AddUser />
                        <RefreshRouter />
                    </div>
                </div>
                <UserTable users={users} className={`p-2`} />
            </div>
        </>
    );
}