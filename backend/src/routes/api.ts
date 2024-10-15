import { Router } from "express";
import { AllUser, DeleteUser, GetUserById } from "../controllers/Usercontroller";
import { register, verifyToken } from "../controllers/AuthController";

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

router.get('/users', AllUser);
router.get('/users/:id', GetUserById);
router.post('/register', register);
router.delete('/users/:id', DeleteUser);
router.get('verify-email', verifyToken);
export default router;