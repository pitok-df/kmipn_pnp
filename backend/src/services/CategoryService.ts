import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CategoryAll = async () => {
    const categories = await prisma.category.findMany();
    return categories;
}