import { NextFunction, Response } from "express";
import { verifyToken } from "../config/jwt";


export const authenticateJWT = (req: any, res: Response, next: NextFunction) => {
    // const token = req.headers.authorization?.split(' ')[1];
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(403).json({ message: 'Token is required' });

    try {
        const decoded: any = verifyToken(token);
        if (decoded.user.role !== 'admin') return res.status(401).json({ message: 'Forbidden' });
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};