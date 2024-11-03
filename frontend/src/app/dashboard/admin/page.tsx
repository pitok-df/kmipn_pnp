import NameUser from "@/app/components/dashboard/NameUser";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard Admin"
}

export default function AdminPage() {
    return (
        <div>
            <h1 className="flex font-medium text-2xl">Wellcome back, <NameUser /></h1>
        </div>
    );
}