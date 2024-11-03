import { body } from "express-validator";

export const addUserValidator =
    [
        body('email').isEmail().withMessage("Enter valid email"),
        body('password').notEmpty().withMessage("Password required"),
        body('name').notEmpty().withMessage("Name required"),
        body('role').notEmpty().withMessage("Role required")
    ];
export const updateUserValidator =
    [
        body('email').isEmail().withMessage("Enter valid email"),
        body('name').notEmpty().withMessage("Name required"),
        body('role').notEmpty().withMessage("Role required")
    ];