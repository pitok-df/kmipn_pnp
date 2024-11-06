'use client'

import { useEffect, useState } from "react";
import axios from "axios";

export default function CategoryLomba() {
    const [categories, setCategori] = useState([])

    console.log("test");
    useEffect(() => {
        try {
            const fetchCategories = async () => {
                const categori = await axios.get('/api/v1/categories-close', { withCredentials: true });
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