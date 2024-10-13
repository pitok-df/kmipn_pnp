import { Request, Response } from "express"
import { AppError } from "../utils/AppError"
import { ResponseApi } from "../types/types"
import { CategoryAll } from "../services/CategoryService"

export const GetAllCategory = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const categories = await CategoryAll();
        return res.status(200).json({ success: true, msg: "successfully retrivied data", data: categories });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                msg: error.message
            });
        }
    }
}