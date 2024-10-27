
import axios from "axios";
import { Button, Modal } from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react"
import Cookies from "js-cookie"

const LogoutButton = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleShowModal = (e: React.MouseEvent) => { e.stopPropagation(); setIsOpen(true) };
    const handleCloseModal = () => setIsOpen(false);

    const handleLogoutButton = async () => {
        const response = await axios.post('http://localhost:2003/api/v1/logout', {}, { withCredentials: true });

        if (response.data.success) {
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            localStorage.removeItem("accessToken");
            window.location.href = "/auth/login";
        }
    }
    return (
        <>
            <Button as={Link} href="#" onClick={handleShowModal} size={'sm'} className=" border text-red-200 bg-error hover:bg-red-500 outline-none focus:outline-none">Logout</Button>
            <Modal show={isOpen} size={'md'} className="bg-white rounded-lg shadow dark:bg-gray-700">
                <Modal.Body>
                    <div className="p-4 md:p-5 text-center">
                        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to logout?</h3>
                        <button type="button" onClick={handleLogoutButton} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                            Yes, I'm sure
                        </button>
                        <button onClick={handleCloseModal} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default LogoutButton;