import { db } from "../config/database"
import { AppError } from "../utils/AppError";

export const createProposalService = async (teamID: number, filelink: string) => {
    const proposal = await db.proposal.create({ data: { teamId: teamID, fileLink: filelink, title: "default title" } });
    if (!proposal) throw new AppError("Failed create proposal", 400);
    return proposal;
}