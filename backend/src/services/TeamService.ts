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

export const getDataTeamService = async () => {
    const dataTeam = await db.team.findMany({
        include: { teamMembers: { orderBy: { role: "asc" } }, lecture: true, proposal: true, teamCategory: true, submission: true }, orderBy: { verified: "asc" }
    });

    const dataMap = dataTeam.map((item) => ({
        id: item.id,
        teamName: item.name,
        categori: item.teamCategory.categoriName,
        institution: item.institution,
        lectureName: item.lecture.name,
        lectureNip: item.lecture.nip,
        verified: item.verified,
        teamMembers: item.teamMembers.map((member) => ({
            name: member.name,
            nim: member.nim,
            email: member.email,
            noWA: member.no_WA,
            prodi: member.prodi,
            role: member.role,
            fileKTM: member.fileKTM
        })),
        linkProposal: item.proposal?.fileLink,
        statusProposal: item.proposal?.status,
        statusSubmission: item.submission?.status || null
    }));

    if (!dataTeam) throw new AppError("Failed get team data.", 400);
    return dataMap;
}

export const verifyTeamService = async (teamID: number) => {
    const verifiedTeam = await db.team.update({
        where: {
            id: teamID
        }, data: { verified: true }
    });

    if (!verifiedTeam) throw new AppError("Failed verified team", 400);
    return verifiedTeam;
}