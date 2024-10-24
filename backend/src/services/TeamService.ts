import { db } from "../config/database"
import { AppError } from "../utils/AppError";

export const createTeamService = async (
    teamName: string,
    categoriID: number,
    institusi: string,
    lectureID: number
) => {
    const team = await db.team.create({
        data: {
            name: teamName,
            categoryID: categoriID,
            institution: institusi,
            lectureID: lectureID
        }
    });

    if (!team) throw new AppError("Failed create team", 400);

    return team;
}