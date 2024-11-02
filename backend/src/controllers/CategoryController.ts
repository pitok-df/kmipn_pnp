import { Request, Response } from "express";
import { getAllDataCategory } from "../services/CategoriService";
import { ResponseApi } from "../types/ApiType";

export const getAllCategory = async (req: Request, res: Response<ResponseApi>) => {
    try {
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Connection', 'keep-alive')
        const sendData = async () => {
            const categori = await getAllDataCategory();
            return res.write(`data: ${JSON.stringify({ success: true, data: categori })}\n\n`)
        };

        const intervalId = setInterval(sendData, 5000)

        req.on('close', () => { clearInterval(intervalId); res.end(); })
    } catch (error) {
        res.write(`data: ${JSON.stringify({ success: false, msg: "Internal server error" })}\n\n`);
        res.end();
    }
}