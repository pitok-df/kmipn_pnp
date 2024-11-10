import RefreshRouter from "@/app/components/atoms/reFetching";
import { api } from "@/utils/api";
import AllTeamTables from "./dataTeam";
import { cookies } from "next/headers";

const fetchAllTeam = async () => {
    const cookiesStore = cookies()
    const accessToken = cookiesStore.get("accessToken")?.value;
    const response = await api.get('/all-team-member', {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });
    return response.data.data;
}

export const metadata = {
    title: 'All Team Data',
};

export default async function TeamPage() {
    const allTeamData = await fetchAllTeam();
    return (
        <>
            <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
                <h5 className="card-title mb-3">Data Teams</h5>
                <div className="flex justify-end mb-3">
                    <div className="gap-3 flex">
                        <RefreshRouter />
                    </div>
                </div>
                <AllTeamTables data={allTeamData} />
                {/* <AllTeamTable data={allTeamData} /> */}
            </div>
        </>
    );
}