import express from "express"
import { body } from "express-validator";
import { GetUserProfile, LoginUser, LogoutUser, RegisterUser } from "../controllers/user.controller.js";
import { AuthUser } from "../middlewares/auth.middlewares.js";


export const UserRouter = express.Router();


UserRouter.post("/register", [
    body('Email').isEmail().withMessage("Invalid Email"),
    body('FullName.FirstName').isLength({min:3}).withMessage("First Name should be atleast 3 characters long"),
    body("FullName.LastName").isLength({min:3}).withMessage("Last Name must be atleast 3 characters long"),
    body("Password").isLength({min:6}).withMessage("Password must be atleast 6 characters long")
], RegisterUser)


UserRouter.post("/login", [
    body('Email').isEmail().withMessage("Invalid Email"),
    body("Password").isLength({min:6}).withMessage("Password must be atleast 6 characters long")
], LoginUser)


UserRouter.get("/profile", AuthUser, GetUserProfile)
UserRouter.get("/logout",AuthUser,LogoutUser )