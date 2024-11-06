'use client'

import axios from "axios";
import { Modal } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function DeleteCategory({ data, onClose }: { data: { id: number, categoriName: string }, onClose: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const handleModal = () => setIsOpen(!isOpen);
    const router = useRouter();

    const handleClose = () => {
        onClose(); // panggil fungsi onClose dari komponen induk
    };

    const handleDelete = async () => {
        try {
            const res = await axios.delete('/api/v1/categories/' + data.id, { withCredentials: true });
            if (res.status === 200) {
                router.refresh();
                toast.success("Successfully delete categories.");
                setIsOpen(false);
                onClose()
            }
        } catch (error: any) {
            // toast.error("Failed delete user." + error);
            if (error.status === 400) {
                toast.error(error.response.data.msg)
            }
        } finally { setIsOpen(false) }
    }
    return (
        <>
            <Modal show={true} size={'md'} onClose={onClose} className="bg-white rounded-lg shadow dark:bg-gray-700">
                <Modal.Body>
                    <div className="p-4 md:p-5 text-center">
                        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete <strong>{data.categoriName}</strong>?</h3>
                        <button type="button" onClick={handleDelete} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                            Yes, I'm sure
                        </button>
                        <button onClick={handleClose} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}