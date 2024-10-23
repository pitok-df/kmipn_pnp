'use client'

import { useEffect, useState } from "react";

const NameUser = () => {
    const [name, setName] = useState<string>("");
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                const data = JSON.parse(storedUser);
                setName(data.name || "Guest");
            }
        }
    }, [])
    return name ? name : "Loading...";
}

export default NameUser;