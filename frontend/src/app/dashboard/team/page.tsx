import { Metadata } from "next";

import DashboardTeamData from "../components/DashboardTeam";

export const metadata: Metadata = {
    title: "Team Deashbord"
}

export default function team() {
    return (
        <>
            <h2 className="text-3xl font-bold  mb-6">Team Dashboard!</h2>
            <DashboardTeamData />
        </>
    );
}