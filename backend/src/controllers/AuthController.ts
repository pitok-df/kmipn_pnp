import { Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { ResponseApi } from "../types/ApiType";
import { registerService, verifyTokenService } from "../services/AuthService";

export const register = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const { email, name, password } = req.body;
        const user = await registerService(email, password, name);
        return res.status(201).json({ success: false, msg: "User registered successfully, check your email for verify email.", data: user })
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                msg: error.message
            });
        }
        return res.status(500).json({ success: false, msg: "Internal server error" });
    }
}

export const verifyToken = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const { token } = req.query
        const cektoken = await verifyTokenService(String(token));
        if (!cektoken) throw new AppError("Something went wrong", 400);
        return res.status(200).json({ success: true, msg: "Email verified successfully" });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                msg: error.message
            });
        }
        return res.status(500).json({ success: false, msg: "Internal server error" });
    }
}