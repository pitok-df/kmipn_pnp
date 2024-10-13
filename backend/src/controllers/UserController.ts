import { Request, Response } from "express"
import { ResponseApi } from "../types/types";
import { getAllUsers, getUserById } from "../services/UserService";
import { AppError } from "../utils/AppError";

export const getAllUser = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        return res.json({ success: true, msg: "success retrived data", data: users })
    } catch (error: any) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                msg: error.message
            });
        }

        return res.status(500).json({
            success: false,
            msg: 'Internal Server Error'
        });
    }
}

export const getUserId = async (req: Request, res: Response) => {
    try {
        const params = req.params;
        const user = await getUserById(String(params.id));
        return res.status(200).json({
            success: true,
            msg: "successfully retrivied data",
            data: user
        });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                msg: error.message
            });
        }

        return res.status(500).json({
            success: false,
            msg: 'Internal Server Error'
        });
    }
};