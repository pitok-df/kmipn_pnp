import { Request, Response } from "express";
import { getAllDataCategory } from "../services/CategoriService";
import { ResponseApi } from "../types/ApiType";

export const getAllCategory = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const categori = await getAllDataCategory();
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Successfully get data",
            data: categori
        })
    } catch (error) {
        res.status(500).json({
            success: false, statusCode: 500, msg: "Internal server error"
        });
    }
}