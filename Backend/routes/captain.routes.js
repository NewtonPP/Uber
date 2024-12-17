import express from "express"
import { body } from "express-validator";
import { RegisterCaptain } from "../controllers/captain.controller.js";


export const CaptainRouter = express.Router();

CaptainRouter.post("/register", [
    body('Email').isEmail().withMessage("Invalid Email"),
    body('FullName.FirstName').isLength({min:3}).withMessage("First Name should be atleast 3 characters long"),
    body("FullName.LastName").isLength({min:3}).withMessage("Last Name must be atleast 3 characters long"),
    body("Password").isLength({min:6}).withMessage("Password must be atleast 6 characters long"),
    body("Vehicle.Color").isLength({min:3}).withMessage("Color must be at least 3 characters"),
    body("Vehicle.Plate").isLength({min:3}).withMessage("Plate must be at least 3 chartacters"),
    body("Vehicle.Capacity").isInt({min:1}).withMessage("Capacity must be at least 1"),
    body("Vehicle.VehicleType").isIn(["car", "motorcycle", "auto"]).withMessage("Invalid Vehicle Type")
], RegisterCaptain)

