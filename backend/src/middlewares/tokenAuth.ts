import { NextFunction, Response } from "express";
import { decodeJWT, verifyToken } from "../config/jwt";

export const authenticateJWT = (req: Request | any, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) return res.status(401).json({ "massage": "Token is required." });
    const decodeToken = decodeJWT(accessToken);
    const currentTime = Math.floor(Date.now() / 1000);
    const expireToken = decodeToken.exp;

    if (currentTime > expireToken!) {
        res.clearCookie("accessToken");
        return res.status(401).json({ message: "Your session expired, please login again." })
    }
    try {
        const decode = verifyToken(accessToken);
        req.user = decode;
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};