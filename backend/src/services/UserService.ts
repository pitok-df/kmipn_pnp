import { db } from "../config/database"
import { AppError } from "../utils/AppError";
import { RoleUser } from "@prisma/client";

export const GetAllUser = async () => {
    const users = await db.user.findMany();
    return users;
}

export const GetByID = async (id: string) => {
    const user = await db.user.findUnique({ where: { id }, include: { userToken: true } });
    if (!user) throw new AppError("User not found", 404);
    return user;
}

export const Delete = async (id: string) => {
    // cari user berdasarkan id
    const user = await db.user.findUnique({ where: { id } });
    // jika user tidak ditemukan lempar error
    if (!user) throw new AppError("User not found", 404);
    // jika ada hapus user
    await db.user.delete({ where: { id } });
    return user;
}

export const editUSer = async (id: string, email: string, password: string, name: string, role: RoleUser) => {
    const user = await db.user.findUnique({ where: { id: id } });
    // mencari user berdasarkan email, jika user tidak ada lempar error
    if (!user) throw new AppError("User not found", 404);

    // update data user
    const userUpdate = await db.user.update({
        data: { email, password, name, role }, where: { id }
    });

    // jika user gagal diupdate maka lempar error
    if (!userUpdate) throw new AppError("failed update data user", 400);
    return userUpdate;
}

export const addUserService = async (email: string, password: string, name: string, role: RoleUser) => {
    // menambahkan data user ke database
    const newUser = await db.user.create({ data: { email, password, name, role } });
    // jika gagal menambahan data lempar error
    if (!newUser) throw new AppError("Failed add new user", 400);
    // jika tidak ada error kembalikan data user yang baru dicreate
    return newUser;
}