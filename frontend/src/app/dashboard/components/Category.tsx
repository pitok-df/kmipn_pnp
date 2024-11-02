'use client'

import { useEffect, useState } from "react";
import axios from "axios";

export default function CategoryLomba() {
    const [categories, setCategori] = useState([])

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:2003/api/v1/categories');
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.success) setCategori(data.data);
            console.log(data);

        }
        return () => { eventSource.close(); }
        // try {
        //     const fetchCategories = async () => {
        //         const categori = await axios.get('/api/v1/categories', { withCredentials: true });
        //         setCategori(categori.data.data)
        //     }
        //     fetchCategories();
        // } catch (error) {
        //     console.log(error)
        // }
    }, []);


    return categories.map((categori: any) => (
        <option key={"ctgry" + categori.id} value={categori.id}>{categori.categoriName}</option>
    ))
}