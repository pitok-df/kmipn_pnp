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
        include: { teamMembers: true, lecture: true, proposal: true, teamCategory: true, submission: true }
    });

    const dataMap = dataTeam.map((item) => ({
        teamName: item.name,
        categori: item.teamCategory.categoriName,
        institution: item.institution,
        lectureName: item.lecture.name,
        lectureNip: item.lecture.nip,
        teamMembers: item.teamMembers.map((member) => ({
            name: member.name + (member.role === 'leader' ? " (ketua)" : ''),
            nim: member.nim,
            email: member.email,
            noWA: member.no_WA,
            prodi: member.prodi,
            fileKTM: member.fileKTM
        })),
        linkProposal: item.proposal?.fileLink,
        statusProposal: item.proposal?.status,
        statusSubmission: item.submission?.status || null
    }));

    if (!dataTeam) throw new AppError("Failed get team data.", 400);
    return dataMap;
}