import { Router } from "express";
// import { getAllCategory } from "../controllers/CategoryController";
import { getAllUser, getUserId } from "../controllers/UserController";


const router = Router();

router.get('/', (req, res) => {
    const timeStamp = new Date().toISOString();
    res.json({
        success: true,
        msg: 'Wellcome to API',
        userAgent: req.headers['user-agent'],
        ip: req.ip,
        timeStamp: timeStamp,
        apiVersion: "1.0.0"
    });
});

router.get('/users', getAllUser);
router.get('/users/:id', getUserId);
export default router;