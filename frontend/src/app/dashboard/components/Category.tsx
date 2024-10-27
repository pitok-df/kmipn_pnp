'use client'

import { useEffect, useState } from "react";
import apiClient from '@/utils/apiClient';

export default function CategoryLomba() {
    const [categories, setCategori] = useState([])

    useEffect(() => {
        try {
            const fetchCategories = async () => {
                const categori = await apiClient.get(`${process.env.NEXT_PUBLIC_BASEURL_BACKEND}/categories`);
                setCategori(categori.data.data)
            }
            fetchCategories();
        } catch (error) {
            console.log(error)
        }
    }, []);


    return categories.map((categori: any) => (
        <option key={"ctgry" + categori.id} value={categori.id}>{categori.categoriName}</option>
    ))
}