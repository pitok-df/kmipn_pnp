'use client'

import AlertError from "@/app/components/AlertError";
import axios from "axios";
import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import { isArray, uniqueId } from "lodash";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { userType } from "@/utils/types";

type formUser = {
    id?: string,
    name: string | null,
    email: string | null,
    role: string | null,
    password: string | null
}

export default function EditeUser({ user }: { user: userType }) {
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState<formUser>({ name: user.name, email: user.email, role: user.role, password: '' });
    const [errors, setErrors] = useState({ name: null, email: null, role: null, password: null });
    const [otherError, setOtherError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handaleModal = () => setIsOpen(!isOpen)
    const clearForm = () => {
        setIsOpen(false);
        setForm({ name: user.name, email: user.email, role: user.role, password: '' });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            setIsLoading(true)
            const response = await axios.put("/api/v1/users/" + user.id, {
                name: form.name, email: form.email, role: form.role, password: form.password
            }, { withCredentials: true, headers: { "Content-Type": "application/json" } });
            if (response.status === 200) {
                toast.dismiss(); // Tutup semua toast yang aktif
                toast.success("Successfully updated user.", { toastId: uniqueId() });
            }

            console.log(response.data);
            router.refresh();
            clearForm();
        } catch (error: any) {
            console.log(error);

            const errorCode = error.status;
            if (errorCode === 400) {
                const errors = error.response.data.errors;
                const newErrors: any = {}
                if (isArray(errors)) {
                    errors.forEach(error => {
                        newErrors[error.path] = error.msg
                    });
                } else {
                    setOtherError(errors)
                }
                setErrors(newErrors)
            }
        } finally { setIsLoading(false) }
    }

    return (
        <>
            {/* <ToastContainer limit={1} /> */}
            <Button as={Link} onClick={handaleModal} href="#" size={'sm'} className="border text-white bg-warning hover:bg-warning w-max outline-none focus:outline-none">
                <FontAwesomeIcon icon={faPencil} size="1x" color="white" />
            </Button>
            <Modal show={isOpen} size={'lg'} onClose={handaleModal} className={`shadow dark:bg-gray-700 backdrop-blur-sm transform transition-all duration-500 
                ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header className="p-3 bg-primary text-white" >
                        <div className="capitalize text-white font-medium">Update User</div>
                    </Modal.Header>
                    <Modal.Body>
                        {otherError && <AlertError errors={otherError} />}
                        <div className="mb-3">
                            <div className="mb-2 block">
                                <Label value="Name" htmlFor="name" />
                            </div>
                            <TextInput
                                color={errors.name ? 'failure' : 'default'}
                                name="name"
                                value={form.name!}
                                onChange={(e) => handleChange(e)}
                                type="text"
                                placeholder="Jono Iskandar"
                                id="name" />
                            {errors.name && <small className="text-error font-medium ml-3">{errors.name}</small>}
                        </div>
                        <div className="mb-3">
                            <div className="mb-2 block">
                                <Label value="Email" htmlFor="email" />
                            </div>
                            <TextInput
                                color={errors.email ? 'failure' : 'default'}
                                value={form.email!}
                                onChange={(e) => handleChange(e)}
                                name="email"
                                type="email"
                                placeholder="email@example.com"
                                id="email" />
                            {errors.email && <small className="text-error font-medium ml-3">{errors.email}</small>}
                        </div>
                        <div className="mb-3">
                            <div className="mb-2 block">
                                <Label value="Role" htmlFor="role" />
                            </div>
                            <Select
                                color={errors.role ? 'failure' : 'default'}
                                value={form.role!}
                                onChange={(e) => handleChange(e)}
                                name="role"
                                id="role">
                                <option value="">--Pilih Role--</option>
                                <option value="admin">Admin</option>
                                <option value="juri">Juri</option>
                                <option value="participant">Participant</option>
                            </Select>
                            {errors.role && <small className="text-error font-medium ml-3">{errors.role}</small>}
                        </div>

                        <div className="mb-3">
                            <div className="mb-2 block">
                                <Label value="Change password" htmlFor="password" />
                            </div>
                            <TextInput
                                color={errors.password ? 'failure' : 'default'}
                                value={form.password!}
                                onChange={(e) => handleChange(e)}
                                name="password"
                                type="password"
                                placeholder="*********"
                                id="password" />
                            {errors.password && <small className="text-error font-medium ml-3">{errors.password}</small>}
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="p-3 justify-end bg-white">
                        <Button className="border text-white bg-success hover:bg-green-500 w-max outline-none focus:outline-none" size={'sm'} disabled={isLoading} type="submit">{isLoading ? 'Updating...' : 'update'}</Button>
                        <Button size={'sm'} type="button" onClick={handaleModal} className="ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Close</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}