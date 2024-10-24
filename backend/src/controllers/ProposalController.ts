import { Request, Response } from "express";
import { ResponseApi } from "../types/ApiType";
import { AppError } from "../utils/AppError";
import { createProposalService } from "../services/ProposalService";

export const createProposal = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const { teamID } = req.body;
        const { type } = req.query;
        const fileLink = `${process.env.BASEURl}/${type}/${req.file?.filename}`;
        const proposal = await createProposalService(Number(teamID), String(fileLink));
        return res.status(201).json({ success: true, statusCode: 201, msg: "successfully save proposal", data: proposal })
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