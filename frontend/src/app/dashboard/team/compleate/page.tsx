import { Metadata } from "next";
import CompleateTeamForm from "../../components/CompleateTeamForm";

export const metadata: Metadata = {
    title: "Komplit Data Team"
}

export default function team() {
    return (
        <>
            <div className="w-full p-4 bg-blue-50 border border-blue-300 text-blue-800 rounded-lg mb-6 shadow-sm">
                <p className="font-semibold">Pastikan data tim dan anggota sudah benar sebelum disubmit. Setelah pengiriman, data tidak bisa diubah lagi.</p>
            </div>
            <CompleateTeamForm />
        </>
    );
}