import 'react-toastify/ReactToastify.css'

import axios from "axios";
import { Button, FileInput } from "flowbite-react";
import React, { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function UploadProposal() {
    const [proposal, setPtroposal] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const fileInputRef = useRef(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setIsLoading(true)
            const uploadProposal = axios.post("/api/v1/upload-proposal?type=proposal",
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
            if (fileInputRef.current) {
                const file: any = fileInputRef.current;
                file.value = ''
            }
            setIsLoading(false)
        } catch (error) {
            console.log(error);

            toast.info("failed upload proposal")
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex gap-3">
                <FileInput
                    id="proposal"
                    required
                    ref={fileInputRef}
                    accept='application/pdf'
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setPtroposal(file);
                    }}
                />
                <Button disabled={isLoading} type="submit" className="bg-primary hover:bg-blue-600">Upload</Button>
            </form>
            <ToastContainer />
        </>
    );
}