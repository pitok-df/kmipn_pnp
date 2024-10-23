import { Router } from "express";
import { addUser, AllUser, DeleteUser, GetUserById } from "../controllers/Usercontroller";
import { login, logout, refreshToken, register, verifyEmail } from "../controllers/AuthController";
import { authenticateJWT } from "../middlewares/tokenAuth";
import { getAllCategory } from "../controllers/CategoryController";
import { isParticipant } from "../middlewares/permission";
import { loginValidator } from "../validators/LoginValidator";

const router = Router();

router.get('/', authenticateJWT, (req, res) => {
    const timeStamp = new Date().toISOString();
    res.json({
        success: true,
        msg: 'Wellcome to API',
        userAgent: req.headers['user-agent'],
        ip: req.ip,
        refreshToken: req.cookies.refreshToken,
        timeStamp: timeStamp,
        apiVersion: "1.0.0",
    });
});

router.get('/users', authenticateJWT, AllUser);
router.post('/users', authenticateJWT, addUser);
router.get('/users/:id', authenticateJWT, GetUserById);
router.post('/register', register);
router.post('/login', loginValidator(), login);
router.delete('/users/:id', authenticateJWT, DeleteUser);
router.post('/verify-email', verifyEmail);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);

router.get("/complete-team", authenticateJWT, isParticipant);

router.get('/categories', getAllCategory);
export default router;