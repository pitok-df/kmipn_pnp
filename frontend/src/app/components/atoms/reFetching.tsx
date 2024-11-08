'use client'

import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function RefreshRouter() {
    const router = useRouter()
    return (
        <Button color={'warning'} size={'sm'} className="hover:bg-yellow-400" onClick={() => router.refresh()}>
            <FontAwesomeIcon icon={faRefresh} />
        </Button>
    );
}