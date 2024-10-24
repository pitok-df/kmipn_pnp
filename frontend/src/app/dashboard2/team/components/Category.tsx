'use client'

import axios from "axios";
import { useEffect, useState } from "react";

export default function CategoryLomba() {
    const [categories, setCategori] = useState([])

    useEffect(() => {
        try {
            const fetchCategories = async () => {
                const categori = await axios.get("http://localhost:2003/api/v1/categories");
                setCategori(categori.data.data)
            }
            fetchCategories();
        } catch (error) {
            console.log(error)
        }
    }, [])


    return categories.map((categori: any) => (
        <option value={categori.id}>{categori.categoriName}</option>
    ))
}