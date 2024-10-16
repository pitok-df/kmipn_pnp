import { Router } from "express";
import { addUser, AllUser, DeleteUser, GetUserById } from "../controllers/Usercontroller";
import { login, logout, refreshToken, register, verifyTokens } from "../controllers/AuthController";
import { authenticateJWT } from "../middlewares/tokenAuth";

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
        userLogin: req.user
    });
});

router.get('/users', authenticateJWT, AllUser);
router.post('/users', authenticateJWT, addUser);
router.get('/users/:id', authenticateJWT, GetUserById);
router.post('/register', register);
router.post('/login', login);
router.delete('/users/:id', authenticateJWT, DeleteUser);
router.post('/verify-email', verifyTokens);
router.get('/refresh-token', refreshToken);
router.post('/logout', logout);
export default router;