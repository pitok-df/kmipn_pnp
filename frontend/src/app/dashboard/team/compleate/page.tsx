import { Metadata } from "next";
import CompleateTeamForm from "../../components/CompleateTeamForm";

export const metadata: Metadata = {
    title: "Komplit Data Team"
}

export default function team() {
    return (
        <>
            <div className="w-full mb-3 border flex justify-between border-l-4 border-l-warning p-4 shadow-sm rounded-sm">
                <p className="font-semibold">Pastikan data tim dan anggota sudah benar sebelum disubmit. Setelah pengiriman, data tidak bisa diubah lagi.</p>
            </div>
            <CompleateTeamForm />
        </>
    );
}