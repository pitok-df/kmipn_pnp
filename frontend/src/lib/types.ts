import { ChangeEventHandler, HTMLAttributes } from "react"

export interface Category {
    id: number,
    categoriName: string,
    description: string
}

export type InputProps = {
    className?: HTMLAttributes<HTMLDivElement> | string,
    value: string | number,
    onChange: ChangeEventHandler<HTMLSelectElement>,
    name?: string,
    id?: string
}

export interface Categories {
    id: number;
    categoriName: string;
    description: string | null
}

export interface Members {
    name: string,
    nim: string,
    email: string,
    noWA: string,
    prodi: string,
    fileKTM: string,
    role: string
}

export interface User {
    email: string;
    id: string;
    name: string;
    role: "participant" | "juri" | "admin" | string;
    verified: boolean;
}

export interface teamMemberType {
    id?: number,
    teamName: string,
    categori: string,
    institution: string,
    lectureName: string,
    lectureNip: string,
    linkProposal: string,
    statusProposal: string,
    statusSubmission: string,
    round: string,
    verified: boolean,
    teamMembers?: any
}
export interface teamMember1 {
    id?: number,
    teamName: string,
    categori: string,
    institution: string,
    lectureName: string,
    lectureNip: string,
    linkProposal: string,
    statusProposal: string,
    statusSubmission: string,
    round: string,
    verified: boolean,
    teamMembers?: Members[]
}