import { NextFunction, Request, Response } from "express";
import { Delete, GetAllUser, GetByID } from "../services/UserService";
import { ResponseApi, User } from "../types/ApiType";
import { AppError } from "../utils/AppError";

export const AllUser = async (req: Request, res: Response<ResponseApi>, next: NextFunction) => {
    try {
        const users = await GetAllUser();
        return res.status(200).json({ success: true, msg: "Successfully get data", data: users });
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal server error" });
    }
}

export const GetUserById = async (req: Request, res: Response<ResponseApi>, next: NextFunction) => {
    try {
        const params = req.params;
        const user = await GetByID(String(params.id));
        return res.status(200).json({ success: true, msg: "successfully get data", data: user });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ success: false, msg: error.message })
        } else {
            return res.status(500).json({ success: false, msg: "Internal server error" })
        }
    }
}

export const DeleteUser = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const { id } = req.params;
        const user = await Delete(id);
        return res.status(200).json({ success: true, msg: "Successfully delete user " + user.name })
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ success: false, msg: error.message })
        } else {
            return res.status(500).json({ success: false, msg: "Internal server error" })
        }
    }
}