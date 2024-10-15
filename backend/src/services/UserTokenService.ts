import { db } from "../config/database"

export const findToken = async (token: string) => {
    const userToken = await db.userToken.findUnique({
        where: { token },
        include: { user: true }
    });

    return userToken;
}