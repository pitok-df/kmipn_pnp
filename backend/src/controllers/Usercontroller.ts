import { NextFunction, Request, Response } from "express";
import { addUserService, Delete, editUSer, GetAllUser, GetByID } from "../services/UserService";
import { ResponseApi, User } from "../types/ApiType";
import { AppError } from "../utils/AppError";
import { hashPassword } from "../utils/HashPassword";
import { validationResult } from "express-validator";

export const AllUser = async (req: Request, res: Response<ResponseApi>, next: NextFunction) => {
    try {
        const users = await GetAllUser();
        return res.status(200).json({ success: true, statusCode: 200, msg: "Successfully get data", data: users });
    } catch (error) {
        return res.status(500).json({ success: false, statusCode: 500, msg: "Internal server error" });
    }
}

export const GetUserById = async (req: Request, res: Response<ResponseApi>, next: NextFunction) => {
    try {
        const params = req.params;
        const user = await GetByID(String(params.id));
        return res.status(200).json({ success: true, statusCode: 200, msg: "Successfully get data", data: user });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ success: false, statusCode: error.statusCode, msg: error.message })
        } else {
            return res.status(500).json({ success: false, statusCode: 500, msg: "Internal server error" })
        }
    }
}

export const DeleteUser = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const { id } = req.params;
        const user = await Delete(id);
        return res.status(200).json({ success: true, statusCode: 200, msg: "Successfully delete user " + user.name })
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ success: false, statusCode: error.statusCode, msg: error.message })
        } else {
            return res.status(500).json({ success: false, statusCode: 500, msg: "Internal server error" })
        }
    }
}

export const updateUser = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, statusCode: 400, msg: "Validation require", errors: errors.array() });
        }
        const { id } = req.params
        const { email, password, name, role } = req.body
        let hashedPassword = null
        if (password) {
            hashedPassword = await hashPassword(password);
        }

        await editUSer(id, email, hashedPassword, name, role);

        return res.status(200).json({ success: true, statusCode: 200, msg: "Successfully update user" });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ success: false, statusCode: error.statusCode, msg: error.message, errors: error.message });
        }
        return res.status(500).json({ success: false, statusCode: 500, msg: "Internal server error" + error })
    }
}

export const addUser = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, statusCode: 400, msg: "Validation require", errors: errors.array() });
        }
        const { name, password, role, email } = req.body

        const hashedPassword = await hashPassword(password);
        const user = await addUserService(email, hashedPassword, name, role);
        return res.status(201).json({ success: true, statusCode: 201, msg: "Successfully add new user", data: user });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ success: false, statusCode: error.statusCode, msg: error.message, errors: error.message });
        }
        return res.status(500).json({ success: false, statusCode: 500, msg: "Internal server error" + error })
    }
}