'use client'

import AlertError from "@/app/components/AlertError";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import { fromPairs, isArray } from "lodash";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons";

type formUser = {
    name: string,
    email: string,
    role: 'admin' | 'juri' | '',
    password: string
}

export default function AddUser() {
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState<formUser>({ name: '', email: '', role: '', password: '' });
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

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)
    const clearForm = () => {
        setForm({ name: '', email: '', password: '', role: '' });
        setErrors({ name: null, email: null, password: null, role: null });
        setOtherError(null);
        setIsOpen(false);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            setIsLoading(true)

            const response = await axios.post("/api/v1/users", {
                name: form.name, email: form.email, role: form.role, password: form.password
            }, { withCredentials: true, headers: { "Content-Type": "application/json" } });
            if (response.status === 201) toast.success("Successfully added new user.");
            router.refresh()
            clearForm()
        } catch (error: any) {
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
            <Button as={Link} onClick={openModal} href="#" size={'sm'} className="border text-white bg-primary hover:bg-blue-500 w-max outline-none focus:outline-none">
                Add
                <FontAwesomeIcon icon={faPlus} size="1x" color="white" />
            </Button>
            <Modal show={isOpen} size={'lg'} className={`shadow dark:bg-gray-700 backdrop-blur-sm transform transition-all duration-500 
                ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header className="p-3 bg-lightprimary" >
                        <div className="capitalize text-gray-600 font-medium">Add New User</div>
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
                                value={form.name}
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
                                value={form.email}
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
                                value={form.role}
                                onChange={(e) => handleChange(e)}
                                name="role"
                                id="role">
                                <option value="">--Pilih Role--</option>
                                <option value="admin">Admin</option>
                                <option value="juri">Juri</option>
                            </Select>
                            {errors.role && <small className="text-error font-medium ml-3">{errors.role}</small>}
                        </div>

                        <div className="mb-3">
                            <div className="mb-2 block">
                                <Label value="Password" htmlFor="password" />
                            </div>
                            <TextInput
                                color={errors.password ? 'failure' : 'default'}
                                value={form.password}
                                onChange={(e) => handleChange(e)}
                                name="password"
                                type="password"
                                placeholder="*********"
                                id="password" />
                            {errors.password && <small className="text-error font-medium ml-3">{errors.password}</small>}
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="p-3 justify-end">
                        <Button className="border text-white bg-success hover:bg-green-500 w-max outline-none focus:outline-none" size={'sm'} disabled={isLoading} type="submit">{isLoading ? 'Saving...' : 'Save'}</Button>
                        <Button size={'sm'} type="button" onClick={closeModal} className="ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Close</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}