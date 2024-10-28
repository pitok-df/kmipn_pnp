import { NextFunction, Request, Response } from "express";
import { decodeJWT } from "../config/jwt";
import { db } from "../config/database";

export const checkDataCompleate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;

    try {
        const decodeToken = decodeJWT(token)
        const userID = decodeToken.user.id;
        const user = await db.user.findUnique({
            where: { id: userID }, include: {
                teamMember: true
            }
        });

        if (user?.teamMember) {
            return res.json({ teamDataCompleate: true })
        }
        return res.json({ teamDataCompleate: false })
    } catch (error) {
        console.log(error);
    }

}