'use client'

import { useEffect, useState } from "react";

const NameUser = () => {
    const [name, setName] = useState<string>("");
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userName = localStorage.getItem("user_name");
            setName(userName || "Guest");
        }
    }, [])
    return name ? name : "Loading...";
}

export default NameUser;