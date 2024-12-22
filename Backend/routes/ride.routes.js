import { Router } from "express";
import { body, query } from "express-validator";
import { ConfirmRide, CreateUserRide, GetRideFare } from "../controllers/ride.controller.js";
import { AuthCaptain, AuthUser } from "../middlewares/auth.middlewares.js";

export const RideRouter = Router()

RideRouter.post("/create",
    AuthUser,
    // body('userId').isString().isLength({min:24,max:24}).withMessage("Invalid UserId"),
    body("pickup").isString().isLength({min:3}).withMessage("Invalid Pickup address"),
    body("destination").isString().isLength({min:3}).withMessage("Invalid Destination address"),
    body("VehicleType").isString().isIn(["auto", "car", "motorcycle"]).withMessage("Invalid Vehicle Type"),
    CreateUserRide
)

RideRouter.get("/getfare", AuthUser,
    query("pickup").isString().isLength({min:3}).withMessage("Invalid Pickup"),
    query("destination").isString().isLength({min:3}).withMessage("Invalid destination"),
     GetRideFare)

RideRouter.post("/confirm",AuthCaptain, body("rideId").isMongoId().withMessage("Invalid ride id"), ConfirmRide)