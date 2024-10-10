import { Router } from "express";
import { Request, Response } from "express";
import { register } from "../controller/Authenticetion";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.json({
        success: true, msg: "Selamat datang di api KMIPN, ini rahasia."
    });
});

router.get('/test', register)
export default router;