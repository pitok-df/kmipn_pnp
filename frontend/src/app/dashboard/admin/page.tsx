import NameUser from "@/app/components/dashboard/NameUser";
import { Metadata } from "next";
import CountTeam from "./countTeam";
import { api } from "@/utils/api";

export const metadata: Metadata = {
    title: "Dashboard Admin"
}

const fetchAllTeamInfo = async () => {
    const response = await api.get("/all-team-member", { withCredentials: true });
    return response.data.data;
}

export default async function AdminPage() {
    const allTeamInfo = await fetchAllTeamInfo();
    return (
        <>
            <div>
                <h1 className="flex font-medium text-2xl">Wellcome back, <NameUser /></h1>
            </div>
            <CountTeam team={allTeamInfo} />
        </>
    );
}