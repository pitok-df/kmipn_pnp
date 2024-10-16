import { Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { ResponseApi } from "../types/ApiType";
import { loginService, registerService, verifyTokenService } from "../services/AuthService";
import { decryptToken, generateRefreshToken, generateToken, refreshTokenJwt, verifyToken } from "../config/jwt";
import jwt from 'jsonwebtoken'

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

export const verifyTokens = async (req: Request, res: Response<ResponseApi>) => {
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
        return res.status(500).json({ success: false, msg: "Internal server error" });[]
    }
}

export const login = async (req: Request, res: Response<ResponseApi>) => {
    const { email, password } = req.body;
    try {
        const userValid = await loginService(email, password);
        const accessToken = generateToken(userValid);
        const refreshToken = generateRefreshToken(userValid);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json({
            success: true, msg: "successfully login", data: {
                accessToken: accessToken
            }
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
            msg: "Internal server error " + error
        });
    }
}

export const refreshToken = (req: Request, res: Response<ResponseApi>) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) throw new AppError("Refresh token not found", 400);
        const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || '';
        const newAccessToken = refreshTokenJwt(refreshToken);
        jwt.verify(refreshToken, JWT_REFRESH_SECRET, (error: any, data: any) => {
            return res.status(200).json({
                success: true,
                msg: "Successfully refresh token",
                data: {
                    accessToken: newAccessToken
                }
            });
        });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                msg: error.message
            })
        }

        return res.status(500).json({
            success: false,
            msg: "Internal server error" + error
        })
    }
}

export const logout = (req: Request, res: Response<ResponseApi>) => {
    res.clearCookie('refreshToken'); // Hapus refresh token dari cookie
    res.status(200).json({ success: true, msg: 'Logged out successfully' });
};