import { Router } from "express";
import { addUser, AllUser, DeleteUser, GetUserById } from "../controllers/Usercontroller";
import { login, logout, refreshToken, register, verifyEmail } from "../controllers/AuthController";
import { authenticateJWT } from "../middlewares/tokenAuth";
import { getAllCategory } from "../controllers/CategoryController";
import { isParticipant } from "../middlewares/permission";
import { loginValidator } from "../validators/LoginValidator";
import { createTeam, getDataTeam } from "../controllers/TeamController";
import { createLecture } from "../controllers/LectureController";
import { uploadFile } from "../middlewares/mutlerUploadFile";
import { createProposal } from "../controllers/ProposalController";
import { getTeamMemberByUserID, storeTeamMember } from "../controllers/TeamMemberController";

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

router.post("/lecture", authenticateJWT, createLecture);
router.post("/team", authenticateJWT, createTeam);
router.post("/proposal", authenticateJWT, uploadFile.single("file_proposal"), createProposal);
router.post("/team-member", authenticateJWT, uploadFile.single("file_ktm"), storeTeamMember);
router.get("/team-member", getDataTeam);
router.get("/team-member/:id", getTeamMemberByUserID);

router.get('/categories', authenticateJWT, getAllCategory);
export default router;