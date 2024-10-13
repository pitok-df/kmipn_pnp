import { PrismaClient, RoleUser } from "@prisma/client";
import { hashPassword } from "../utils/hashUtils";
import { AppError } from "../utils/AppError";

const prisma = new PrismaClient();

export const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
}

export const getUserById = async (id: string) => {
    const users = await prisma.user.findUnique({ where: { id } });
    if (!users) throw new AppError("user not found", 404);
    return users;
}

export const registerUser = async (email: string, password: string, name: string, role: RoleUser) => {
    const hashedPassword = await hashPassword(password)
    const user = await prisma.user.create({
        data: { email: email, name: name, password: hashedPassword, role: role }
    });

    return user;
}

export const emailExist = async (email: string) => {
    const existedEmail = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (existedEmail) return true;
    return false;
}