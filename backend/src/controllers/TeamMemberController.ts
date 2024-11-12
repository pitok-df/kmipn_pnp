import { Request, Response } from "express"
import { createTeamMember, getTeamMemberByUserIDService } from "../services/TeamMemberService";
import { AppError } from "../utils/AppError";
import { ResponseApi } from "../types/ApiType";
import { userLogin } from "../config/jwt";
import { unVerifyTeamService, verifyTeamService } from "../services/TeamService";
import path from "path";
import { readHtmlFile } from "../utils/readHtmlFile";
import { replacePlaceholders } from "../utils/replacePlaceholder";
import { sendEmail } from "../utils/NodeMailer";

export const storeTeamMember = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const { type } = req.query;
        const fileName = `${process.env.BASEURl}/${type}/${req.file?.filename}`;
        const { teamId, userId, role, nim, name, email, no_WA, prodi } = req.body;
        console.log(userId);

        const teamMember = await createTeamMember(Number(teamId), userId, role, nim, name, email, no_WA, prodi, fileName!);
        res.cookie("teamDataCompleate", true, { httpOnly: true, secure: true, sameSite: "strict" });
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
        const user = await userLogin(req);

        if (!user?.teamMember) return res.status(400).json({
            success: false,
            statusCode: 400,
            msg: "Complete team member before",
        });

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
            round: teamMember.team.submission?.round || "pending",
            verified: teamMember.team.verified,
            teamMembers: teamMember.team.teamMembers.map((member) => ({
                name: `${member.name}`,
                nim: member.nim,
                email: member.email,
                noWA: member.no_WA,
                role: member.role,
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

export const verifyTeam = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const { teamID } = req.params;
        const verifyTeam = await verifyTeamService(Number(teamID));

        const leaderTeam = verifyTeam.teamMembers.filter((member) => { return member.role === "leader" })

        // mengirim email verifikasi ke user
        const filePath = path.join(__dirname, '../templates/TeamVerifyNotif.html')
        let emailContent = await readHtmlFile(filePath);
        const link_to_dashboard = `${process.env.FRONTEND_URL}/dashboard`;
        emailContent = replacePlaceholders(emailContent, {
            "{{ nama_ketua }}": leaderTeam[0].name,
            "{{ nama_team }}": verifyTeam.name,
            "{{ link_to_dashboard }}": link_to_dashboard
        })
        const sendEmailSuccess = await sendEmail(leaderTeam[0].email, "Team Verified", emailContent);

        // jika email verifikasi gagal terkirim maka lempar error dan hapus user
        if (!sendEmailSuccess) {
            unVerifyTeamService(Number(teamID));
            throw new AppError("Failed send email", 400);
        }

        return res.status(200).json({ success: true, statusCode: 200, msg: "Successfully verify team.", data: { verifyTeam, leaderTeam } })
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

export const completeTeam = async (req: Request, res: Response<ResponseApi>) => {

}