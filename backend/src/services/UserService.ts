import { db } from "../config/database"
import { AppError } from "../utils/AppError";

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
    const user = await db.user.findUnique({ where: { id } });
    if (!user) throw new AppError("User not found", 404);
    await db.user.delete({ where: { id } });
    return user;
}