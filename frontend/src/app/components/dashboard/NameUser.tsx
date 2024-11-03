'use client'

import { getUserLogin } from "@/services/authServices";
import axios from "axios";
import { useEffect, useState } from "react";

const NameUser = () => {
    const [name, setName] = useState<string | null>(null);
    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await getUserLogin();
                setName(response.name)
            } catch (error) {
                console.log(error);
            }
        }
        getUserData();
    }, [name])
    if (!name) {
        return (<p className="w-[10rem] mx-3 h-5 rounded-lg animate-pulse bg-gray-300"></p>)
    }
    return (
        <p className="text-black mx-3">
            {name}
        </p>
    );
}

export default NameUser;