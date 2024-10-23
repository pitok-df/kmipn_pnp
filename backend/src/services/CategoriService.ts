import { db } from "../config/database"
import { AppError } from "../utils/AppError";

export const getAllDataCategory = async () => {
    const categori = await db.category.findMany();
    return categori;
}