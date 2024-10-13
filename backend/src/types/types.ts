export interface RoleAccess {
    role: "admin" | "participant";
}

export interface ResponseApi {
    success: boolean,
    msg: string,
    data?: any
}