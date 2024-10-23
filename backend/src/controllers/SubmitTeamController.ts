import { Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { ResponseApi } from "../types/ApiType";

export const completeTeam = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const { dosenName, nipDosen } = req.body;
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ success: false, statusCode: error.statusCode, msg: error.message });
        }
        return res.status(500).json({ success: false, statusCode: 500, msg: "Internal server error" })
    }
}