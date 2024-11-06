'use client'

import Table from "@/utils/TablePaginition";
import EditeCategory from "./editCategory";
import { useState } from "react";
import DeleteCategory from "./deleteCategory";

export default function DataCategory({ data }: { data: any }) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [category, setCategory] = useState(null);

    const handleEdit = (categori: any) => {
        setCategory(categori);
        setIsEditOpen(true)
    }

    const closeEditModal = () => {
        setIsEditOpen(!isEditOpen)
        setCategory(null)
    }
    const handleDelete = (categori: any) => {
        setCategory(categori);
        setIsDeleteOpen(true)
    }

    const closeDeleteModal = () => {
        setIsDeleteOpen(!isDeleteOpen)
        setCategory(null)
    }

    return (
        <>
            {
                isEditOpen && category ? (
                    <EditeCategory data={category} onClose={closeEditModal} />
                ) : ''
            }

            {
                isDeleteOpen && category && (
                    <DeleteCategory data={category} onClose={closeDeleteModal} />
                )
            }
            <Table
                data={data}
                columns={['categoriName', 'description']}
                headers={['#', 'Categori', 'description']}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </>
    );
}