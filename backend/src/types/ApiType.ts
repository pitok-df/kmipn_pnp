import { $Enums } from "@prisma/client";

export interface ResponseApi {
    success: boolean,
    msg: string,
    data?: any
}

export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    role: $Enums.RoleUser;
}