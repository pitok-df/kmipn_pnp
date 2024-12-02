import { api } from "@/lib/api";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";

export default function UploadProposal() {

    const [proposal, setProposal] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const fileInputRef = useRef(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            const uploadProposal = api.post("/api/v1/upload-proposal?type=proposal",
                { file_proposal: proposal },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" }
                });
            toast.promise(uploadProposal, {
                error: "Failed upload proposal",
                pending: "Uploading...",
                success: "Successfully upload proposal"
            });
            mutate("/api/v1/team-member")
            if (fileInputRef.current) {
                const file: any = fileInputRef.current;
                file.value = ''
            }
        } catch (error) {
            console.log(error);
            toast.info("failed upload proposal")
        } finally { setIsLoading(false) }
    }

    return (
        <form onSubmit={handleSubmit} className="flex btn-group-horizontal w-full">
            <input
                type="file"
                required
                accept="application/pdf"
                className="input-file"
                onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) setProposal(file);
                }}
            />
            <button type="submit" disabled={isLoading} className={`btn btn-primary ${isLoading && "btn-loading"}`}>Upload</button>
        </form>
    );
}