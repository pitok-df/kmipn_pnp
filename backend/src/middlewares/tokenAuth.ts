import { NextFunction, Response } from "express";
import { decodeJWT, verifyToken } from "../config/jwt";


// export const authenticateJWT = (req: Request | any, res: Response, next: NextFunction) => {
//     const authHeader = req.headers['authorization'];
//     const token = req.cookies.accessToken;

//     if (!token) return res.status(401).json({ message: 'Token is required' });
//     const cookie = req.cookies.refreshToken;
//     const decode = decodeJWT(cookie);
//     const currentTime = Math.floor(Date.now() / 1000);
//     const expire = decode.exp;

//     if (currentTime > expire!) {
//         res.clearCookie('refreshToken');
//         return res.status(400).json({ success: false, statusCode: 400, msg: "You session expire, please login back." })
//     }
//     try {
//         const decoded: any = verifyToken(token);
//         // if (decoded.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
//         req.user = decoded;
//         next();
//     } catch (err) {
//         return res.status(401).json({ message: 'Invalid token' });
//     }
// };
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