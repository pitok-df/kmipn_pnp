'use client'

import AlertError from "@/app/components/AlertError";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { isArray } from "lodash";
import Link from "next/link";
import { useState } from "react";

type formCategory = {
    categoriName: string,
    description: string
}

export default function AddCategory() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState<formCategory>({ categoriName: '', description: '' })
    const [errors, setErrors] = useState({ categoriName: null, description: null });
    const [otherError, setOtherError] = useState();

    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        try {
            setIsLoading(true)
        } catch (error: any) {
            if (error.status === 400) {
                const errors = error.response.data.errors;
                const newErrors: any = {}
                if (isArray(errors)) {
                    errors.forEach((error) => {
                        newErrors[error.path] = error.msg
                    })
                } else {
                    setOtherError(errors)
                }
                setErrors(newErrors);
            }
        } finally { setIsLoading(false) }
    }
    return (
        <>
            <Button as={Link} onClick={handleModal} href="#" size={'sm'} className="border text-white bg-primary hover:bg-blue-500 w-max outline-none focus:outline-none">
                Add
                <FontAwesomeIcon icon={faPlus} size="1x" color="white" />
            </Button>

            <Modal size={'lg'} onClose={handleModal} className="shadow dark:bg-gray-700 backdrop-blur-sm transform transition-all duration-500">
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
                                color={errors?.categoriName ? 'failure' : 'default'}
                                name="categoriName"
                                value={form?.categoriName || ''}
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
                            {isLoading ? 'Saving...' : 'Save'}
                        </Button>
                        <Button size={'sm'} type="button" onClick={handleModal} className="ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border hover:bg-gray-100 focus:outline-none">
                            Close
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}