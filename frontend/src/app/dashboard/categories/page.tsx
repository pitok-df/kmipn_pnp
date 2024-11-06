

import { api } from "@/utils/api";
import DataCategory from "./dataCategori";
import { Metadata } from "next";
import AddCategory from "./addCategory";

const fetchCategories = async () => {
    const categori = await api.get('/categories-close');
    return categori.data.data;
}

export const metadata: Metadata = {
    title: "Data Categories"
}

export default async function categoriesPage() {
    const categori = await fetchCategories();
    return (
        <>
            <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
                <h5 className="card-title mb-3">Data Categories</h5>
                <div className="flex justify-end mb-3">
                    <AddCategory />
                </div>
                <DataCategory data={categori} />
            </div>
        </>
    );
}