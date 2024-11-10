import { Router } from "express";
import { addUser, AllUser, DeleteUser, GetUserById, updateUser } from "../controllers/Usercontroller";
import { login, logout, register, verifyEmail } from "../controllers/AuthController";
import { authenticateJWT } from "../middlewares/tokenAuth";
import { createCategory, deleteCategory, getAllCategory, getAllCategoryClose, updateCategory } from "../controllers/CategoryController";
import { loginValidator } from "../validators/LoginValidator";
import { createTeam, getDataTeam } from "../controllers/TeamController";
import { createLecture } from "../controllers/LectureController";
import { uploadFile } from "../middlewares/mutlerUploadFile";
import { createProposal } from "../controllers/ProposalController";
import { getTeamMemberByUserID, storeTeamMember, verifyTeam } from "../controllers/TeamMemberController";
import { checkDataCompleate } from "../middlewares/checkDataCompleate";
import { userLogin } from "../config/jwt";
import { addUserValidator, updateUserValidator } from "../validators/userValidator";
import { updateCategoriValidator } from "../validators/CategoriValidator";

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
        apiVersion: "1.0.0"
    });
});

router.get('/users', authenticateJWT, AllUser);
router.post('/users', authenticateJWT, addUserValidator, addUser);
router.get('/users/:id', authenticateJWT, GetUserById);
router.put('/users/:id', authenticateJWT, updateUserValidator, updateUser);
router.delete('/users/:id', authenticateJWT, DeleteUser);
router.post('/register', register);
router.post('/login', loginValidator(), login);
router.post('/verify-email', verifyEmail);
router.post('/logout', logout);

router.post("/lecture", authenticateJWT, createLecture);
router.post("/team", authenticateJWT, createTeam);
router.post("/upload-proposal", authenticateJWT, uploadFile.single("file_proposal"), createProposal);
router.post("/team-member", authenticateJWT, uploadFile.single("file_ktm"), storeTeamMember);
router.get("/all-team-member", authenticateJWT, getDataTeam);
router.get("/team-member", authenticateJWT, getTeamMemberByUserID);
router.put("/team-member/:teamID", authenticateJWT, verifyTeam);
router.get("/check-team-compleate", authenticateJWT, checkDataCompleate, (req, res) => {
    res.cookie("teamDataCompleate", false, { httpOnly: true, secure: true, sameSite: "strict" });
    return res.json({ teamDataCompleate: false });
});


router.get('/categories', getAllCategory);
router.post('/categories', authenticateJWT, updateCategoriValidator, createCategory);
router.get('/categories-close', authenticateJWT, getAllCategoryClose);
router.put('/categories/:id', authenticateJWT, updateCategoriValidator, updateCategory);
router.delete('/categories/:id', authenticateJWT, updateCategoriValidator, deleteCategory);
router.get('/user-login', authenticateJWT, async (req, res) => {
    const user = await userLogin(req);
    return res.status(200).json({ user })
});
export default router;