'use client'

import AlertError from "@/app/components/AlertError";
import axios from "axios";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { isArray, uniqueId } from "lodash";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

type formCategory = {
    id?: string,
    categoriName: string | null,
    description: string | null
}

type editeCategory = {
    data: formCategory,
    onClose: () => void
}

export default function EditeCategory({ data, onClose }: editeCategory) {
    const [form, setForm] = useState<formCategory>({ categoriName: data.categoriName, description: data.description });
    const [errors, setErrors] = useState({ categoriName: null, description: null });
    const [otherError, setOtherError] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Reset form state on modal close
    const handleClose = () => {
        setForm({ categoriName: data.categoriName, description: data.description });
        setErrors({ categoriName: null, description: null });
        setOtherError(null);
        onClose(); // panggil fungsi onClose dari komponen induk
    };

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const response = await axios.put("/api/v1/categories/" + data.id, {
                categoriName: form.categoriName,
                description: form.description
            }, { withCredentials: true, headers: { "Content-Type": "application/json" } });

            if (response.status === 200) {
                toast.dismiss(); // Tutup semua toast yang aktif
                toast.success(response.data.msg, { toastId: uniqueId() });
                handleClose(); // Tutup modal setelah submit berhasil
                router.refresh();
            }
        } catch (error: any) {
            const errorCode = error.response?.status;
            if (errorCode === 400) {
                const errors = error.response.data.errors;
                const newErrors: any = {};
                if (isArray(errors)) {
                    errors.forEach(error => {
                        newErrors[error.path] = error.msg;
                    });
                } else {
                    setOtherError(errors);
                }
                setErrors(newErrors);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Modal show={true} size={'lg'} onClose={handleClose} className="shadow dark:bg-gray-700 backdrop-blur-sm transform transition-all duration-500">
                <form onSubmit={handleSubmit}>
                    <Modal.Header className="p-3 bg-white">
                        <div className="capitalize font-medium title">Update Category</div>
                    </Modal.Header>
                    <Modal.Body>
                        {otherError && <AlertError errors={otherError} />}
                        <div className="mb-3">
                            <div className="mb-2 block">
                                <Label value="Category Name" htmlFor="categoriName" />
                            </div>
                            <TextInput
                                color={errors.categoriName ? 'failure' : 'default'}
                                name="categoriName"
                                value={form.categoriName || ''}
                                onChange={handleChange}
                                type="text"
                                placeholder="Hackaton"
                                id="categoriName" />
                            {errors.categoriName && <small className="text-error font-medium ml-3">{errors.categoriName}</small>}
                        </div>
                        <div className="mb-3">
                            <div className="mb-2 block">
                                <Label value="Description" htmlFor="description" />
                            </div>
                            <TextInput
                                color={errors.description ? 'failure' : 'default'}
                                value={form.description || ''}
                                onChange={handleChange}
                                name="description"
                                type="text"
                                placeholder="Explain.."
                                id="description" />
                            {errors.description && <small className="text-error font-medium ml-3">{errors.description}</small>}
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="p-3 justify-end bg-white">
                        <Button className="border text-white bg-success hover:bg-green-500 w-max outline-none focus:outline-none" size={'sm'} disabled={isLoading} type="submit">
                            {isLoading ? 'Updating...' : 'Update'}
                        </Button>
                        <Button size={'sm'} type="button" onClick={handleClose} className="ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border hover:bg-gray-100 focus:outline-none">
                            Close
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}
