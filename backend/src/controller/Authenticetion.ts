import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

const prisma = new PrismaClient;


export const register = async (req: Request, res: Response) => {
    try {
        // Melakukan query ke database untuk mengambil data semua user
        const data = await prisma.user.findMany(); // Menggunakan findMany() untuk mengambil semua data user
        return res.json({ status: true, msg: "Berhasil mendapatkan data.", data });
    } catch (error: any) {
        return res.json({ status: false, msg: "Gagal mendapatkan data.", error: error.message });
    }
}
