import { Request, Response } from "express"
import { createTeamMember, getTeamMemberByUserIDService } from "../services/TeamMemberService";
import { AppError } from "../utils/AppError";
import { ResponseApi } from "../types/ApiType";
import { userLogin } from "../config/jwt";

export const storeTeamMember = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const { type } = req.query;
        const fileName = `${process.env.BASEURl}/${type}/${req.file?.filename}`;
        const { teamId, userId, role, nim, name, email, no_WA, prodi } = req.body;
        const teamMember = await createTeamMember(Number(teamId), userId, role, nim, name, email, no_WA, prodi, fileName!);
        return res.status(201).json({ success: true, statusCode: 201, msg: "Successfully save team member.", data: teamMember })
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                statusCode: error.statusCode,
                msg: error.message
            });
        }
        return res.status(500).json({
            success: false,
            statusCode: 500,
            msg: "Internal server error: " + error
        });
    }
}

export const getTeamMemberByUserID = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const user = userLogin(req);
        console.log(user.id);
        const teamMember = await getTeamMemberByUserIDService(String(user.id));
        const dataMap = {
            teamName: teamMember.team.name,
            categori: teamMember.team.teamCategory.categoriName,
            institution: teamMember.team.institution,
            lectureName: teamMember.team.lecture.name,
            lectureNip: teamMember.team.lecture.nip,
            linkProposal: teamMember.team.proposal?.fileLink,
            statusProposal: teamMember.team.proposal?.status || 'pending',
            statusSubmission: teamMember.team.submission?.status || 'pending',
            verified: teamMember.team.verified,
            teamMembers: teamMember.team.teamMembers.map((member) => ({
                name: `${member.name} ${member.role === "leader" ? ' (Ketua)' : ''}`,
                nim: member.nim,
                email: member.email,
                noWa: member.no_WA,
                prodi: member.prodi,
                fileKTM: member.fileKTM
            }))
        }
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Successfully get team member",
            data: dataMap
        });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                statusCode: error.statusCode,
                msg: error.message
            });
        }
        return res.status(500).json({
            success: false,
            statusCode: 500,
            msg: "Internal server error: " + error
        });
    }
}